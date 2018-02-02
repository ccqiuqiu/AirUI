<!--Created by 熊超超 on 2018/2/2.-->
<template>
  <div class="air-data-block" @click="retry">
    <transition name="fade">
      <slot v-if="state === stateMap.ok"></slot>
    </transition>

    <transition name="fade">
      <slot v-if="state === stateMap.loading" name="loading">
        <div class="air-data-block--loading">
          <loading class="air-data-block--loading__icon"></loading>
          <span>{{loadingText}}</span>
        </div>
      </slot>
    </transition>

    <transition name="fade">
      <slot v-if="state === stateMap.empty" name="empty">
        <div>{{emptyText}}</div>
      </slot>
    </transition>

    <transition name="fade">
      <slot v-if="state === stateMap.error" name="error">
        <div><span>{{errorText}}</span></div>
      </slot>
    </transition>
  </div>
</template>

<script>
  import Loading from '../../common/loading'

  export default {
    name: 'AirDataBlock',
    components: {Loading},
    props: {
      method: {
        type: Function,
        required: true
      },
      loadingText:{
        type: String,
        default: '加载中...'
      },
      emptyText:{
        type: String,
        default: '暂无数据'
      },
      errorText:{
        type: String,
        default: '出现异常, 点击重试'
      }
    },
    data() {
      return {
        stateMap: {
          loading: -2,
          error: -1,
          empty: 0,
          ok: 1
        },
        state: -2
      }
    },
    created () {
      this.loadData()
    },
    methods: {
      retry () {
        this.state === this.stateMap.error && this.loadData()
      },
      loadData () {
        this.state = this.stateMap.loading
        this.method && this.method(this.changeState)
      },
      changeState (val = 1) {
        val = Math.min(this.stateMap.ok, val)
        this.state = val
      }
    }
  }
</script>

<style lang="less" scoped>
  .air-data-block {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    >div{
      position: absolute;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
</style>
