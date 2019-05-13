<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="col-lg-12">
    <form-slot>
      <template v-slot:header>Add Category</template>
      <template v-slot:main>
        <form action="" method="post">
          <div class="form-group">
            <label>Name</label>
            <input type="text" name="name" class="form-control">
          </div>
          <div class="form-group">
            <label>Parent category</label>
            <select name="parent" class="form-control">

            </select>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="reset" class="btn btn-info" v-on:click="hideForm()">Cancel</button>
          </div>
        </form>
      </template>
    </form-slot>
    <button class="btn btn-primary" v-on:click="addCategory()">Add category</button>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Created At</th>
        <th scope="col">Updated At</th>
      </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</template>

<script>

  import FormSlot from "~/components/admin/FormSlot"

  export default {
      name: "categories",
    components: {FormSlot},
    layout: 'admin',

    methods: {
        addCategory() {
          this.$children[0].show()
        },
        hideForm() {
          this.$children[0].hide()
        }
    }
  }
</script>

<style scoped>

</style>
