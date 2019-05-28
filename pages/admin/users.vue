<template>
  <div class="col-lg-12"></div>
</template>

<script>
export default {
  name: 'users',
  layout: 'admin',

  middleware: ["authenticated", "check_role"],

  mounted() {
    this.$store.dispatch('user/list')
  },

  computed: {
    catsList() {
      return this.$store.getters['user/USERS']
    }
  }

}
</script>

<style scoped>

</style>
