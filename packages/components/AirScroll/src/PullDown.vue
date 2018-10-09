<!--Created by 熊超超 on 2018/10/8.-->
<template>
  <div :style="{top: top + 'px'}" class="pulldown-md" v-if="md">
    <div class="icon">
      <div class="svg" :class="{loading: isPullingDown}" :style="iconStyle">
        <slot name="icon">
          <svg t="1539047037871" viewBox="0 0 1024 1024" version="1.1" p-id="1035"><path d="M960 416V192l-73.056 73.056a447.712 447.712 0 0 0-373.6-201.088C265.92 63.968 65.312 264.544 65.312 512S265.92 960.032 513.344 960.032a448.064 448.064 0 0 0 415.232-279.488 38.368 38.368 0 1 0-71.136-28.896 371.36 371.36 0 0 1-344.096 231.584C308.32 883.232 142.112 717.024 142.112 512S308.32 140.768 513.344 140.768c132.448 0 251.936 70.08 318.016 179.84L736 416h224z" p-id="1036"></path></svg>
        </slot>
      </div>
    </div>
  </div>
  <div ref="pulldown" class="pulldown-wrapper" :style="{top: top + 'px'}" v-else>
    <div class="before-trigger" v-if="beforePullDown">
      <bubble :y="bubbleY"></bubble>
    </div>
    <div class="after-trigger" v-else>
      <div v-if="isPullingDown">
        <loading></loading>
      </div>
      <div v-else><span>{{refreshTxt}}</span></div>
    </div>
  </div>
</template>

<script>
  import Loading from '../../common/loading'
  import Bubble from './bubble.vue'
  export default {
    components: {Loading, Bubble},
    props: {
      refreshTxt: String,
      bubbleY: Number,
      md: Boolean,
      top: {},
      beforePullDown: Boolean,
      isPullingDown: Boolean
    },
    data () {
      return {}
    },
    computed: {
      iconStyle() {
        return {
          transform: `rotate(${this.top * 6}deg)`
        }
      }
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .loading{
    animation: spin 800ms infinite linear;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% { transform: rotate(360deg); }
  }
</style>
