# Working with Bookshelf.js
Bookshelf.js is an ORM (object-relational mapping tool) that simplifies database relations, transactions and polymorphic associations.

To those who aren't familiar with Bookshelf.js, it can appear very unintuitive and difficult to use. The purpose of this document is to help aleviate this by providing some useful cheat-sheet-like documentation around using Bookshelf.js in a Node.js application.

Note: This document is NOT a comprehensive resource. You will need to refer to the [Bookshelf.js Documentation](http://bookshelfjs.org/) and [Knex.js Documentation](http://knexjs.org/) for more information.

## Building Models
Before you build a new model, you will need to create a database migration. This will specify the table properties part of your model. See the migrations.md document for more information.

Once you have run the migration, you can create a new model. Luckily, creating a model with Bookshelf.js is simple. It follows this format.

```
const Bookshelf = require('../config/db/bookshelf');

const ModelName = Bookshelf.Model.extend({
    tableName: 'table_name',
    hasTimestamps: true
    /* Instance methods and properties to be attached to instances of the new class. */
}, {
    /* Class (ie. static) functions and properties to be attached to the constructor of the new class. */
});

module.exports = Bookshelf.model('User', User);

```

For a more thorough example, see the User model in this project.

## Model Relations
TODO

## Querying DB Records
When querying records, you can either use Bookshelf.js functions, or use Knex.js functions. The examples below use the Knex.js querying functions (calling query() without arguments on a Model returns a Knex.js query builder).

There are many different ways to query records. Using the Knex.js query builder method is the simplest. See the [Bookshelf.js Documentation](http://bookshelfjs.org/) for more ways to perform queries.

### Select:
```
const ModelName = require('...');
/* Select All Records */
ModelName.query().select().then(function(objects) {
    //objects is an array of records
});

/* Select Specific Columns */
ModelName.query().select('col1', 'col2', ...).then(function(objects) {
    //objects is an array of records
});
```

### Where:
```
const ModelName = require('...');

/* AND */
ModelName.query().where({field1: 'val', field2: 'val', ...}).select().then(function(objects) {
    //objects is an array of records
});

ModelName.query().where({field1: 'val'}).andWhere({field2: 'val'}).select().then(function(objects) {
    //objects is an array of records
});

/* OR */
ModelName.query().where({field1: 'val'}).orWhere({field2: 'val'}).select().then(function(objects) {
    //objects is an array of records
});
```

Other useful Knex.js Where methods:
```
  – whereNot
  – whereIn
  – whereNotIn
  – whereNull
  – whereNotNull
  – whereExists
  – whereNotExists
  – whereBetween
  – whereNotBetween
  – whereRaw
```

### Join:
See  [Knex.js Documentation](http://knexjs.org/).

### Having:
See  [Knex.js Documentation](http://knexjs.org/).

### Other:
See  [Knex.js Documentation](http://knexjs.org/) for full list.

```
const ModelName = require('...');

/* Limit */
ModelName.query().select().limit(20).then(function(objects) {
    //objects is an array of records
});

/* Distinct */
ModelName.query().distinct('col1', 'col2').select().then(function(objects) {
    //objects is an array of records
});

/* GroupBy */
ModelName.query().groupBy('col').then(function(objects) {
    //objects is an array of records
});

/* OrderBy */
ModelName.query().orderBy('col').then(function(objects) {
    //objects is an array of records
});
```

## Creating Records
When creating a record, you create an instance of the model using the `new` keyword, or you can use `Model.forge()`. You need not specify all attributes of your new record; missing attributes will be `null` in the database.

If the record is new, any defaults will be set and an insert query will be performed. Otherwise it will update the record with a corresponding ID.

```
const ModelName = require('...');

ModelName.forge({col1: 'val', col2: 'val', ...}).save().then(function(model) {
    // model.attributes is the newly created object.
});

new ModeName({col1: 'val', col2: 'val', ...}).save().then(function(model) {
    // model.attributes is the newly created object.
});
```

## Updating Records
The method for updating records is very similar to creating records. When you specify an ID for a record that exists, the record is updated in the database.

```
const ModelName = require('...');

ModelName.forge({id: 123123, col1: 'val', col2: 'val', ...}).save().then(function(model) {
    // model.attributes is the newly created object.
});

ModelName.forge{id: 123123}).save({col1: 'val', col2: 'val', ...}).then(function(model) {
    // model.attributes is the newly created object.
});
```

## Deleting Records
To delete a record, you must specify the record id.

```
const ModelName = require('...');

ModelName.forge({id: 123123}).destroy().then(function(model) {
    // model.attributes is the newly created object.
});
```