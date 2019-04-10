<template>
  <div
    id="app"
    class="col-12"
  >
    <div class="row">
      <div class="col-12 col-md-9">
        <div class="dt-buttons btn-group">
          <button
            class="btn btn-secondary buttons-copy buttons-html5"
            @click.stop.prevent="doExport('csv')"
          >
            Csv
          </button>
          <button
            class="btn btn-secondary buttons-copy buttons-html5"
            @click.stop.prevent="doExport('excel')"
          >
            Excel
          </button>
          <button
            class="btn btn-secondary buttons-copy buttons-html5"
            @click.stop.prevent="doExport('pdf')"
          >
            Pdf
          </button>
        </div>
      </div>
      <div class="col-12 col-md-3">
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
                <i class="mdi mdi-magnify" /> Go
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- Using the VdtnetTable component -->
    <vdtnet-table
      ref="table"
      :fields="fields"
      :opts="options"
      :select-checkbox="1"
      :details="details"
      @edit="doAlertEdit"
      @delete="doAlertDelete"
      @reloaded="doAfterReload"
    >
      <template slot="HEAD__details_control">
        Show Details
      </template>
    </vdtnet-table>
  </div>
</template>

<script>
// this demonstrate with buttons and responsive master/details row
import VdtnetTable from '../src'
// since I already include on index.html, I don't need to include it here
// import 'datatables.net/js/jquery.dataTables.js'
import 'datatables.net-bs4/js/dataTables.bootstrap4.js'

// import the rest
import 'datatables.net-select-bs4'

import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css'
import 'datatables.net-select-bs4/css/select.bootstrap4.min.css'

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
        responsive: false,
        processing: true,
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
          isLocal: true,
          label: 'Actions',
          defaultContent: '<a href="javascript:void(0);" data-action="edit" class="btn btn-primary btn-sm"><i class="mdi mdi-square-edit-outline"></i> Edit</a>' +
            '<span data-action="delete" class="btn btn-danger btn-sm"><i class="mdi mdi-delete"></i> Delete</span>'
        },
        name: { label: 'Name', sortable: true, searchable: true, defaultOrder: 'desc' },
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
      quickSearch: '',
      details: {
        template: 'I\'m a child for {{ data.id }} yall'
      }
    }
  },
  methods: {
    doLoadTable(cb) {
      $.getJSON( 'https://jsonplaceholder.typicode.com/users', function( data ) {
        cb(data)
      })
    },
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
    },
    doExport(type) {
      const parms = this.$refs.table.getServerParams()
      parms.export = type
      window.alert('GET /api/v1/export?' + jQuery.param(parms))
    }
  }
}
</script>

<style scoped>
</style>
