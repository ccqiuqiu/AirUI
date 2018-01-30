# AirCalenderH 横向日历
----

> 纵向滚动的日历

### 基础用法

<div class="demo-block-m">
  <air-calender-v :data="data"></air-calender-v>
</div>

::: demo
```html
  <air-calender-v :data="data"></air-calender-v>
  <script>
    import addDays from 'date-fns/esm/addDays'
    import format from 'date-fns/esm/format'
    export default {
      data () {
        return {
          data: this.initData()
        }
      },
      methods: {
        initData () {
          return Array.apply(null, {length: 365}).map((item, i) => ({
            date: format(addDays(new Date(), i), 'YYYY-MM-DD'),
            text: parseInt(Math.random() * 1000)
          }))
        }
      }
    }
  </script>
```
:::

### 指定初始值

<div class="demo-block-m">
  <air-calender-v :data="data" date="2018-02-28" btnText="确定选择"></air-calender-v>
</div>

::: demo
```html
  <air-calender-v :data="data" date="2018-02-28" ></air-calender-v>
  <script>
    import addDays from 'date-fns/esm/addDays'
    import format from 'date-fns/esm/format'
    export default {
      data () {
        return {
          data: this.initData()
        }
      },
      methods: {
        initData () {
          return Array.apply(null, {length: 365}).map((item, i) => ({
            date: format(addDays(new Date(), i), 'YYYY-MM-DD'),
            text: parseInt(Math.random() * 1000)
          }))
        }
      }
    }
  </script>
```
:::


### 往返日期

<div class="demo-block-m">
  <air-calender-v :data="data" :data2="data2" double></air-calender-v>
</div>

::: demo
```html
  <air-calender-v :data="data" :data2="data2" double></air-calender-v>
  <script>
    import addDays from 'date-fns/esm/addDays'
    import format from 'date-fns/esm/format'
    export default {
      data () {
        return {
          data: this.initData()
        }
      },
      methods: {
        initData () {
          return Array.apply(null, {length: 365}).map((item, i) => ({
            date: format(addDays(new Date(), i), 'YYYY-MM-DD'),
            text: parseInt(Math.random() * 1000)
          }))
        }
      }
    }
  </script>
```
:::

<script>
  import addDays from 'date-fns/esm/addDays'
  import format from 'date-fns/esm/format'
  export default {
    data () {
      return {
        data: this.initData(),
        data2: this.initData()
      }
    },
    methods: {
      initData () {
        return Array.apply(null, {length: 365}).map((item, i) => ({
          date: format(addDays(new Date(), i), 'YYYY-MM-DD'),
          text: parseInt(Math.random() * 1000)
        }))
      }
    }
  }
</script>


### 属性
|属性名|类型|描述|必须|默认|
|----|----|-------------|----|--------|
|num|Number|显示几个月数据|-|12|
|startSun|Boolean|日历是否以周日开始,默认是周一|-|false|
|date|String|默认激活日期字符串（'YYYY-MM-DD'）|-|-|
|data|Array|要在日期上显示的价格数组,单个对象格式为{date: 'YYYY-MM-DD', text: '124'}|-|[]|
|currency|String|货币符号|-|'￥'|
|btnText|String|确定按钮上的文字|-|'确定'|
|double|Boolean|开启往返2个日期的选择|-|false|
|date2|String|默认激活日期2字符串， double为true时有效|-|-|
|data|Array|要在日期上显示的价格数组,单个对象格式为{date: 'YYYY-MM-DD', text: '124'}， double为true时有效|-|[]|
|titles|Array|显示在日历顶部的文字，格式为['', '']， double为true时有效|-|-|
|week-bg|String|显示星期的容器的背景色样式|-|-|


### Slots
|Name|描述|
|----|----|
|btn|自定义确定按钮|


### 事件
|事件名|描述|返回值类型|说明|
|----|----|-------------|---|
|selected|按确定按钮触发|Object|Array|double为false时返回一个对象，为true返回包含2个对象的数组|

