<!--Created by 熊超超 on 2017/12/13.-->
<template>
  <div class="air-button" :class="{'br': br}" @click="click">
    {{text}}
  </div>
</template>

<script>

  export default {
    name: 'AirButton',
    props: {
      text: {
        required: true,
        type: String
      },
      br: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {}
    },
    methods: {
      click () {
        this.$emit('on-click', 'aaa')
      }
    }
  }
</script>

<style scoped>
</style>
