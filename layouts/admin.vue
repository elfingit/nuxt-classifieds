<template>
<div class="container-fluid admin">

  <no-ssr>
    <notifications group="alerts"
                   position="bottom right">
      <template slot="body" slot-scope="props">
        <b-alert :show="props.item.duration || 3000"
                 dismissible
                 :variant="props.item.type || 'info'"
                 @dismissed="props.item.timer=0">
          <p>{{props.item.text}}</p>
          <b-progress :variant="props.item.type"
                      striped
                      :animated="true"
                      :max="props.item.duration"
                      :value="props.item.timer"
                      height="4px">
          </b-progress>
        </b-alert>
      </template>
    </notifications>
  </no-ssr>

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
