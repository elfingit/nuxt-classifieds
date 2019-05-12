<template>
<div class="container-fluid admin">
  <admin-nav></admin-nav>
  <section class="main">
    <nuxt/>
  </section>
</div>
</template>
<script>
  import AdminNav from '~/components/admin/AdminNav'
  export  default {
    components: { AdminNav }
  }
</script>
<style scoped>

</style>
