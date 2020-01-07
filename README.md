# vue-datatables-net
> Vue jQuery DataTables.net wrapper component 

This library is a Vue 2 wrapper for [jQuery DataTables](https://datatables.net/).  It's a tiny wrapper that doesn't include anything, not even the datatables.net core library.

> Note: you've found this library because you want to use jQuery datatables.net client-side with your application.  Alternatively, if you simply want to integrate with server-side datatables.net compatible endpoint, then I'd like to suggest looking at bootstrap-vue b-table and this component - https://github.com/niiknow/bvtnet-items-provider 

## Development
`laravel-mix` is use to simplify build and packaging.

Requirement: Install NodeJS, NPM

Then:
```
git clone https://github.com/niiknow/vue-datatables-net
cd vue-datatables-net
npm install
```

or in one command:
```                                                             
npm install git+https://github.com/niiknow/vue-datatables-net.git                
```

To run locally (automatically launch firefox):
```
npm run watch
```

To build library for npm publish:
```
npm run build
```

This library is available on NPM, to install:
```
npm install vue-datatables-net
```

## Usage
Default configuration and provide example for `bootstrap4` styling.  Though, it allow for complete flexibility of customization with any other jQuery DataTables supported theme.

> Example of imports for Bootstrap 4:

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<link rel="stylesheet" href='https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css'>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

<script>
import VdtnetTable from 'vue-datatables-net'

import 'datatables.net-bs4'

// below you should only import what you need
// Example: import buttons and plugins
import 'datatables.net-buttons/js/dataTables.buttons.js'
import 'datatables.net-buttons/js/buttons.html5.js'
import 'datatables.net-buttons/js/buttons.print.js'

// import the rest for your specific theme
import 'datatables.net-buttons-bs4'
import 'datatables.net-select-bs4'

import 'datatables.net-select-bs4/css/select.bootstrap4.min.css'
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css'
</script>
```

> See example [App](https://niiknow.github.io/vue-datatables-net/)

Example App demonstrate how to pass overrides for our [jQuery DataTable](https://datatables.net/manual/options) default options - https://github.com/niiknow/vue-datatables-net/blob/master/example/app.vue

**NOTE:**
Our example use a free API endpoint from [typicode](https://jsonplaceholder.typicode.com), which is simply a JSON endpoint.  As a result, we needed to define a `dataSrc` wrapper like so:
```
ajax: {
  url: 'https://jsonplaceholder.typicode.com/users',
  dataSrc: (json) => {
    return json
  }
}
```

Of course, for your implementation, simply use a server-side compatible parser.  Below are some jQuery DataTables server-side parsers:
* PHP - https://github.com/lampjunkie/php-datatables
* PHP Symphony - https://github.com/stwe/DatatablesBundle
* PHP Laravel - https://github.com/yajra/laravel-datatables
* dotNET - https://github.com/ALMMa/datatables.aspnet, https://github.com/garvincasimir/csharp-datatables-parser
* NodeJS - https://github.com/jpravetz/node-datatable
* Rails - https://github.com/jbox-web/ajax-datatables-rails
* Python - https://github.com/Pegase745/sqlalchemy-datatables

## Documentation
Since it's a wrapper, all/most features are provided by the [jQuery DataTables](https://datatables.net/manual/) library.

## Parameters
Our component parameters:
```javascript
  props: {
    /**
     * The table id - useful for saveState
     *
     * @type String
     */
    id: {
      type: String
    },
    /**
     * Set the container classes.
     *
     * @type String
     */
    containerClassName: {
      type: String,
      default: 'table-responsive d-print-inline'
    },
    /**
     * Set the table classes you wish to use, default with bootstrap4
     * but you can override with: themeforest, foundation, etc..
     *
     * @type String
     */
    className: {
      type: String,
      default: 'table table-striped table-bordered nowrap w-100'
    },
    /**
     * the options object: https://datatables.net/manual/options
     *
     * @type Object
     */
    opts: {
      type: Object
    },
    /**
     * List all fields to be converted to opts columns
     *
     * @type Object
     */
    fields: {
      type: Object
    },
    /**
     * Pass in DataTables.Net jQuery to resolve any conflict from
     * multiple jQuery loaded in the browser
     *
     * @type Object
     */
    jquery: {
      type: Object
    },
    /**
     * Pass in Vue to resolve any conflict from multiple loaded
     *
     * @type Object
     */
    vue: {
      type: Object
    },
    /**
     * The select-checkbox column index (start at 1)
     * Current implementation require datatables.net-select
     *
     * @type Number
     */
    selectCheckbox: {
      type: Number
    },
    /**
     * Provide custom local data loading.  Warning: this option has not been
     * thoroughly tested.  Please use ajax and serverSide instead.
     *
     * @type Function
     */
    dataLoader: {
      type: Function
    },
    /**
     * true to hide the footer of the table
     *
     * @type Boolean
     */
    hideFooter: {
      type: Boolean
    },
    /**
     * The details column configuration of master/details.
     *
     * @type {Object}
     */
    details: {
      type: Object
    }
  }
```

`fields` is an schema object that identify all datatables.net columns, example:

Example:
```javascript
fields: {
  _id: { label: "ID" },
  title: { label: "Title", searchable: true, sortable: true },
  type: { label: "Type" }
}
```

### Field properties
- `label` Title for display
- `searchable` true to enable search of field
- `sortable` false to disable sorting
- `name` to override the name
- `data` differentiate server-side sorting field - optional default to `name`
- `visible` false to hide
- `width` to provide custom width
- `className` set column class names
- `defaultContent` provide default html when no data available
- `render` custom cell rendering function https://datatables.net/reference/option/columns.render
- `template` simple vue template for the field.  See example App.
- `defaultOrder` null, asc/desc - the default/initial sort order
- `isLocal` same as setting both searchable and sortable to false
- `index` allow for column positioning

> It is important to understand why it is better to use `fields` and not `opts.columns`.  Though, `fields` is optional if one wish to use the raw `opts.columns` definition.

One `Purpose` of this component is to extend jQuery DataTables function and features, example:
* Simplification of features configuration, such as `select-checkbox` column, custom `action` buttons, and/or future Vue specific features.
* Allow for customizable table heading on a per-column basis; thereby, not having to define all html for each column header.
* Ability to have simple `template` field so you can pass schema JSON from static file or some API, instead of requiring to define a javascript `render` function.  Though, the `render` function would provide best performance.
* Having schema also allow for future features, such as editable column/cell.

### events
Custom events for this component.
```html
<vdtnet-table ...
  @table-creating="doSomethingBeforeDataTableCreate"
  @table-created="doSomethingImmediatelyAfterTableCreatedAndInitialized"
  @reloaded="doSomethingAfterDataLoadOrReloaded"
/>
```

```js
   doSomethingImmediatelyAfterTableCreatedAndInitialized(vdtnet) {
    // use vdtnet.dataTable to access the jQuery DataTables object, example:
     vdtnet.dataTable.on( 'order.dt',  function () { eventFired( 'Order' ); } )
   }
```
- `table-creating` this is right before jQuery(el).DataTable(component.options) is called allowing you to modify component options.
- `table-created` this is after we called jQuery(el).DataTable and initialized all the columns.
- `reloaded` this is after data has been load/reloaded

## Additional Headers
Many server-side usage require CSRF and/or API token headers.  Since jQuery DataTables `options` are completely exposed as `opts`, simply use the native method per [jQuery DataTables example](https://editor.datatables.net/manual/security#Prevention)

i.e, something like:
```javascript
opts: {
  'ajax': {
    'url': url,
    'type': 'GET',
    'beforeSend': function (request) {
        request.setRequestHeader("token", token);
    }
  }
}

// or as headers parameter
opts: {
  'ajax': {
    'url': url,
    'type': 'GET',
    'headers': {
      'CSRFToken': TOKEN
    }
  }
}

// or as query parameter
opts: {
  'ajax': {
    'url': url,
    'type': 'GET',
    'data': function ( d ) {
      d.CSRFToken = TOKEN;
    }
  }
}

```

If you haven't already guessed, ajax is basically the signature of [jQuery.ajax](http://api.jquery.com/jquery.ajax/), which can be seen in this [jQuery DataTables ajax pipeline](https://datatables.net/examples/server_side/pipeline.html) code demonstration.

## Row Action Buttons
Use `data-action` attribute to automatically wire up any action button/elements.  To render action button/element in a row, simply define dummy field like so:
```javascript
actions: {
  label: 'Actions',
  defaultContent: '<a href="javascript:void(0);" data-action="edit" class="btn btn-primary btn-sm"><i class="mdi mdi-square-edit-outline"></i> Edit</a>' +
    '<span data-action="delete" class="btn btn-danger btn-sm"><i class="mdi mdi-delete"></i> Delete</span>'
}
```

## Reload method and reloaded event
Allow you to refresh ajax content after some event.  Let say you have something like this:

```html
<template>
  <div id="app">
    <vdtnet-table
      :fields="fields"
      :opts="options"
      ref="table"
      @delete="doAjaxDelete"
      @reloaded="doSomethingAfterReload"
    />
  </div>
</template>
<script>
// ... component top ...
  methods: {
    doAjaxDelete(data, row, tr, target) {
      // do some ajax delete
      // then reload after ajax complete
      this.$refs.table.reload()
    },
    doSomethingAfterReload(data, table) {
      // some something after data loaded from server
    }
  }
// ... component bottom ...
```

## Customizable table head (th) columns
Let say you have a column `description`, you can provide table head template for the description column like so:
```html
<template slot="HEAD_description">
  <h1>desc</h1>
</template>
```

## dom (Searching and Toolbar)
`dom` configuration defines how jQuery DataTables components are rendered - https://datatables.net/reference/option/dom

Our default configuration compatible with Bootstrap4 is:
```html
"tr<'row vdtnet-footer'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'pl>>"
```

This is based on the configuration `lftiprB`, also see: https://datatables.net/reference/option/dom

Note, we do not include toolbar buttons (B) or search control (s).  This is because we defer these functions to you (the User).  Toolbar Buttons are client-side; and since we do not use client-side, we don't need these buttons.  We expose a `search` method on `vdtnet-table` so you can use this method to perform search.

Simply create your own Buttons for server-side exports, bulk, and/or other things.  Create your own search control and use the `search` method.  See example App.  All these things are now Vue natives.

Though, if you really insists on using these client-side controls, simply override the default `opts.dom` and `opts.buttons` with your own settings.

## getServerParams method
This function return the parameters last used by our server-side endpoint.  It allow you to use for server-side export API call.  Example:
```javascript
const parms = this.$refs.table.getServerParams()
parms.export = 'csv'
// boom export
const url = 'export.php?' + $.param(data)
window.open(url)
```

## Responsive
1. In Bootstrap4, there's a class called [table-responsive](https://getbootstrap.com/docs/4.1/content/tables/#responsive-tables) that wrap the table at each screen breakpoint.  We apply this class on our wrapper div to make the table scroll horizontally.  We also include `d-print-inline` for print.

2. Alternatively, you can set `options.responsive = true` to use jQuery DataTable responsive plugin.  **WARNING**: This plugin does not play well with `select-checkbox`, `master-details`, and many other features.  It is recommended to use option 1 above.

## Master-details pattern
`details` configuration allow you to create template for displaying details row in Master-details pattern.  Schema:
```javascript
{
  index: 'a number (start at 1) representing the column position',
  template: 'the template where {{ data.column }} is the item/row data',
  render: 'provide a custom render function as alternative to template'
}
```

## Native templating (sort-of) explained
Take a look at example app, you can template:
```
 <template
  slot="address2"
  slot-scope="ctx"
>
  <span>{{ ctx.data.city }}, {{ ctx.comp.formatCode(ctx.data.zipcode) }}</span>
</template>
```

- `slot` is the field/column name
- `slot-scope` define the context object as `ctx` in this example
- The context object will have the following properties
  1. `data` the column value, in this case is `address` property which is an object with sub-properties (street, suite, city, zipcode, geo, etc...)
  2. `type` the jQuery DataTables rendering type, usually `display`
  3. `row` the entire row data
  4. `meta` jQuery DataTables column config
  5. `vdtnet` the vdtnet table object
  6. `def` vdtnet field config
  7. `comp` your component, notice how it demonstrate calling of a function on the example component to strip out all number after the dash.  You can use this to do things like permission checking.  Also see **Note** below.

**Note**: Things that are related to display rendering should work.  Event handling doesn't work and I'm still looking for better way handle this.  Of course, you can still use `data-action` to handle clicks.

## Export
This is something you want to explore on your own.  We try our best to provide as much example of export as possible in our demo, but Server-Side and/or Language/Framework Specific Code is too much/time-consuming to dive into.  Also, sometime output rendering are ties to specific requirement and cannot generically meet everyone needs.  We suggest that you create a Bounty for your specific needs.

**Client-Side**
This is mostly provided by jQuery DataTables.  We demonstrate in our default demo.  You can find the documentation for [Buttons](https://datatables.net/extensions/buttons/) directly on the jQuery DataTables website.

**Server-Side**
Our demo for server-side export is here: https://laratt.niiknow.org/home/contacts

The source of the demo can be found here: https://github.com/niiknow/laratt-api
And, specifically, the client-side vue component usage source: https://github.com/niiknow/laratt-api/blob/5117bfae1273b31f95af6aa99c51aae7fc413d2f/resources/js/components/DataTableNet.vue#L148

The code use `convention` to calculate a route/url as:
```
url: that.$app.apiRoute(that.rName, that.rPath),
```

Which result to a URL like so: https://laratt.niiknow.org/api/v1/democontact/example?x-tenant=test&x-api-key=demo123

And the server-side source for the export is simply: https://github.com/niiknow/laratt-api/blob/876ce385fc64d83b564f2e697790465675741634/api/Controllers/DemoContactController.php#L90

As far as PDF export, you will need to handle this yourself.  Tip, use [laravel-snappy](https://github.com/barryvdh/laravel-snappy).  The basic concept is to render your result to some html/blade template and use laravel-snappy to convert HTML to PDF.

**Export Tip**
Outside of csv export, most modern OS and Browser support PDF printing.  As a result, simply instruct the user to Print your page and use printing CSS to manipulate for exporting of PDF.

## Tips
If you're like us, you want to write as little code as possible; as in, application of the DRY Principle.  This mean the UI has a standard look/feel/behavior; where toolbar, search, and other controls are place at specific location.  So this mean you want to wrap this component inside your own component?  Our sample App give you a good idea on how to start.  Below are a few things to consider:

1. Identify all properties of the new component and howto translate into this component.  Example: hidePageLength -> opts.lengthChange, hideQuickSearch -> v-if on quickSearch form, hideToolbar -> v-if on toolbar div, etc...
2. Identify methods to wrap, i.e. your component API: reload, getServerParams, etc...
3. Wrap individual action events you want to expose, or simply wrap with v-on="$listeners" to pipe all events from this component to your component.

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
