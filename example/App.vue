<template>
  <div id="app">
    <vdtnet-table :fields="fields" :opts="options" />
  </div>
</template>

<script>
import { VdtnetTable } from '../src'

export default {
  name: 'app',
  components: { VdtnetTable },
  data() {
    const vm = this

    return {
      options: {
        ajax: {
          url: 'https://jsonplaceholder.typicode.com/users',
          dataSrc: (json) => {
            console.log(json)
            return json
          }
        }
      },
      fields: {
        id: { label: 'ID', sortable: true },
        name: { label: 'Name', sortable: true, searchable: true },
        username: { label: 'Username' },
        email: { label: 'Email' },
        address: { label: 'Address' },
        phone: { label: 'Phone' },
        website: { label: 'Website' }
      }
    }
  }
}
</script>

<style scoped>
</style>
