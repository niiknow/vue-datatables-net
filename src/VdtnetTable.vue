<template>
  <div
    :class="classes"
  >
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
    /**
     * Set the table classes you wish to use, default with bootstrap4
     * but you can override with: themeforest, foundation, etc..
     *
     * @type String
     */
    className: {
      type: String,
      default: 'table table-striped table-bordered nowrap w-100'
    },
    /**
     * the options object: https://datatables.net/manual/options
     *
     * @type Object
     */
    opts: {
      type: Object
    },
    /**
     * List all fields to be converted to opts columns
     *
     * @type Object
     */
    fields: {
      type: Object
    },
    /**
     * Pass in DataTables.Net jQuery to resolve any conflict from
     * multiple jQuery loaded in the browser
     *
     * @type Object
     */
    jquery: {
      type: Object
    },
    /**
     * The select-checkbox column index (start at 1)
     * Current implementation require datatables.net-select
     *
     * @type Number
     */
    selectCheckbox: {
      type: Number
    },
    /**
     * Provide custom local data loading.  Warning: this option has not been
     * thoroughly tested.  Please use ajax and serverSide instead.
     *
     * @type Function
     */
    dataLoader: {
      type: Function
    },
    /**
     * true to hide the footer of the table
     *
     * @type Boolean
     */
    hideFooter: {
      type: Boolean
    },
    /**
     * The details column configuration of master/details.
     *
     * @type {Object}
     */
    details: {
      type: Object
    }
  },
  data() {
    // initialize defaults
    return {
      options: {
/*eslint-disable */
        dom: "tr<'row vdtnet-footer'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'pl>>",
/*eslint-enable */
        columns: [],
        language: {
          infoFiltered: ''
        },
        lengthMenu: [ [15, 100, 500, 1000, -1], [15, 100, 500, 1000, 'All'] ],
        pageLength: 15,
        buttons: []  // remove any button defaults
      },
      dataTable: null
    }
  },
  computed: {
    jq() {
      return this.jquery || window.jQuery
    },
    classes() {
      let classes = 'table-responsive vdtnet-container'
      if (this.hideFooter) {
        classes += ' hide-footer'
      }

      return classes
    }
  },
  created() {
    const vm     = this
    const jq     = vm.jq
    const orders = []

    let startCol = 0
    let icol     = 0

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
        field.name  = field.name || k

        // disable search and sort for local field
        if (field.isLocal) {
          field.searchable = false
          field.sortable  = false
        }

        // generate
        let col = {
          title:      field.label || field.name,
          width:      field.width,
          data:       field.name,
          name:       field.name,
          className:  field.className
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

        if (field.hasOwnProperty('visible')) {
          col.visible = field.visible
        }

        if (field.hasOwnProperty('searchable')) {
          col.searchable = field.searchable
        }

        if (field.template) {
          field.render = vm.compileTemplate(field.template)
        }

        if (field.render) {
          col.render = field.render
        }

        // console.log(col)
        cols.push(col)

        if (field.defaultOrder) {
          orders.push([icol, field.defaultOrder])
        }

        icol++
      }
    }

    // apply orders calculated from above
    vm.options.order = vm.options.order || orders

    if (vm.selectCheckbox) {
      vm.selectCheckbox = vm.selectCheckbox || 1

      // create checkbox column
      const col = {
        orderable: false,
        searchable: false,
        name: '_select_checkbox',
        className: 'select-checkbox',
        data: null,
        defaultContent: '',
        title: '<input type="checkbox" class="select-all-checkbox">'
      }
      vm.options.columns.splice(vm.selectCheckbox - 1, 0, col)

      // console.log(vm.options.columns)
      vm.options.select = jq.extend(
        vm.options.select || {},
        {
          style: 'os',
          selector: 'td.select-checkbox'
        }
      )

      if (vm.selectCheckbox === 1) {
        startCol++
      }
    }

    // handle master details
    if (vm.details) {
      vm.details.index = vm.details.index || 1

      // create details column
      const col = {
        orderable: false,
        searchable: false,
        name: '_details_control',
        className: 'details-control',
        data: null,
        defaultContent: vm.details.icons || '<span class="details-plus" title="Show details">+</span><span class="details-minus" title="Hide details">-</span>'
      }
      vm.options.columns.splice(vm.details.index - 1, 0, col)

      if (vm.details.index === 1) {
        startCol++
      }
    }

    if (startCol > 0) {
      if (vm.options.order) {
        vm.options.order.forEach((v) => {
          v[0] += startCol
        })
      } else {
        vm.options.order = [[startCol, 'asc']]
      }
    }

    // handle local data loader
    if (vm.dataLoader) {
      delete vm.options.ajax
      vm.options.serverSide = false
    }
  },
  mounted() {
    const vm = this
    const jq = vm.jq
    const $el = jq(vm.$refs.table)

    // console.log(vm.options.buttons)
    vm.dataTable = $el.DataTable(vm.options)

    if (vm.selectCheckbox) {
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
          vm.$emit(action, data, row, tr, that)
        } else {
          // not a row click, must be other kind of action
          // such as bulk, csv, pdf, etc...
          vm.$emit(action, null, null, null, target)
        }
      }
    })

    // handle master/details
    if (vm.details) {
      // default to render function
      let renderFunc = vm.details.render

      // must be string template
      if (vm.details.template) {
        renderFunc = vm.compileTemplate(vm.details.template)
      }

      // handle master/details
      // Add event listener for opening and closing details
      $el.on('click', 'td.details-control', (e) => {
        e.preventDefault()
        e.stopPropagation()
        const target = jq(e.target)
        let that     = target
        let tr       = that.closest('tr')
        if (tr.attr('role') !== 'row') {
          tr = tr.prev()
        }
        const row = vm.dataTable.row( tr )
        if ( row.child.isShown() ) {
          // This row is already open - close it
          row.child.hide()
          tr.removeClass('master')
        }
        else {
          // Open this row
          const data = row.data()
          row.child( renderFunc(data, 'child', row, tr) ).show()
          tr.addClass('master')
        }
      })
    }

    // finally, load data
    if (vm.dataLoader) {
      vm.reload()
    }
  },
  beforeDestroy() {
    const vm = this
    if (vm.dataTable) {
      vm.dataTable.destroy(true)
    }

    vm.dataTable = null
  },
  methods: {
    /**
     * Vue.compile a template string and return the compiled function
     *
     * @param  {String} template the string template
     * @return {Function}          the compiled template function
     */
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
    },
    /**
     * Set table data array that was loaded from somewhere else
     * This method allow for local setting of data; though, it
     * is recommended to use ajax instead of this.
     *
     * @param {Array} data   the array of data
     * @return {Object}            the component
     */
    setTableData(data) {
      const vm = this
      if (data.constructor === Array) {
        vm.dataTable.clear().rows.add(data)
        vm.dataTable.draw(false)
        vm.dataTable.columns.adjust()
      }
      return vm
    },
    /**
     * pass through reload method
     *
     * @param  {Boolean}  resetPaging true to reset current page position
     * @return {Object}            the component
     */
    reload(resetPaging = false) {
      const vm = this
      if (vm.dataLoader) {
        // manual data loading
        vm.dataLoader((data) => {
          if (data && !data.data) {
            data = { data: data }
          }
          vm.setTableData( data.data )

          vm.$emit('reloaded', data, vm)
        })
      } else {
        vm.dataTable.ajax.reload( (data) => { vm.$emit('reloaded', data, vm) } , resetPaging )
      }

      return vm
    },
    search(value) {
      const vm = this
      vm.dataTable.search( value ).draw()

      return vm
    },
    setPageLength(value) {
      const vm = this
      vm.dataTable.page.len( value )

      return vm.reload()
    },
    getServerParams() {
      if (this.dataLoader) {
        return {}
      }

      return this.dataTable.ajax.params()
    }
  }
}
</script>
<style>
.select-checkbox, .select-all-checkbox {
  cursor: pointer;
}
.vdtnet-footer .dataTables_length {
  padding-top: 6px;
  padding-right: 10px;
}
.vdtnet-footer .dataTables_length, .vdtnet-footer .dataTables_paginate {
  float: right;
}
.hide-footer .vdtnet-footer {
  display: none;
}

.master .details-plus
{
  cursor: pointer;
  display: none;
}
.details-minus
{
  cursor: pointer;
  display: none;
}
.master .details-minus
{
  cursor: pointer;
  display: inline;
}
.details-control {
  cursor: pointer;
  font-weight: 700;
}
</style>
