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
              <input type="email" v-model="form.email" name="email" class="form-control">
            </div>
            <div class="form-group">
              <label>{{ $t('password') }}</label>
              <input type="password" v-model="form.password" name="password" class="form-control">
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
import FormErrors from "../lib/form_errors"

export default {
  data: () => {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async submitForm() {
      await this.$store
        .dispatch("auth/login", this.form)
        .then(this.success)
        .catch(this.error);
    },
    success(data) {
      this.$store.commit("auth/SET_TOKEN", data.data.token);
      this.$router.push("/")
    },
    error(data) {
      const request = data.request;
      const status = request.status;

      switch (status) {
        case 422:
          const errors = JSON.parse(data.request.response);
          if (errors) {
            const formErr = new FormErrors(
              errors,
              this.$el.querySelector("form"),
              this
            );
            formErr.display();
          }
          break;
        case 401:
          let payload = JSON.parse(request.response);
          this.$notify({
            group: "alerts",
            text: this.$i18n.t(payload.message)
          });
          break;
        case 500:
          this.$notify({
            group: "alerts",
            text: this.$i18n.t("error.unknown")
          });
          break;
      }
    }
  }
};
</script>
