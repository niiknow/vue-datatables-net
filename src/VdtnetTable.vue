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
              <slot
                :name="`HEAD_${field.name}`"
                :field="field"
                :i="i"
              >
                <div
                  :class="field.className"
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
    const jq = vm.jquery || window.jQuery

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

    const $el = jq(vm.$refs.table)
    vm.dataTable = $el.DataTable(vm.options)

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
