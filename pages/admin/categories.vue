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
              <option v-for="parent in catsList" v-bind:key="parent.id" v-bind:value="parent.id">{{ parent.name }}</option>
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
    <div class="row">
      <div class="col-lg-12">
        <ul class="list-group">
          <li class="list-group-item" v-for="item in catsList" v-bind:key="item.id">
            <div class="col-1">{{ item.id }}</div>
            <div class="col-2">{{ item.name }}</div>
            <div class="col-2">{{ item.slug }}</div>
            <div class="col-2">{{ item.created_at }}</div>
            <div class="col-2">{{ item.updated_at }}</div>
            <div class="col-2">
              <button class="btn btn-info" v-on:click="edit(item)">Edit</button>
            </div>
            <ul class="list-group inner" v-if="item.children.length > 0">
              <li class="list-group-item" v-for="child in item.children" v-bind:key="child.id">
                <div class="col-1">{{ child.id }}</div>
                <div class="col-2">{{ child.name }}</div>
                <div class="col-2">{{ child.slug }}</div>
                <div class="col-2">{{ child.created_at }}</div>
                <div class="col-2">{{ child.updated_at }}</div>
                <div class="col-2">
                  <button class="btn btn-info" v-on:click="edit(child)">Edit</button>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
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
      }
    },

    data: () => {
      return {
        form: {
          name: "",
          parent: null,
          update_id: null
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
        this.form.parent = null
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
      },

      edit(item) {
        this.form.name = item.name
        this.form.parent = item.parent_id
        this.form.update_id = item.id

        this.$children[0].show()
      }

    }
  }
</script>

<style scoped>
  .list-group-item .col-2, .list-group-item .col-1 {
    display: inline-table;
  }

</style>
