<template>
  <div class="vdtnet-container">
    <div class="container-fluid">
      <slot name="TOP" />
    </div>
    <div class="vtdnet-table" v-once>
      <table
        :id="myuid"
        :class="className"
        ref="table"
      >
        <thead>
          <tr>
            <th
              v-for="(field, i) in options.columns"
              :key="i"
            >
              <slot :name="`HEAD_${field.name}`">
                <div :class="field.classes" v-html="field.title" />
              </slot>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="container-fluid">
      <slot name="BOTTOM" />
    </div>
  </div>
</template>

<script>
// https://github.com/sstepanovvl/datatables-as-vuejs-component/blob/master/components/DataTable.1.vue
import $ from 'jquery'

import 'datatables.net-bs4' // this automatically import base datatables.net

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

export default {
  name: 'Vdtnet-Table',
  props: {
    className: {
      type: String,
      default: 'table table-striped table-bordered dt-responsive nowrap w-100'
    },
    url: {
      type: String
    },
    opts: {
      type: Object
    },
    fields: {
      type: Object
    }
  },
  data() {
    // initialize defaults
    return {
      options: {
        processing: true,
        pageLength: 15,
        searching: true,
        searchDelay: 1500,
        destroy: true,
        ordering: true,
        lengthChange: true,
        serverSide: true,
        ajax: '',
        fixedHeader: true,
        dom: '<\'row\'<\'col-sm-12 col-md-6\'B><\'col-sm-12 col-md-6\'f>>' +
          '<\'row\'<\'col-sm-12\'tr>>' +
          '<\'row\'<\'col-sm-12 col-md-5\'i><\'col-sm-12 col-md-7\'p>>',
        columns: [],
        butons: []
      },
      dataTable: null
    }
  },
  mounted() {
    const vm = this

    // allow user to override default options
    if (vm.opts) {
      vm.options = $.extend({}, vm.options, vm.opts)
    }

    if (vm.url) {
      vm.options.ajax = vm.url
    }

    // if fields are passed in, generate column definition
    // from our custom fields schema
    if (vm.fields) {
      const fields = vm.fields
      const cols   = vm.options.columns

      for (let k in fields) {
        const field = fields[k]
        field.name = field.name || k

        // generate
        let col = {
          searchable: field.searchable,
          defaultContent: '',
          title: field.label || k,
          width: field.width,
          data: field.name,
          visible: field.visible,
          className: field.className
        }

        if (field.width) {
          col.width = field.width
        }

        if (field.sortable) {
          col.orderable = field.sortable
        }

        if (field.render) {
          col.render = field.render
        }
        // console.log(col)

        cols.push(col)
      }
    }

    vm.dataTable = $(vm.$refs.table).DataTable(vm.options)
  }
}
</script>

<style scoped>
</style>
