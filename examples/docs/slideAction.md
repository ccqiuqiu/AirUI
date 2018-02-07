# AirSlideAction 滑动操作组件
----

> 滑动操作组件,左右滑动容器可以显示操作按钮

### 基础用法
> 左右都可以拖动, 通过slot控制是否开启左滑和优化
<div class="demo-block">
  <air-slide-action v-model="model">
    <span slot="left" class="left">左边左边</span>
    <div>
      <p>标题-----</p>
      <p>我能左右拖动</p>
    </div>
    <span slot="right" class="right">右边右边右边</span>
  </air-slide-action>
</div>

::: demo
```html
<air-slide-action v-model="model">
  <span slot="left" class="left">左边左边</span>
  <div>
    <p>标题-----</p>
    <p>我能左右拖动</p>
  </div>
  <span slot="right" class="right">右边右边右边</span>
</air-slide-action>

<script>
  export default {
    data () {
      return {
        model: 0
      }
    }
  }
</script>

<style>
  .left, .right{
    color: #FFFFFF;
    display: flex;
    align-items: center;
    padding: 0 5px;
  }
  .left{
    background-color: #ffd600;
   }
  .right{
    background-color: #f44336;
  }
</style>
```
:::

### 列表
> 通过AirActionGroup组件包裹多个AirSlideAction组件，可实现滑动的时候自动关闭上一个
<div class="demo-block">
  <air-slide-action-group :index="index">
    <air-slide-action @slide-start="slideStart(index)" v-for="(item, index) in 5" :key="index">
      <div>
        <p>内容内容{{index}}</p>
        <p>我只能往左拖动ooo</p>
      </div>
      <span slot="right" class="right">右边右边右边</span>
    </air-slide-action>
  <air-slide-action-group>
</div>

::: demo
```html
  <air-slide-action-group :index="index">
    <air-slide-action @slide-start="slideStart(index)" v-for="(item, index) in 5" :key="index">
      <div>
        <p>内容内容{{index}}</p>
        <p>我只能往左拖动ooooo</p>
      </div>
      <span slot="right" class="right">右边右边右边</span>
    </air-slide-action>
  <air-slide-action-group>

<script>
  export default {
    data () {
      return {
        index: -1
      }
    },
    methods: {
      slideStart(i) {
        this.index = i
      }
    }
  }
</script>

<style>
  .left{
    color: #FFFFFF;
    display: flex;
    align-items: center;
    padding: 0 5px;
  }
  .right{
    background-color: #f44336;
  }
</style>
```
:::

<script>
  export default {
    data () {
      return {
        model: 0,
        model2: 0,
        index: -1
      }
    },
    methods: {
      slideStart(i) {
        this.index = i
      }
    }
  }
</script>
<style>
  .left, .right{
    color: #FFFFFF;
    display: flex;
    align-items: center;
    padding: 0 5px;
  }
  .left{
    background-color: #ffd600;
   }
  .right{
    background-color: #f44336;
  }
</style>

### 属性
|属性名|类型|描述|必须|默认|
|----|----|-------------|----|--------|
|value|Number|v-model绑定状态值（0-默认，1-左边滑出，-1右边滑出，2-滑动中）可以通过改变次属性的值来改变组件状态，主要用于复位组件，不是必须|-|0|


### Slots
|Name|描述|
|----|----|
|left|左边滑出的的内容，为空则不能右滑|
|right|右边滑出的的内容，为空则不能左滑|
|-|默认内容|


### 事件
|事件名|描述|返回值类型|说明|
|----|----|-------------|---|
|slide-start|滑动开始时触发|-|-|
|slide-end|滑动结束时触发|Number|返回组件的状态（0-默认，1-左边滑出，-1右边滑出）|



