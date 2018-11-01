<template>
  <div class="vdtnet-container">
    <div class="container-fluid">
      <div class="form-group" v-once>
        <vdtnet-filters @apply="applyFilters" />
      </div>
    </div>
    <div class="vtdnet-table" v-once>
      <table
        :id="myuid"
        :class="classes"
        class=""
      >
        <thead>
          <tr>
            <th
              v-for="(field, name) in table.fields"
              :key="name"
            >
              <slot :name="`HEAD_${name}`">
                <div
                  :class="{'text-right': ['number'].includes(field.type)}"
                >
                  {{ field.label || name | spaceSeparated }}
                </div>
              </slot>
            </th>
          </tr>
        </thead>
        <tfoot v-show="footer">
          <tr>
            <th
              v-for="(field, name) in table.fields"
              :key="name"
            >
              <slot :name="`FOOT_${name}`">
                <div
                  :class="{'text-right': ['number'].includes(field.type)}"
                >
                  {{ field.label || name | spaceSeparated }}
                </div>
              </slot>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
// https://github.com/sstepanovvl/datatables-as-vuejs-component/blob/master/components/DataTable.1.vue
import $ from 'jquery'
import 'datatables.net-bs4'
import 'datatables.net-responsive-bs4'
import 'datatables.net-fixedheader-bs4'
import 'datatables.net-buttons-bs4'
import VdtnetFilters from './VdtnetFilters.vue'

export default {
  name: 'Vdtnet-Table',
  components: { VdtnetFilters },
  props: {
    footer: {
      type: Boolean,
      default: false
    },
    classes: {
      type: String,
      default: 'table table-striped table-bordered'
    },
    opts: {
      type: Object
    }
  },
  data() {
    return {
      settings: {
        destroy: true,
        serverSide: true,
        ajax: '',
        fixedHeader: true,
        dom: '<\'row\'<\'col-sm-12 col-md-6\'B><\'col-sm-12 col-md-6\'f>>' +
          '<\'row\'<\'col-sm-12\'tr>>' +
          '<\'row\'<\'col-sm-12 col-md-5\'i><\'col-sm-12 col-md-7\'p>>',
        columns: []
        /* examples
        columns: [
            { data: 'id' },
            { data: 'date', render(data, type, row) {
                return moment(data).format('YYYY-MM-DD')
              }
            },
            { data: 'actions', sortable: false }
        ]
        */
      }
    }
  },
  computed: {
    options() {
      const vm = this

      // append other things
      return $.extend({}, vm.settings, {})
    }
  },
  mounted() {
    var columns = [];
    ['dataKey'].forEach(function(i,e){
        let width = '100px'
        let t = i
        let className = 'text-center'
        let visible = true
        let r = function (data,type,row,meta) { //1. Переопределяем рендер ячейки
            if (type === 'display') {
                return data
                let r = vm.$emit('displayCellCallback',{data,type,row,meta})  //2. отправляем данные чтобы обернуть в vue компонент, чтобы ими управлять
                console.log(r)//6. тут мы получаем например select
                return r //7. и отправляем его в ячейку
            }
            if (type === 'filter') {
                return data
            }
            if (type === 'type') {
                return type
            }
            if (type === 'sort') {
                return data
            }
        }
        columns.push({
            data: i,
            searchable: true,
            defaultContent: '-',
            title: t,
            // width: width,
            name: i,
            visible: visible,
            className: className,
            render: r
        })
    })
    this.parameters.columns = columns
    this.parameters.data = [{
               dataKey : 1
           },{
               dataKey : 2
           },{
               dataKey : 3
           }]
    this.dataTable = $(this.$el).DataTable(this.parameters)
    const vm = this
    $(this.$el).on('click', 'td',function(){
        let data = vm.dataTable.row( $(this).closest('tr')).data()
        vm.$emit('editRow', data)
    })
    $(this.$el).on('click', 'td',function(){
        let data = vm.dataTable.row( $(this).closest('tr')).data()
        vm.$emit('deleteRow', data)
    })
  }
}
</script>

<style scoped>
</style>
