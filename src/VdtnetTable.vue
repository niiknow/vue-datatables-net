<template>
  <div class="vdtnet-container">
    <div class="container-fluid vdtnet-head"><slot name="HEAD" /></div>
    <div class="vtdnet-body">
      <table
        v-once
        ref="table"
        :class="className"
      >
        <thead>
          <tr>
            <th
              v-for="(field, i) in options.columns"
              :key="i"
            >
              <slot :name="`HEAD_${field.name}`">
                <div
                  :class="field.classes"
                  v-html="field.title" />
              </slot>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="container-fluid vdtnet-foot"><slot name="FOOT" /></div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'VdtnetTable',
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
        dom: '<\'row\'<\'col-sm-12 col-md-4\'l><\'text-right col-sm-12 col-md-6\'B><\'col-sm-12 col-md-2\'f>>' +
          '<\'row\'<\'col-sm-12\'tr>>' +
          '<\'row\'<\'col-sm-12 col-md-5\'i><\'col-sm-12 col-md-7\'p>>',
        columns: [],
        buttons: []  // remove any button defaults
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

    const $el = $(vm.$refs.table)
    vm.dataTable = $el.DataTable(vm.options)

    // wire up view, edit, and/or delete button
    // var d = table.row( this ).data();
    $el.find('[data-action]').on('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      const $this  = $(this)
      const action = $this.data('action')
      if (action) {
        const row  = vm.dataTable.row($this.closest('tr'))
        const data = row.data()
        vm.$emit(action, {data, row, $this})
      }
    })
  }
}
</script>
