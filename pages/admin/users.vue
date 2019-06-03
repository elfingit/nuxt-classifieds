<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="col-lg-12">
    <form-slot ref="formSlot">
      <template v-slot:header>Add User</template>
      <template v-slot:main>
        <form action="" method="post" @submit.prevent="submitForm">
          <div class="form-group">
            <label>Name</label>
            <input type="text" name="name" class="form-control">
          </div>
          <div class="form-group">
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
    },

    computed: {
      catsList() {
        return this.$store.getters['user/USERS']
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
      }
    }

  }
</script>

<style scoped>

</style>
