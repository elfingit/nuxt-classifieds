<template>
  <div class="row">
    <div class="col-4 mx-auto">
      <div class="card">
        <div class="card-header">
          <h3>{{ $t('login') }}</h3>
        </div>
        <div class="card-body">
          <form action method="post" @submit.prevent="submitForm">
            <div class="form-group">
              <label>{{ $t('email') }}</label>
              <input type="email" name="email" class="form-control">
            </div>
            <div class="form-group">
              <label>{{ $t('password') }}</label>
              <input type="password" name="password" class="form-control">
            </div>
            <div class="form-group">
              <button class="btn btn-info" type="submit">{{ $t('btn.login') }}</button>
              <n-link to="/registration">{{ $t('link.or_register') }}</n-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async submitForm() {}
  }
};
</script>