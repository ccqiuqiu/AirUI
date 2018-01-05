# AirInput 输入框
----

> 这是一个自己写的input组件


### 基础用法

<div class="demo-block">
  <div>
    <air-input label="邮箱" hits="请输入邮箱" v-model="email" @click-right="send">
      <button slot="right">按钮</button>
    </air-input>
    <air-input label="验证码" hits="请输入验证码" v-model="code" @click-right="getCode">
      <span slot="right">{{code}}</span>
    </air-input>
    <air-input label="姓名" hits="请输入姓名" v-model="name">
    </air-input>
    <air-input hits="" v-model="name">
      <span slot="right">不知道是什么</span>
    </air-input>
  </div>
</div>

<script>
  export default{
    data () {
      return {
        email: 'cc@cc.cc',
        code: '1243',
        name: ''
      }
    },
    methods: {
      send (val) {
        console.log(val)
      },
      getCode () {
        this.code = Math.random().toString().substr(2, 4)
      }
    }
  }
</script>

::: demo
```html
<div class="demo-block">
  <div>
    <air-input label="邮箱" hits="请输入邮箱" v-model="email" @click-right="send">
      <button slot="right">按钮</button>
    </air-input>
    <air-input label="验证码" hits="请输入验证码" v-model="code" @click-right="getCode">
      <span slot="right">{{code}}</span>
    </air-input>
    <air-input label="姓名" hits="请输入姓名" v-model="name">
    </air-input>
    <air-input hits="" v-model="name">
      <span slot="right">不知道是什么</span>
    </air-input>
  </div>
</div>

<script>
  export default{
    data () {
      return {
        email: 'cc@cc.cc',
        code: '1243',
        name: ''
      }
    },
    methods: {
      send (val) {
        console.log(val)
      },
      getCode () {
        this.code = Math.random().toString().substr(2, 4)
      }
    }
  }
</script>
```
:::

### 属性
|属性名|类型|描述|必须|默认|
|----|----|-------------|----|--------|
|value|String|通过v-model绑定的值|-|-|
|label|String|文本框左边的标签文本|-|-|
|hits|String|输入框为空的状态的提示信息|-|-|


### 事件
|事件名|描述|返回值类型|说明|
|----|----|-------------|---|
|click-right|右边的元素点击的时候触发|String|-|


