# AirScroll滚动容器
----

> 使用better-scroll封装的滚动容器，支持滚动回弹、下拉刷新、加载更多等功能

### 基础用法
> 使用air-scroll组件包裹需要滚动的容器即可

<div class="demo-block demo-block-m" style="height: 300px">
  <air-scroll pullDownRefresh pullUpLoad ref="scroll" @pullingDown="load" @pullingUp="load" md>
    <div v-for="i in 20">{{i}}</div>
  </air-scroll>
</div>

<script>
export default {
  methods: {
    load() {
      setTimeout(() => this.$refs.scroll.forceUpdate(true), 3000)
    }
  }
}
</script>

### 属性
|属性名|类型|描述|必须|默认|
|----|----|-------------|----|--------|
|data|-|如果用作会增减数据的列表页面，会监听data动态更新滚动组件|-|-|
|noRoot|Boolean|如果滚动组件不是当前页面的根节点，可以设置为true，此属性是为了解决某些情况下路由动画的问题，一般不用设置|-|false|
|keepLocation|Boolean|记住滚动的位置，返回的时候将自动滚动到这个位置,此属性配合base-vue项目使用才有效果|-|true|
|click|Boolean|better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true|-|true|
|probeType|Number|当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 1|-|true|
|listenScroll|Boolean|是否监听滚动事件|-|false|
|listenBeforeScroll|Boolean|是否监听滚动开始事件|-|false|
|direction|String|滚动方向可选horizontal、vertical|-|vertical|
|scrollbar|Boolean/Object|当设置为 true 或者是一个 Object 的时候，可以显示滚动条，例如：{fade: true, // 是否渐隐 interactive: false // 是否可以交互}|-|true|
|startY|Number|开始位置|-|0|
|freeScroll|Boolean|有些场景我们需要支持横向和纵向同时滚动，而不仅限制在某个方向，这个时候我们只要设置 freeScroll 为 true 即可|-|false|
|mouseWheel|Boolean/Object|当设置为 true 或者是一个 Object 的时候，可以开启鼠标滚轮，例如：{speed: 20, // 滚动速度  invert: false //滚轮滚动和实际滚动方向相反}|-|false|
|pullDownRefresh|Boolean/Object|当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，例如：{stop: 40, // 回弹停留的距离 text: '刷新成功', //刷新成功文本 errorText: '刷新失败' // 刷新失败文本}|-|false|
|pullUpLoad|Boolean/Object|当设置为 true 或者是一个 Object 的时候，可以开启加载更多，例如：{moreText: '加载等多', //加载等多文本 noMoreText: '没有等多数据了' // 没有更多数据的文本}|-|false|
|md|Boolean|启用Material Design风格的下拉刷新|-|false|

### 事件
|事件名|描述|返回值类型|说明|
|----|----|-------------|---|
|scroll|滚动事件|Object|返回滚动的位置对象，包含x，y|
|beforeScrollStart|滚动开始事件|-|滚动开始是触发|
|pullingDown|下拉刷新事件|-|下拉刷新触发, this.$refs.scroll.forceUpdate(true) 关闭加载|
|pullingUp|加载更多事件|-|加载更多触发 this.$refs.scroll.forceUpdate(true) 关闭加载 |
