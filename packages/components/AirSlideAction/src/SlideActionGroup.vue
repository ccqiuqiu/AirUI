<!--Created by 熊超超 on 2018/2/7.-->
<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'AirSlideActionGroup',
    props: {
      index: {
        type: Number,
        default: -1
      }
    },
    watch: {
      index(val) {
        this.$children.forEach((c, index) => index !== val && c.reset && c.reset())
      }
    },
    methods: {}
  }
</script>
