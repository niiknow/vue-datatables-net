# vue-datatables-net
> Vue jQuery DataTable.net wrapper component 

This library is simply a wrapper for [jQuery DataTable](https://datatables.net/).  It's a tiny package that doesn't include anything, not even the datatable.net core library.  Per example below, you basically have to include only/any datatable.net package(s) that you need.

The initial focus/design of this library is to use with ajax/server-side endpoint.  For local data, simply use native methods like so:

```javascript
component.dataTable.clear().draw();
component.dataTable.rows.add(newDataArray).draw();
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
// you can import these if needed
// this import all buttons that we need
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import 'datatables.net-responsive/js/dataTables.responsive.js';

// import the rest
import 'datatables.net-buttons-bs4'
import 'datatables.net-responsive-bs4'
import 'datatables.net-fixedheader-bs4'
import 'datatables.net-scroller-bs4';
import 'datatables.net-select-bs4';

import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css';
import 'datatables.net-scroller-bs4/css/scroller.bootstrap4.min.css';
import 'datatables.net-select-bs4/css/select.bootstrap4.min.css';
*/
</script>
```

> Use it like the example App

This demonstrate how to pass in overrides for our [jQuery DataTable](https://datatables.net/manual/options) default options - https://github.com/niiknow/vue-datatables-net/blob/master/example/App.vue#L8

**NOTE:**
The example app use free API endpoint from typicode [https://jsonplaceholder.typicode.com] so it's not jQuery DataTable.net compatible.  As a result, we have to define a dataSrc wrapper like so:
```
ajax: {
  url: 'https://jsonplaceholder.typicode.com/users',
  dataSrc: (json) => {
    return json
  }
}
```

Some example server-side ajax parsers implementation:
* PHP - https://github.com/lampjunkie/php-datatables
* PHP Symphony - https://github.com/stwe/DatatablesBundle
* PHP Laravel - https://github.com/yajra/laravel-datatables
* dotNET - https://github.com/ALMMa/datatables.aspnet, https://github.com/garvincasimir/csharp-datatables-parser
* NodeJS - https://github.com/jpravetz/node-datatable
* Rails - https://github.com/jbox-web/ajax-datatables-rails

> Or simply with url that can handle datatable.net server-side endpoint:

```html
<template>
  <div id="app">
    <vdtnet-table :fields="fields" url="/some/api/using/yajra/laravel-datatables/or/similar" />
  </div>
</template>

<script>
import VdtnetTable from 'vue-datatables-net'
import 'datatables.net-bs4'

export default {
  name: 'app',
  components: { VdtnetTable },
  data() {
    const vm = this

    return {
      fields: {
        id: { label: 'ID', sortable: true },
        name: { label: 'Name', sortable: true, searchable: true },
        username: { label: 'Username', sortable: false, searchable: true  },
        email: { label: 'Email' },
        phone: { label: 'Phone' },
        website: { label: 'Website' }
      }
    }
  }
}
</script>
```

## Documentation
Since it's a wrapper, all/most features are provided by the [jQuery DataTable](https://datatables.net/manual/) library.

More documentations below.

## Additional Headers
Since options are completely exposed, simply use the native method per [jQuery DataTable example](https://editor.datatables.net/manual/security#Prevention)

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
Use `data-action` attribute to automatically wire up any action button/elements.  To render action button/element in a row, simply define field like below (also, see example App):
```javascript
actions: {
  label: 'Actions',
  defaultContent: '<a href="javascript:void(0);" data-action="edit" class="btn btn-primary btn-sm"><i class="mdi mdi-square-edit-outline"></i> Edit</a>' +
    '<span data-action="delete" class="btn btn-danger btn-sm"><i class="mdi mdi-delete"></i> Delete</span>'
}
```

# MIT
