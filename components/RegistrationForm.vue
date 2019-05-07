<template>
  <div class="row">
    <div class="col-4 mx-auto">
      <div class="card">
        <div class="card-header">
          <h3>{{ $t('registration') }}</h3>
        </div>
        <div class="card-body">
          <form action method="post" @submit.prevent="registrationSubmit">
            <div class="form-group">
              <label>{{ $t('email') }}</label>
              <input
                type="email"
                name="email"
                v-model="form.email"
                @focus="clearError"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label>{{ $t('password') }}</label>
              <input
                type="password"
                name="password"
                v-model="form.password"
                @focus="clearError"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label>{{ $t('confirm_password') }}</label>
              <input
                type="password"
                name="password_confirm"
                v-model="form.password_confirm"
                @focus="clearError"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-info">{{ $t('send') }}</button>
              <n-link to="/login">{{ $t('already_sign_up') }}</n-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FormErrors from "../lib/form_errors";

export default {
  data: () => {
    return {
      form: {
        email: "",
        password: "",
        password_confirm: ""
      }
    };
  },
  methods: {
    async registrationSubmit() {
      this.$el
        .querySelector("form")
        .querySelectorAll("small")
        .forEach(el => {
          el.remove();
        });

      await this.$store
        .dispatch("user/register", this.form)
        .then(this.success)
        .catch(this.error);
    },
    success() {
      this.form.email = "";
      this.form.password = "";
      this.form.password_confirm = "";

      this.$notify({
        group: "alerts",
        text: this.$i18n.t('alerts.succ_registration')
      });
      this.$router.push("/login");
    },
    error(data) {
      if (data.request.status == 422) {
        const errors = JSON.parse(data.request.response);
        if (errors) {
          const formErr = new FormErrors(
            errors,
            this.$el.querySelector("form"),
            this
          );
          formErr.display();
        }
      } else {
        this.$notify({
          group: "alerts",
          text: this.$i18n.t('error.unknown')
        });
      }
    },
    clearError(event) {
      const field = event.target;
      const formErr = new FormErrors(null, this.$el.querySelector("form"), this);
      formErr.clearError(field);
    }
  }
};
</script>