<template>
  <div class="form-slot">
    <div class="form-slot-container">
      <div class="card">
        <div class="card-header">
          <slot name="header"></slot>
        </div>
        <div class="card-body">
          <slot name="main"></slot>
        </div>
      </div>

    </div>

    <div class="cover"></div>

  </div>
</template>

<script>
  export default {
    name: "FormSlot",

    methods: {
      show() {
        this.$el.style.display = 'block'

        let position = 100

        let timerId = setInterval(() => {

          this.$el.querySelector('.form-slot-container').style.left = position + '%'

          position -= 1

        }, 5)

        setTimeout(() => {
          clearInterval(timerId)
        }, 300)

        this.$el.querySelector('.cover').style.display = 'block'
      },

      hide() {
        this.$el.style.display = 'none'
        this.$el.querySelector('.form-slot-container').style.left = '-150%'
        this.$el.querySelector('.cover').style.display = 'none'
      }
    }

  }
</script>

<style scoped>
  .form-slot {
    display: none;
    position: fixed;
    width: 100%;
  }
  .form-slot-container {
    position: relative;
    width: 50%;
    left: -150%;
    z-index: 105;
  }

  .cover {
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(100, 100, 100, 0.5);
    display: none;
    z-index: 100;
  }

</style>
