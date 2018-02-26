<!--Created by 熊超超 on 2018/2/7.-->
<template>
  <div tabindex=-1 @blur="reset" class="air-slide-action-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'AirSlideActionGroup',
    created () {
      this.$on('slide-start', () => this.reset())
    },
    methods: {
      reset() {
        this.$children.forEach((c) => c.reset && c.reset())
      }
    }
  }
</script>
