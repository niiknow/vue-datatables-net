# vue-datatables-net
> Vue jQuery DataTable.net component 

This library is simply a wrapper for [jQuery DataTable](https://datatables.net/).  It's a tiny package that doesn't include anything, not even the datatable.net core library.  Per example below, you basically have to include any/only datatable.net package(s) that you need.

## Usage
Like our example App, which demonstrate how to pass in overrides for our [jQuery DataTable](https://datatables.net/manual/options) default options - https://github.com/niiknow/vue-datatables-net/blob/master/example/App.vue#L8

Or simply with url that can handle datatable.net server-side endpoint:
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

More documentation for this library, to come.

# MIT
