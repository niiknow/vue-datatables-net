# vue-datatables-net
> Vue jQuery DataTables.net wrapper component 

This library is a Vue 2 wrapper for [jQuery DataTables](https://datatables.net/).  It's a tiny wrapper that doesn't include anything, not even the datatables.net core library.

The initial focus/design is to use with ajax/server-side endpoint.  Though, since it is just a wrapper, local data use/loading is simply:

```javascript
thisComponent.setTableData(dataArray)
```

## Development
This library uses the NodeJS library `laravel-mix` to simplify build and packaging.

Requirement: Install NodeJS, NPM

Then:
```
git clone https://github.com/niiknow/vue-datatables-net
cd vue-datatables-net
npm install
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
This library default configuration and provide example for use with `bootstrap4` styling.  Though, you can fully customize with any other jQuery DataTables supported theme.

> Example of required imports for Bootstrap 4:

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
<link rel="stylesheet" href='https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css'>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>

<script>
import VdtnetTable from 'vue-datatables-net'
import 'datatables.net-bs4'

/*
// you can import these on a needed basis
// this import all buttons that we need, for
// use with opts: { buttons: ['csv', 'print', ...]}
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import 'datatables.net-responsive/js/dataTables.responsive.js';

// import any datatables.net extension as you would when using it raw
import 'datatables.net-buttons-bs4'
import 'datatables.net-responsive-bs4'
import 'datatables.net-fixedheader-bs4'
import 'datatables.net-scroller-bs4';
import 'datatables.net-select-bs4';

// import any styles to support the packages you import above
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css';
import 'datatables.net-scroller-bs4/css/scroller.bootstrap4.min.css';
import 'datatables.net-select-bs4/css/select.bootstrap4.min.css';
*/
</script>
```

> See example [App](https://niiknow.github.io/vue-datatables-net/)

Example App demonstrate how to pass in overrides for our [jQuery DataTable](https://datatables.net/manual/options) default options - https://github.com/niiknow/vue-datatables-net/blob/master/example/App.vue#L8

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

Here are some jQuery DataTables server-side compatible parsers:
* PHP - https://github.com/lampjunkie/php-datatables
* PHP Symphony - https://github.com/stwe/DatatablesBundle
* PHP Laravel - https://github.com/yajra/laravel-datatables
* dotNET - https://github.com/ALMMa/datatables.aspnet, https://github.com/garvincasimir/csharp-datatables-parser
* NodeJS - https://github.com/jpravetz/node-datatable
* Rails - https://github.com/jbox-web/ajax-datatables-rails

## Documentation
Since it's a wrapper, all/most features are provided by the [jQuery DataTables](https://datatables.net/manual/) library.

## Parameters
Our component parameters:
```javascript
  props: {
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
     * True to enable multi-select checkboxes
     * Current implementation require datatables.net-select
     *
     * @type Boolean
     */
    selectable: {
      type: Boolean
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
- `visible` false to hide
- `width` to provide custom width
- `className` set column class names
- `defaultContent` provide default html when no data available
- `render` custom cell rendering function https://datatables.net/reference/option/columns.render
- `template` simple vue template for the field

> It is important to understand why one should use `fields` and not simply pass in `opts.columns`.  Though, `fields` definition is optional, you can just pass `opts.columns` definition if you do not wish to use `fields`.

One `Purpose` of this component is to extend jQuery DataTables function and features, example:
* Simplification of features configuration, such as `select-checkbox` column, custom `action` buttons, and/or future Vue specific features.
* Allow for customizable table heading on a per column basis; thereby, not having to define all html for column header.
* Ability to have simple `template` field so you can pass schema JSON from static file or some API instead of requiring to define a javascript `render` function.  Though, the `render` function would provide best performance.
* Having schema also allow future features, such as: support of editable column/cell.

## Additional Headers
Many server-side usage require CSRF and/or API token headers.  Since options are completely exposed, simply use the native method per [jQuery DataTables example](https://editor.datatables.net/manual/security#Prevention)

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
```

If you haven't already figured it out, ajax is basically the signature of [jQuery.ajax](http://api.jquery.com/jquery.ajax/) which is demonstrated here wrapped as [jQuery DataTables ajax pipeline](https://datatables.net/examples/server_side/pipeline.html)

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

# MIT
