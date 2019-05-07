<template>
  <div class="row">
    <div class="col-4 mx-auto">
      <div class="card">
        <div class="card-header">
          <h3>Login</h3>
        </div>
        <div class="card-body">
          <form action method="post" @submit.prevent="submitForm">
            <div class="form-group">
              <label>Email</label>
              <input type="email" name="email" class="form-control">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" name="password" class="form-control">
            </div>
            <div class="form-group">
              <button class="btn btn-info" type="submit">Log In</button>
              <n-link to="/registration">Or Register</n-link>
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