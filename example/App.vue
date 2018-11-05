<template>
  <div id="app">
    <vdtnet-table
      :fields="fields"
      :opts="options"
      :selectable="true"
      :details="childOptions"
      @edit="alert('row edit button clicked')"
      @delete="alert('row delete button clicked')"
    />
  </div>
</template>

<script>
// this demonstrate with buttons and responsive master/details row
import VdtnetTable from '../src'
import 'datatables.net/js/jquery.dataTables.js'
import 'datatables.net-bs4/js/dataTables.bootstrap4.js'

// import buttons
import 'datatables.net-buttons/js/dataTables.buttons.js'
import 'datatables.net-buttons/js/buttons.html5.js'
import 'datatables.net-buttons/js/buttons.print.js'
import 'datatables.net-responsive/js/dataTables.responsive.js'

// import the rest
import 'datatables.net-buttons-bs4'
import 'datatables.net-responsive-bs4'
import 'datatables.net-select-bs4'

import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css'
import 'datatables.net-select-bs4/css/select.bootstrap4.min.css'
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css'
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css'

export default {
  name: 'App',
  components: { VdtnetTable },
  data() {
    const vm = this

    return {
      options: {
        ajax: {
          url: 'https://jsonplaceholder.typicode.com/users',
          dataSrc: (json) => {
            return json
          }
        },
        processing: true,
        pageLength: 10,
        searching: true,
        searchDelay: 1500,
        destroy: true,
        ordering: true,
        lengthChange: true,
        serverSide: true,
        fixedHeader: true,
        buttons: ['copy', 'csv', 'print']
      },
      fields: {
        id: { label: 'ID', sortable: true },
        name: { label: 'Name', sortable: true, searchable: true },
        username: { label: 'Username', sortable: false, searchable: true  },
        email: { label: 'Email' },
        address: {
          label: 'Address',
          template: '{{ data.street }}, {{ data.suite }}, {{ data.city }} {{ data.zipcode }}'
        },
        phone: { label: 'Phone' },
        website: {
          label: 'Website',
          render: (data) => {
            return `https://${ data }`
          }
        },
        actions: {
          label: 'Actions',
          defaultContent: '<a href="javascript:void(0);" data-action="edit" class="btn btn-primary btn-sm"><i class="mdi mdi-square-edit-outline"></i> Edit</a>' +
            '<span data-action="delete" class="btn btn-danger btn-sm"><i class="mdi mdi-delete"></i> Delete</span>'
        }
      },
      childOptions: {
        template: 'I\'m a child yall'
      }
    }
  },
  methods: {
    alert(msg) {
      window.alert(msg)
    }
  }
}
</script>

<style scoped>
</style>
