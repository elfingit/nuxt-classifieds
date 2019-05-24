<template>
  <div class="cover">
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
    </div>
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
      },

      hide() {
        this.$el.style.display = 'none'
        this.$el.querySelector('.form-slot-container').style.left = '-150%'
      }
    }

  }
</script>

<style scoped>
  .form-slot {
    display: block;
    position: relative;
    width: 100%;
    margin-top: 1rem;
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
    z-index: 99999997;
  }

</style>
