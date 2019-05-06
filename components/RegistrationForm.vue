<template>
  <div class="row">
    <div class="col-4 mx-auto">
      <form action="" method="post" @submit.prevent="registrationSubmit">
        <div class="form-group">
          <label>E-mail</label>
          <input type="email" name="email" v-model="form.email" @focus="clearError" class="form-control">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" name="password" v-model="form.password" @focus="clearError" class="form-control">
        </div>
        <div class="form-group">
          <label>Confirm password</label>
          <input type="password" name="password_confirm" v-model="form.password_confirm" @focus="clearError" class="form-control">
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-info">Send</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>

  import FormErrors from '../lib/form_errors'

  export default {
    data: () => {
      return {
        form: {
          email: '',
          password: '',
          password_confirm: ''
        }
      }
  },
  methods: {
    async registrationSubmit() {
      await this.$store.dispatch('user/register', this.form)
        .then(this.success)
        .catch(this.error)
    },
    success() {
      this.form.email = ''
      this.form.password = ''
      this.form.password_confirm = ''
      
      this.$router.push('/')
    },
    error(data) {
      if (data.request.status == 422) {
        const errors = JSON.parse(data.request.response)
        
        if (errors) {
          const formErr = new FormErrors(errors, this.$el.querySelector('form'))
          formErr.display()
        }

      } else {

      }
    },
    clearError(event) {
      const field = event.target
      const formErr = new FormErrors(null, this.$el.querySelector('form'))
      formErr.clearError(field)
    }
  }
}
</script>