# vue-datatables-net
> Vue jQuery DataTable.net wrapper component 

This library is a wrapper for [jQuery DataTable](https://datatables.net/).  It's a tiny package that doesn't include anything, not even the datatables.net core library.

The initial focus/design of this library is to use with ajax/server-side endpoint.  Though, since it is a datatables.net wrapper, local data use/loading is simply:

```javascript
component.dataTable.clear().draw();
component.dataTable.rows.add(newDataArray).draw();
```

## Development
This library uses the NodeJS library `laravel-mix` to simplify build and packaging.

To run locally (automatically launch firefox):
```
npm run watch
```

To build library for npm publish:
```
npm run build
```

## Usage
> You will require these to use with Bootstrap 4:

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

// import any datatable extension as you would when using it raw
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
The example App use free API endpoint from typicode [https://jsonplaceholder.typicode.com] so it's not jQuery DataTable.net queryable.  As a result, we have to define a dataSrc wrapper like so:
```
ajax: {
  url: 'https://jsonplaceholder.typicode.com/users',
  dataSrc: (json) => {
    return json
  }
}
```

Here are some server-side ajax parser implementation:
* PHP - https://github.com/lampjunkie/php-datatables
* PHP Symphony - https://github.com/stwe/DatatablesBundle
* PHP Laravel - https://github.com/yajra/laravel-datatables
* dotNET - https://github.com/ALMMa/datatables.aspnet, https://github.com/garvincasimir/csharp-datatables-parser
* NodeJS - https://github.com/jpravetz/node-datatable
* Rails - https://github.com/jbox-web/ajax-datatables-rails

## Documentation
Since it's a wrapper, all/most features are provided by the [jQuery DataTable](https://datatables.net/manual/) library.

More documentations below.

## Parameters
Our component parameters:
```javascript
props: {
  // Set the table classes you wish to use, default with bootstrap4
  // but you can override with: themeforest, foundation, etc..
  className: {
    type: String,
    default: 'table table-striped table-bordered dt-responsive nowrap w-100'
  },
  // the options object: https://datatables.net/manual/options
  opts: {
    type: Object
  },
  /**
   * List all fields to be converted to opts columns
   *
   * @type {Object}
   */
  fields: {
    type: Object
  },
  /**
   * Pass in DataTables.Net loaded jQuery to resolve
   * any multiple loaded browser jQuery conflict
   *
   * @type {Object}
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
},
```

`fields` is an schema object that identify all datatables.net columns, example:

Example:
```json
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
- `defaultContent` provide default html for null
- `render` custom cell rendering function https://datatables.net/reference/option/columns.render

## Additional Headers
Many server-side usage require CSRF and/or API token headers.  Since options are completely exposed, simply use the native method per [jQuery DataTable example](https://editor.datatables.net/manual/security#Prevention)

i.e, something like:
```javascript
options: {
  'ajax': {
    'url': url,
    'type': 'GET',
    'beforeSend': function (request) {
        request.setRequestHeader("token", token);
    }
  }
}
```

If you haven't already figured it out, ajax is basically the signature of [jQuery.ajax](http://api.jquery.com/jquery.ajax/) which is demonstrated here wrapped as [jQuery DataTable ajax pipeline](https://datatables.net/examples/server_side/pipeline.html)

## Row Action Buttons
Use `data-action` attribute to automatically wire up any action button/elements.  To render action button/element in a row, simply define dummy field like so:
```javascript
actions: {
  label: 'Actions',
  defaultContent: '<a href="javascript:void(0);" data-action="edit" class="btn btn-primary btn-sm"><i class="mdi mdi-square-edit-outline"></i> Edit</a>' +
    '<span data-action="delete" class="btn btn-danger btn-sm"><i class="mdi mdi-delete"></i> Delete</span>'
}
```

# MIT
