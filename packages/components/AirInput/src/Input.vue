<!--Created by 熊超超(https://github.com/ccqiuqiu) on 2018/01/05.-->
<template>
  <div class="air-input">
    <span class="air-input--label" v-if="label">{{label}}</span>
    <input class="air-input--input" type="text" v-model="mValue" :placeholder="hits" />
    <span class="air-input--right" @click="click" v-if="$slots.right">
      <slot name="right"></slot>
    </span>
  </div>
</template>
<script>
  export default{
    name: 'AirInput',
    props: {
      value: String,
      label: String,
      hits: String
    },
    data () {
      return {
        mValue: this.value
      }
    },
    methods: {
      click () {
        this.$emit('click-right', this.mValue)
      }
    },
    watch: {
      mValue (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
