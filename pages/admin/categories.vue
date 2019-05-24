<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="col-lg-12">
    <PopupAlert ref="popupAlert">
      <template v-slot:title>Do you really want to delete this category?</template>
      <template v-slot:body>WARNING! If you are delete this category then all subcategories and all classifieds in this category also will are deleted.</template>
      <template v-slot:buttons>
        <button type="button" class="btn btn-danger" id="confirm-delete">Delete</button>
        <button type="button" class="btn btn-secondary" v-on:click="hideDangerPopup()">Cancel</button>
      </template>
    </PopupAlert>
    <form-slot ref="formSlot">
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
        <CategoriesList class="list-group" v-on:editCategory="value => { edit(value) }" v-on:deleteCategory="value => { del(value) }" v-bind:cats="catsList" v-bind:edit-fn="edit"></CategoriesList>
      </div>
    </div>
  </div>
</template>

<script>

  import FormSlot from "~/components/admin/FormSlot"
  import FormErrors from "../../lib/form_errors"
  import CategoriesList from "~/components/admin/CategoriesList"
  import PopupAlert from "~/components/PopupAlert"

  export default {
    name: "categories",
    components: {FormSlot, CategoriesList, PopupAlert},
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
        },
        selectedCat: null,
        deleteCatListener: null
      }
    },

    methods: {
      addCategory() {
        this.$refs.formSlot.show()
      },
      hideForm() {
        this.$refs.formSlot.hide()
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
        this.hideForm()
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

        this.$refs.formSlot.show()
      },

      del(item) {

        this.selectedCat = item
        this.$refs.popupAlert.show()

        const self = this

        this.deleteCatListener = (e) => {
          self.$store.dispatch('categories/del_cat', self.selectedCat)
            .then(self.successDelCat)
            .catch(self.errorDelCat)
        }

        this.$el.querySelector('#confirm-delete').addEventListener('click', this.deleteCatListener)
      },

      hideDangerPopup() {
        this.$refs.popupAlert.hide()
        this.selectedCat = null

        if (this.deleteCatListener) {
          this.$el.querySelector('#confirm-delete').removeEventListener('click', this.deleteCatListener)
          this.deleteCatListener = null
        }
      },

      successDelCat() {
        this.hideDangerPopup()
      },

      errorDelCat() {

      }

    }
  }
</script>

<style scoped>

</style>
