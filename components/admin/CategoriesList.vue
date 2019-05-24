<template>
    <ul>
      <li class="list-group-item" v-for="item in cats" v-bind:key="item.id">
        <div class="col-1">{{ item.id }}</div>
        <div class="col-2">{{ item.name }}</div>
        <div class="col-2">{{ item.slug }}</div>
        <div class="col-2">{{ item.created_at }}</div>
        <div class="col-2">{{ item.updated_at }}</div>
        <div class="col-2">
          <button class="btn btn-info" v-on:click="edit(item)">Edit</button>
        </div>
        <CategoriesList class="list-group inner" v-on:editCategory="value => { edit(value) }" v-bind:cats="item.children"></CategoriesList>
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
      }
    }

  }
</script>

<style scoped>
  .list-group-item .col-2, .list-group-item .col-1 {
    display: inline-table;
  }
</style>
