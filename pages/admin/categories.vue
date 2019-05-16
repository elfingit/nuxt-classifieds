<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="col-lg-12">
    <form-slot>
      <template v-slot:header>Add Category</template>
      <template v-slot:main>
        <form action="" method="post" @submit.prevent="submitForm">
          <div class="form-group">
            <label>Name</label>
            <input type="text" name="name" v-model="form.name" class="form-control">
          </div>
          <div class="form-group">
            <label>Parent category</label>
            <select name="parent" class="form-control" v-model="form.parent">
              <option v-for="parent in parentsList" v-bind:key="parent.id" v-bind:value="parent.id">{{ parent.name }}</option>
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
      <button class="btn btn-primary" v-on:click="addCategory()">Add category</button>
    </div>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Slug</th>
        <th scope="col">Created At</th>
        <th scope="col">Updated At</th>
        <th scope="col">Actions</th>
      </tr>
      <tr v-for="item in catsList" v-bind:key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.slug }}</td>
        <td>{{ item.created_at }}</td>
        <td>{{ item.updated_at }}</td>
        <td></td>
      </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</template>

<script>

  import FormSlot from "~/components/admin/FormSlot"
  import FormErrors from "../../lib/form_errors"

  export default {
    name: "categories",
    components: {FormSlot},
    layout: 'admin',

    middleware: ["authenticated", "check_role"],

    mounted() {
      this.$store.dispatch('categories/list')
    },

    computed: {
      catsList() {
        return this.$store.getters['categories/CATS']
      },
      parentsList() {
        return this.$store.getters['categories/PARENTS']
      }
    },

    data: () => {
      return {
        form: {
          name: "",
          parent: 0
        }
      }
    },

    methods: {
      addCategory() {
        this.$children[0].show()
      },
      hideForm() {
        this.$children[0].hide()
      },


      async submitForm() {
        this.$el
          .querySelector("form")
          .querySelectorAll("small")
          .forEach(el => {
            el.remove();
          });
        await this.$store.dispatch("categories/store", this.form)
          .then(this.success)
          .catch(this.error)
      },

      success(data) {
        this.$children[0].hide()
        this.form.name = ''
      },

      error(err) {
        if (err.request.status == 422) {
          const errors = err.response.data;
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
      }
    }
  }
</script>

<style scoped>

</style>
