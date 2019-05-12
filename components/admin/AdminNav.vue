<template>
  <nav class="navbar navbar-dark bg-primary">
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
      <a class="navbar-brand" href="#">C</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="#">Home</a>
          <nuxt-link to="categories" class="nav-item nav-link">Categories</nuxt-link>
        </div>
      </div>
    </nav>
  </nav>
</template>

<script>
    export default {
        name: "AdminNav"
    }
</script>

<style scoped>

</style>
