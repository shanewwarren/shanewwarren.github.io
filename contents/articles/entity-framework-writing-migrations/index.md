---
title: Extending Entity Framework Migration Operations
author: warren
date: 2014-10-25 13:53
template: article.jade
---

Writing migrations in Entity Framework (v6.+) provides a convienient way for developers to use C# to make SQL changes to a database.
The `DbMigration` class which all migrations inherit from offers many helpful operations to help generate SQL.  The operations that the `DbMigration` class offers does not cover every database type that you may want to write a migration for though.  

<span class="more"></span>

To create views, functions, or even define custom types developers need to resort the the `Sql` command and need to write out the SQL directly in the migration.  The `Sql` operation is useful, but it can result in a lot of duplication of SQL.  In this tutorial I'll show you how to move past using the `Sql` operation and extend the `DbMigrations` class for your own custom operations that generate SQL.

## Custom Migration Operations

In this post, I'll demonstrate how to create a pair of custom operations which will generate the SQL that can create and drop a trigger.

Creating and dropping a trigger requires two separate operations.  Each of these operations need to inherit from the `MigrationOperation` class.  Listed below is the code for our two operations `DropTriggerOperation` and `CreateTriggerOperation`.

```cs

    public class CreateTriggerOperation : MigrationOperation
    {
        public CreateTriggerOperation(string triggerName,
            string tableName,
            CreateTriggerExecutionContextOption executionContext,
            CreateTriggerActionOption action,
            string body) : base(null)
        {
            TriggerName = triggerName;
            TableName = tableName;
            ExecutionContext = executionContext;
            Action = action;
            Body = body;
        }

        public string TriggerName { get; private set; }

        public string TableName { get; private set; }

        public CreateTriggerExecutionContextOption ExecutionContext { get; private set; }

        public CreateTriggerActionOption Action { get; private set; }

        public string Body { get; private set; }

        public override MigrationOperation Inverse
        {
            get { return new DropTriggerOperation(TriggerName); }
        }

        public override bool IsDestructiveChange
        {
            get { return false; }
        }
    }


    public class DropTriggerOperation : MigrationOperation
    {
        public DropTriggerOperation(string triggerName)
            : base(null)
        {
            TriggerName = triggerName;
        }
        public string TriggerName { get; private set; }

        public override MigrationOperation Inverse
        {
            get { return NotSupportedOperation.Instance; }
        }

        public override bool IsDestructiveChange
        {
            get { return false; }
        }
    }

```

`MigrationOperation` provides the following properties to override:

-  A virtual property `Inverse` which takes another `MigrationOperation` which is used to revert the current operation.
-  A abstract property `IsDestructiveChange` which indicates if the operation may result in data loss.

Along with overriding these properties the operations should include the basic information necessary to generate the appropriate SQL statement.  Since creating a trigger has options for when the trigger should be executed and during what context some we can create additional enums to encapsulate these choices.

```cs

    public enum CreateTriggerExecutionContextOption {
        For,
        After,
        InsteadOf
    }

    public enum CreateTriggerActionOption {
        Insert,
        Update,
        Delete
    }

```

## Generating the SQL

To generate the SQL for your custom operations you will need to override the specific `MigrationSqlGenerator` class depending on which database you are trying to add the custom operations for.  Entity Framework currently ships with two classes which inherit from `MigrationSqlGenerator`:

  -     Microsoft SQL Server database: `SqlServerMigrationSqlGenerator`
  -     Microsoft SQL Server Compact Edition database: `SqlCeMigrationSqlGenerator`


In this example we will target the Microsoft SQL Server.

Create a class which inherits from the `SqlServerMigrationSqlGenerator` then add the following code:

```cs

    class CustomSqlServerMigrationSqlGenerator : SqlServerMigrationSqlGenerator
    {
        protected override void Generate(MigrationOperation migrationOperation)
        {
            if (migrationOperation is CreateTriggerOperation)
            {
                GenerateCreateTrigger(migrationOperation as CreateTriggerOperation);
            }
            else if (migrationOperation is DropTriggerOperation)
            {
                GenerateDropTrigger(migrationOperation as DropTriggerOperation);
            }
        }

        private void GenerateCreateTrigger(CreateTriggerOperation operation)
        {
            using (IndentedTextWriter writer = Writer())
            {
                writer.WriteLine(@"CREATE TRIGGER {0}
                                       ON {1}
                                       {2} {3}
                                       AS
                                        {4}; ",
                                  operation.TriggerName,
                                  operation.TableName,
                                  GetTriggerExecutionContextString(operation.ExecutionContext),
                                  GetTriggerActionString(operation.Action),
                                  operation.Body);
                Statement(writer);
            }

        }

        private String GetTriggerExecutionContextString(CreateTriggerExecutionContextOption option)
        {
            switch (option)
            {
                case CreateTriggerExecutionContextOption.For:
                    return "FOR";
                case CreateTriggerExecutionContextOption.After:
                    return "AFTER";
                case CreateTriggerExecutionContextOption.InsteadOf:
                default:
                    return "INSTEAD OF";
            }
        }

        private String GetTriggerActionString(CreateTriggerActionOption option)
        {
            switch (option)
            {
                case CreateTriggerActionOption.Insert:
                    return "INSERT";
                case CreateTriggerActionOption.Update:
                    return "UPDATE";
                case CreateTriggerActionOption.Delete:
                default:
                    return "DELETE";
            }
        }

        private void GenerateDropTrigger(DropTriggerOperation operation)
        {
            using (IndentedTextWriter writer = Writer())
            {
                writer.WriteLine("DROP TRIGGER {0}; ",
                                  operation.TriggerName);
                Statement(writer);
            }
        }
    }

```

By overriding the `Generate(MigrationOperation migrationOperation)` you can intercept how the `SqlServerMigrationSqlGenerator` generates SQL for an unknown operation which inherits from the `SqlServerMigrationSqlGenerator` class.  Depending on the type of operation we can generate the appropriate SQL based on the kind of operation it is.

## Add the extension methods

Finally, in order to make these operations available to our migrations we need to write a few extension methods for the `DbMigrator` class and set them up to pass in the data we need.  The following extension methods now expose these operations to our migrations:

```cs

        public static void CreateTrigger(this DbMigration migration,
            string triggerName, string tableName,
            CreateTriggerExecutionContextOption executionContext,
            CreateTriggerActionOption action,
            string body)
        {
            ((IDbMigration)migration)
              .AddOperation(new CreateTriggerOperation(triggerName,
                 tableName, executionContext, action, body));
        }

        public static void DropTrigger(this DbMigration migration,
         string triggerName)
        {
            ((IDbMigration)migration)
              .AddOperation(new DropTriggerOperation(triggerName));
        }

```

## Using the new operations in migrations

Now with our extension methods in place we can make use of our new operations in our migrations like so:

```cs
    public partial class AddMyTriggerName : DbMigration
    {
        public override void Up()
        {
            this.CreateTrigger("MyTriggerName", "TableName",
                 CreateTriggerExecutionContextOption.For,
                 CreateTriggerActionOption.Insert,
                 @"... some sql trigger code to execute ");

        }

        public override void Down()
        {
            this.DropTrigger("MyTriggerName");
        }
    }

```

## Conclusion

While the built-in operations can accomdate most of your needs when writing migrations, being able to add custom operations can greatly reduce duplication and can provide a better interface to generating your migrations.
