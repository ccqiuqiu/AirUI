<!--Created by 熊超超 on 2018/2/7.-->
<template>
  <div class="air-slide-action">
    <v-touch @panmove="onPanMove"
             @panend="onPanEnd"
             @panstart="onPanStart"
             :pan-options="{direction: 'horizontal'}"
             :style="styleObject"
             class="air-slide-action--touch">

      <span ref="left" class="air-slide-action--left" v-if="$slots.left"><slot name="left"></slot></span>

      <span class="air-slide-action--con"><slot></slot></span>

      <span ref="right" class="air-slide-action--right" v-if="$slots.right"><slot name="right"></slot></span>

    </v-touch>
  </div>
</template>

<script>

  export default {
    name: 'AirSlideAction',
    props: {
      value: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        transition: 'none',
        leftWidth: 0, // 左边容器宽
        rightWidth: 0, // 右边容器宽
        preOffset: 0, // 上一次的偏移值，记住上次滑动的位置
        offset: 0, // 实际偏移值，上次的值+当前移动的值，有做边界控制
        status: this.value // 状态0-默认  1-左边滑出  -1右边滑出 2-滑动中
      }
    },
    computed: {
      /**
       * 通过状态来计算位移的距离
       * @returns {number}
       */
      deltaX() {
        if (this.status === -1) {
          return -this.leftWidth - this.rightWidth
        } else if (this.status === 1){
          return 0
        } else if (this.status === 2) {
          return this.offset
        }
        return -this.leftWidth
      },
      // 通过位移的距离，实时改变容器的transform,达到滑动的效果
      styleObject() {
        return {
          transition: this.transition,
          transform: `translate3d(${this.deltaX}px,0,0)`
        }
      },
    },
    mounted() {
      // 初始化左右容器的宽度
      this.leftWidth = this.$refs.left ? this.$refs.left.clientWidth : 0
      this.rightWidth = this.$refs.right ? this.$refs.right.clientWidth : 0
      // 一开始的偏移是左边的容器宽
      this.preOffset = -this.leftWidth
    },
    watch: {
      status(val) {
        this.$emit('input', val)
      },
      value(val) {
        this.status = val
      }
    },
    methods: {
      // 移动开始
      onPanStart(e) {
        if (this.status === 0) {
          this.$parent.$emit('slide-start')
          // e.direction === 4 && this.$refs.left && this.$parent.$emit('slide-start')
          // e.direction === 2 && this.$refs.right && this.$parent.$emit('slide-start')
        }
      },
      // 移动中，计算偏移值
      onPanMove(e){
        this.transition = 'none'
        this.status = 2
        this.offset = Math.max(Math.min(this.preOffset + e.deltaX, 0), -this.leftWidth - this.rightWidth)
      },
      // 移动结束后，改变状态
      onPanEnd() {
        this.transition = 'all 300ms'
        if (this.deltaX >= -this.leftWidth) { // 相对位置往右滑动了
          if (Math.abs(this.deltaX) > this.leftWidth / 2) { // 滑动的距离不超过左边的一半宽，自动复位
            this.status = 0
          } else { // 滑动的距离超过了左边的一半宽，自动把左边滑出
            this.status = 1
          }
        } else {// 相对位置往坐滑动了
          if (Math.abs(this.deltaX) < this.leftWidth + this.rightWidth / 2) {// 滑动的距离不超过右边的一半宽，自动复位
            this.status = 0
          } else {// 滑动的距离超过了左边的一半宽，自动把右边滑出
            this.status = -1
          }
        }
        this.preOffset = this.deltaX
        this.$emit('slide-end', this.status)
      },
      reset() {
        this.status = 0
        this.preOffset = -this.leftWidth
      }
    }
  }
</script>
