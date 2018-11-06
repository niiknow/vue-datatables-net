<template>
  <div id="app">
    <div class="row">
      <div class="col-sm-12 col-md-9">
        <div class="dt-buttons btn-group">
          <button class="btn btn-secondary buttons-copy buttons-html5">button1</button>
          <button class="btn btn-secondary buttons-copy buttons-html5">button2</button>
          <button class="btn btn-secondary buttons-copy buttons-html5">button3</button>
        </div>
      </div>
      <div class="col-sm-12 col-md-3">
        <form
          class="form-inline d-flex mx-1 justify-content-end"
          @submit.stop.prevent="doSearch"
        >
          <div class="input-group">
            <input
              v-model="quickSearch"
              type="search"
              placeholder="Quick search"
              class="form-control"
            >
            <div class="input-group-append">
              <button
                type="submit"
                class="btn btn-outline-secondary"
              >
                <i class="mdi mdi-magnify"/> Go
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <vdtnet-table
      ref="table"
      :fields="fields"
      :opts="options"
      :selectable="true"
      @edit="doAlertEdit"
      @delete="doAlertDelete"
      @reloaded="doAfterReload"
    />
    <h3>Note:</h3>
    <ul>
      <li>Select Checkbox is on 2nd column to prevent conflict with responsive.</li>
      <li>Responsive also has conflict with custom master/details implementation because, by default, it use the jQuery DataTables child function.  Therefore, it's probably best to use some kind of action button to support master/details.</li>
    </ul>
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
        saveState: true
      },
      fields: {
        id: { label: 'ID', sortable: true },
        actions: {
          label: 'Actions',
          defaultContent: '<a href="javascript:void(0);" data-action="edit" class="btn btn-primary btn-sm"><i class="mdi mdi-square-edit-outline"></i> Edit</a>' +
            '<span data-action="delete" class="btn btn-danger btn-sm"><i class="mdi mdi-delete"></i> Delete</span>'
        },
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
        }
      },
      quickSearch: ''
    }
  },
  methods: {
    doAlertEdit(data) {
      window.alert(`row edit click for item ID: ${data.id}`)
    },
    doAlertDelete(data, row, tr, target) {
      window.alert(`deleting item ID: ${data.id}`)

      // row.remove() doesn't work when serverside is enabled
      // so we fake it with dom remove
      tr.remove()

      const table = this.$refs.table
      setTimeout(() => {
        // simulate extra long running ajax
        table.reload()
      }, 1500)
    },
    doAfterReload(data, table) {
      window.alert('data reloaded')
    },
    doSearch() {
      this.$refs.table.search(this.quickSearch)
    }
  }
}
</script>

<style scoped>
</style>
