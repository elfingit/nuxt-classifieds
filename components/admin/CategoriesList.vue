<template>
    <ul>
      <li class="list-group-item" v-for="item in cats" v-bind:key="item.id">
        <div class="col-1">{{ item.id }}</div>
        <div class="col-2">{{ item.name }}</div>
        <div class="col-2">{{ item.slug }}</div>
        <div class="col-2">{{ item.created_at }}</div>
        <div class="col-2">{{ item.updated_at }}</div>
        <div class="col-2">
          <div class="btn-group">
            <button type="button" class="btn btn-info" v-on:click="edit(item)">Edit</button>
            <button type="button" class="btn btn-danger" v-on:click="del(item)">Delete</button>
          </div>
        </div>
        <CategoriesList class="list-group inner" v-on:editCategory="value => { edit(value) }" v-on:deleteCategory="value => del(value)" v-bind:cats="item.children"></CategoriesList>
      </li>
    </ul>
</template>

<script>
  export default {
    name: "CategoriesList",

    props: ['cats', 'editFn'],

    methods: {
      edit(item) {
        this.$emit('editCategory', item)
      },

      del(item) {
        this.$emit('deleteCategory', item)
      }
    }

  }
</script>

<style scoped>
  .list-group-item .col-2, .list-group-item .col-1 {
    display: inline-table;
  }
  .btn-group > .btn, .btn-group-vertical > .btn {
    margin: 0.1rem;
  }
</style>
