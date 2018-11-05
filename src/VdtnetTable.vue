<template>
  <div class="vdtnet-container">
    <table
      v-once
      ref="table"
      :class="className"
      cellpadding="0"
    >
      <thead>
        <tr>
          <th
            v-for="(field, i) in options.columns"
            :key="i"
            :class="field.className"
          >
            <slot
              :name="`HEAD_${field.name}`"
              :field="field"
              :i="i"
            >
              <div v-html="field.title" />
            </slot>
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
export default {
  name: 'VdtnetTable',
  props: {
    // Set the table classes you wish to use, default with bootstrap4
    // but you can override with: themeforest, foundation, etc..
    className: {
      type: String,
      default: 'table table-striped table-bordered nowrap w-100'
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
  data() {
    // initialize defaults
    return {
      options: {
/*eslint-disable */
        dom: "<'row'<'col-sm-12 col-md-9'<'dataTables_toolbar'><'dataTables_buttons'B>l><'col-sm-12 col-md-3'f>>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
/*eslint-enable */
        columns: [],
        language: {
          infoFiltered: ''
        },
        responsive: true,
        buttons: []  // remove any button defaults
      },
      dataTable: null
    }
  },
  computed: {
    jq() {
      return this.jquery || window.jQuery
    }
  },
  created() {
    const vm  = this
    const jq  = vm.jq

    // allow user to override default options
    if (vm.opts) {
      vm.options = jq.extend({}, vm.options, vm.opts)
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
          title: field.label || k,
          width: field.width,
          data: field.name,
          visible: field.visible,
          className: field.className
        }

        if (field.width) {
          col.width = field.width
        }

        if (field.hasOwnProperty('defaultContent')) {
          col.defaultContent = field.defaultContent
        }

        if (field.hasOwnProperty('sortable')) {
          col.orderable = field.sortable
        }

        if (field.template) {
          field.render = vm.compileTemplate(field.template)
        }

        if (field.render) {
          col.render = field.render
        }
        // console.log(col)

        cols.push(col)
      }
    }

    if (vm.selectable) {
      // expand column
      const col = {
        orderable: false,
        className: 'select-checkbox',
        data: null,
        defaultContent: '',
        title: '<input type="checkbox" class="select-all-checkbox">'
      }
      vm.options.columns.splice(1, 0, col)

      // console.log(vm.options.columns)
      vm.options.select = jq.extend(
        vm.options.select || {},
        {
          style: 'os',
          selector: 'td.select-checkbox'
        }
      )
    }
  },
  mounted() {
    const vm = this
    const jq = vm.jq
    const $el = jq(vm.$refs.table)

    // console.log(vm.options.buttons)
    vm.dataTable = $el.DataTable(vm.options)

    if (vm.selectable) {
      // handle select all checkbox
      $el.on('click', 'th input.select-all-checkbox', (e) => {
        if(jq(e.target).is(':checked')) {
          vm.dataTable.rows().select()
        } else {
          vm.dataTable.rows().deselect()
        }
      })

      // handle individual row select events
      vm.dataTable.on('select deselect', () => {
        const $input = $el.find('th input.select-all-checkbox')
        if (vm.dataTable.rows({
            selected: true
          }).count() !== vm.dataTable.rows().count()) {
          jq('th.select-checkbox').removeClass('selected')
          $input.attr('checked', false)
        } else {
          jq('th.select-checkbox').addClass('selected')
          $input.attr('checked', true)
        }
        // TODO: vm.$emit the selected row?
      })
    }

    // wire up edit, delete, and/or action buttons
    $el.on('click', '[data-action]', (e) => {
      e.preventDefault()
      e.stopPropagation()
      const target = jq(e.target)
      let that     = target
      let action   = that.attr('data-action')
      while(!action) {
        // don't let it propagate outside of container
        if (that.hasClass('vdtnet-container') ||
          that.prop('tagName') === 'table') {
          // no action, simply exit
          return
        }
        that   = that.parent()
        action = that.attr('data-action')
      }

      // only emit if there is action
      if (action) {
        // detect if row action
        let tr = that.closest('tr')
        if (tr) {
          if (tr.attr('role') !== 'row') {
            tr = tr.prev()
          }
          const row  = vm.dataTable.row(tr)
          const data = row.data()
          vm.$emit(action, data, row, that, tr)
        } else {
          // not a row click, must be other kind of action
          // such as bulk, csv, pdf, etc...
          vm.$emit(action, target)
        }
      }
    })
  },
  methods: {
    compileTemplate(template) {
      const vm  = this
      const jq  = vm.jq
      const res = Vue.compile(`<div>${template}</div>`)
      const renderFunc = (data, type, row, meta) => {
        const comp = new Vue({
          data: {
              data: data,
              type: type,
              row: row,
              meta: meta
          },
          render: res.render,
          staticRenderFns: res.staticRenderFns
        }).$mount()
        return jq(comp.$el).html()
      }

      return renderFunc
    }
  }
}
</script>
<style>
.select-checkbox, .select-all-checkbox {
  cursor: pointer;
}
.dataTables_toolbar, .dataTables_buttons, .dataTables_length {
  float: left;
  padding-right: 10px;
}
</style>
