<template>
  <div id="app">
    <vdtnet-table :fields="fields" :opts="options" />
  </div>
</template>

<script>
import VdtnetTable from '../src'
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
export default {
  name: 'app',
  components: { VdtnetTable },
  data() {
    const vm = this

    return {
      options: {
        ajax: {
          url: 'https://jsonplaceholder.typicode.com/users',
          dataSrc: (json) => {
            // console.log(json)
            return json
          }
        }
      },
      fields: {
        id: { label: 'ID', sortable: true },
        name: { label: 'Name', sortable: true, searchable: true },
        username: { label: 'Username', sortable: false, searchable: true  },
        email: { label: 'Email' },
        address: { label: 'Address' },
        phone: { label: 'Phone' },
        website: { label: 'Website' }
      }
    }
  }
}
</script>

<style scoped>
</style>
