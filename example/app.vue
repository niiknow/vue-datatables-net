<template>
  <div
    id="app"
    class="col-12"
  >
    <div class="row">
      <div class="col-12 col-md-9">
        Below are client-side buttons demo, go here to see
        <a
          href="https://laratt.niiknow.org/home/contacts"
          target="_blank"
        >
          server-side buttons demo
        </a>
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
      @table-creating="doCreating"
      @table-created="doCreated"
    >
      <template slot="HEAD__details_control">
        <b>Show Details</b>
      </template>
      <template
        slot="address2"
        slot-scope="ctx"
      >
        <span>{{ ctx.data.city }}, {{ ctx.comp.formatCode(ctx.data.zipcode) }}</span>
      </template>
      <template
        slot="_details"
        slot-scope="ctx"
      >
        <strong>I'm a child for {{ ctx.data.id }} yall</strong>
      </template>
    </vdtnet-table>
  </div>
</template>

<script>
// this demonstrate with buttons and responsive master/details row
import VdtnetTable from '../src'

import 'datatables.net-bs4'

// import buttons and plugins
import 'datatables.net-buttons/js/dataTables.buttons.js'
import 'datatables.net-buttons/js/buttons.html5.js'
import 'datatables.net-buttons/js/buttons.print.js'

// import the rest
import 'datatables.net-buttons-bs4'
import 'datatables.net-select-bs4'

import 'datatables.net-select-bs4/css/select.bootstrap4.min.css'
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css'

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
        buttons: ['copy', 'csv', 'print'],
/*eslint-disable */
        dom: "Btr<'row vdtnet-footer'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'pl>>",
/*eslint-enable */
        responsive: false,
        processing: true,
        searching: true,
        searchDelay: 1500,
        destroy: true,
        ordering: true,
        lengthChange: true,
        serverSide: true,
        fixedHeader: true,
        saveState: true /*,
        select: {
          style: 'multi'
        }*/
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
        address1: {
          label: 'Address1',
          data: 'address',
          template: '{{ data.street }}, {{ data.suite }}'
        },
        address2: {
          label: 'Address2',
          data: 'address'
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
      details: {}
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
    doCreating(comp, el) {
      console.log('creating')
    },
    doCreated(comp) {
      console.log('created')
    },
    doSearch() {
      this.$refs.table.search(this.quickSearch)
    },
    doExport(type) {
      const parms = this.$refs.table.getServerParams()
      parms.export = type
      window.alert('GET /api/v1/export?' + jQuery.param(parms))
    },
    formatCode(zipcode) {
      return zipcode.split('-')[0]
    }
  }
}
</script>

<style scoped>
</style>
