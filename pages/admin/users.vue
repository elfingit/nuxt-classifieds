<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="col-lg-12">
    <form-slot ref="formSlot">
      <template v-slot:header>Add User</template>
      <template v-slot:main>
        <form action="" method="post" @submit.prevent="submitForm">
          <div class="form-group">
            <label>E-mail</label>
            <input type="text" name="email" v-model="form.email" class="form-control">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" class="form-control">
          </div>
          <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" name="password_confirm" class="form-control">
          </div>
          <div class="form-group">
            <label>User Role</label>
            <select name="user_role" class="form-control" v-model="form.role_id">
              <option value="null">-- Select user role</option>
              <option v-for="role in rolesList" v-bind:key="role.id" v-bind:value="role.id">{{ role.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="reset" class="btn btn-info" v-on:click="hideForm()">Cancel</button>
          </div>
        </form>
      </template>
    </form-slot>
    <div class="grid-toolbar">
      <button class="btn btn-primary" v-on:click="addUser()">Add user</button>
    </div>
    <div class="row">
      <table class="table">
        <tr>
          <th>#</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
        <tr v-for="user in usersList" v-bind:key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role.name }}</td>
          <td>{{ user.created_at }}</td>
          <td>{{ user.updated_at }}</td>
          <td>
            <button type="button" class="btn btn-info" v-on:click="edit(user)">{{ $t('btn.edit') }}</button>
            <button type="button" class="btn btn-danger" v-on:click="del(user)">{{ $t('btn.delete') }}</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

  import FormSlot from "~/components/admin/FormSlot"
  import FormErrors from "../../lib/form_errors"

  export default {
    name: 'users',
    layout: 'admin',

    middleware: ["authenticated", "check_role"],

    components: {FormSlot},

    mounted() {
      this.$store.dispatch('user/list')
      this.$store.dispatch('user/rolesList')
    },

    computed: {
      usersList() {
        return this.$store.getters['user/USERS']
      },

      rolesList() {
        return this.$store.getters['user/ROLES']
      }
    },

    data: () => {
      return {
        form: {
          email: "",
          password: "",
          confirm_password: "",
          role_id: null
        }
      }
    },

    methods: {
      addUser() {
        this.$refs.formSlot.show()
      },

      hideForm() {
        this.$refs.formSlot.hide()
      },

      edit(user) {
        this.form.email = user.email
        this.form.role_id = user.role_id

        this.$refs.formSlot.show()

      },

      async submitForm() {
        this.$el
          .querySelector("form")
          .querySelectorAll("small")
          .forEach(el => {
            el.remove();
          });
        await this.$store.dispatch("user/store", this.form)
          .then(this.success)
          .catch(this.error)
      },

      success() {

      },
      error() {

      }

    }

  }
</script>

<style scoped>

</style>
