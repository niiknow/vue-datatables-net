<template>
  <div class="vdtnet-filters">
    <div class="form-group">
      <div ref="builder" />
    </div>

    <button
      class="btn btn-primary btn-lg"
      title="Apply selected filters."
      @click="applyFilter"
    >
      <i class="fa fa-filter" /> Filter
    </button>

    <button
      class="btn btn-default btn-lg"
      @click="resetFilter"
    >
      <i class="fa fa-ban" /> Reset filters
    </button>
  </div>
</template>

<script>
import queryBuilder from 'jQuery-QueryBuilder'

export default {
  name: 'VdtnetFilters',
  props: {
    filters: {
      type: Object
    }
  },
  data() {
    return {
      builder: null
    }
  },
  mounted() {
    const vm = this

    vm.builder = $(vm.$refs.builder).queryBuilder({
      filters: vm.filters
    }).on(
      'afterAddRule.queryBuilder afterAddGroup.queryBuilder afterDeleteGroup.queryBuilder afterDeleteRule.queryBuilder',
      () => {
        vm.$emit('apply', null)
    }).removeClass('form-inline')
  },
  methods: {
    applyFilter() {
      const rules = this.builder.queryBuilder('getRules')

      if (rules) {
        this.$emit('apply', rules)
      }
    },
    resetFilter() {
      this.builder.queryBuilder('reset')
      this.$emit('apply', {})
    }
  },
}
</script>

<style scoped>
</style>
