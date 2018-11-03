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
    <div class="container-fluid vdtnet-foot"><slot name="FOOT" /></div>
  </div>
</template>

<script>
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
    },
    jquery: {
      type: Object
    },
    selectable: {
      type: Boolean
    }
  },
  data() {
    // initialize defaults
    return {
      options: {
/*eslint-disable */
        dom: "<'row'<'col-sm-12 col-md-9'lB><'col-sm-12 col-md-3'f>>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
/*eslint-enable */
        columns: [],
        language: {
          infoFiltered: ''
        },
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
    const vm = this
    const jq = vm.jq

    // allow user to override default options
    if (vm.opts) {
      vm.options = jq.extend({}, vm.options, vm.opts)
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
          title: field.label || k,
          width: field.width,
          data: field.name,
          visible: field.visible,
          className: field.className
        }

        if (field.width) {
          col.width = field.width
        }

        if (field.defaultContent) {
          col.defaultContent = field.defaultContent
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

    if (vm.selectable) {
      // expand column
      vm.options.columns = [{
        orderable: false,
        className: 'select-checkbox',
        data: null,
        defaultContent: '',
        title: '<input type="checkbox" class="select-all-checkbox">',
        targets: 0
      }].concat(vm.options.columns)

      // console.log(vm.options.columns)
      vm.options.select = jq.extend(
        vm.options.select || {},
        {
          style: 'os',
          selector: 'td:first-child'
        }
      )

      if (!vm.options.order) {
        vm.options.order = [[1, 'asc']]
      }
    }
  },
  mounted() {
    const vm = this
    const jq = vm.jq
    const $el = jq(vm.$refs.table)
    console.log(vm.options.buttons)
    vm.dataTable = $el.DataTable(vm.options)

    if (vm.selectable) {
      $el.on('click', 'th input.select-all-checkbox', (e) => {
        if(jq(e.target).is(':checked')) {
          vm.dataTable.rows().select()
        } else {
          vm.dataTable.rows().deselect()
        }
      })

      vm.dataTable.on('select deselect', () => {
        if (vm.dataTable.rows({
            selected: true
          }).count() !== vm.dataTable.rows().count()) {
          jq('th.select-checkbox').removeClass('selected')
        } else {
          jq('th.select-checkbox').addClass('selected')
        }
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
        if (that.hasClass('vdtnet-container')) {
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
          if (tr.hasClass('child')) {
            tr = tr.prev()
          }
          const row  = vm.dataTable.row(tr)
          const data = row.data()
          vm.$emit(action, {data, row, that})
        } else {
          // not a row click, must be other kind of action
          // such as bulk, csv, pdf, etc...
          vm.$emit(action, {target})
        }
      }
    })
  }
}
</script>
<style>
.select-checkbox, .select-all-checkbox {
  cursor: pointer;
}
.dataTables_length {
  float: left;
  padding-right: 10px;
}
</style>
