<template>
  <div class="alert-cover">
    <div class="popup">
      <div class="alert alert-danger">
        <h4><slot name="title"></slot></h4>
        <p><slot name="body"></slot></p>
        <hr>
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PopupAlert",

    methods: {
      show() {
        this.$el.style.display = 'block'
      },

      hide() {
        this.$el.style.display = 'none'
      }
    }
  }
</script>

<style scoped>
  .alert-cover {
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(100, 100, 100, 0.5);
    display: none;
    z-index: 99999997;
  }

  .popup {
    width: 50%;
    margin: 1rem auto;
  }

</style>
