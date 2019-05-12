<template>
  <div></div>
</template>
<script>
  export default {
    middleware: ["authenticated", "check_role"],
    layout: 'admin'
  }
</script>
