# AirDataBlock 数据加载
----

> 数据加载容器，有加载中(-2)、空数据(0)、异常重试(-1)、正常显示(1) 共四种状态

### 基础用法

<div class="demo-block">
  <air-data-block :method="load" style="height: 100px">
    <air-scroll><div v-for="i in data">{{i}}</div></air-scroll>
  </air-data-block>
</div>

<script>
  export default {
    data () {
      return {
        data: []
      }
    },
    methods: {
      load (cb) {
        // 模拟异步加载
        setTimeout(() => {
          this.data = [1,2,3,4,5]
          const n = parseInt(Math.random() * 10)
          n < 3 && cb(0)
          n >= 3 && n < 6 && cb(1)
          n >= 6 && cb(-1)
        }, 1500)
      }
    }
  }
</script>

::: demo
```html

<div class="demo-block">
  <air-data-block :method="load" style="height: 100px">
    <air-scroll><div v-for="i in data">{{i}}</div></air-scroll>
  </air-data-block>
</div>

<script>
  export default {
    data () {
      return {
        data: []
      }
    },
    methods: {
      load (cb) {
        // 模拟异步加载
        setTimeout(() => {
          this.data = [1,2,3,4,5]
          const n = parseInt(Math.random() * 10)
          n < 3 && cb(0)
          n >= 3 && n < 6 && cb(1)
          n >= 6 && cb(-1)
        }, 1500)
      }
    }
  }
</script>

```
:::

### 属性
|属性名|类型|描述|必须|默认|
|----|----|-------------|----|--------|
|method|Function|加载数据的方法，在组件创建和重试的时候会自动调用此方法，此方法会注入一个回调函数，通过执行这个回调，传入不同的状态来改变组件的状态 -2:加载状态，-1:异常状态，0:数据空状态，1:正常状态|**是**|-|
|error-text|String|错误的提示文字|-|'出现异常, 点击重试'|
|empty-text|String|数据为空的时候的提示文字|-|'暂无数据'|
|loading-text|String|加载中的提示文字|-|'加载中...'|

### Slots
|Name|描述|
|----|----|
|loading|自定义loading状态的视图|
|error|自定义error状态的视图|
|empty|自定义empty状态的视图|

