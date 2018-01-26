# AirCalenderH 横向日历
----

> 以天为单位，横向滚动的日历,支持无限滚动和固定日期区间

### 基础用法

<div class="demo-block">
  <air-calender-h :data=data v-model="date" :start-date="startDate" :end-date="endDate"></air-calender-h>
</div>

::: demo
```html
 <air-calender-h :data=data v-model="date" :start-date="startDate" :end-date="endDate"></air-calender-h>

<script>
  import addDays from 'date-fns/esm/addDays'
  import format from 'date-fns/esm/format'
  export default {
    data () {
      return {
        startDate: addDays(new Date(), -2),
        endDate: addDays(new Date(), 8),
        date: new Date(),
        data: this.initData()
      }
    },
    methods: {
      initData () {
        const data = []
        for (let i = -1; i < 365; i++) {
          data.push({
            date: format(addDays(new Date(), i), 'YYYY-MM-DD'),
            text: parseInt(Math.random() * 1000)
          })
        }
        return data
      }
    }
  }
</script>
```
:::

### 自定义颜色
<div class="demo-block">
  <air-calender-h :data=data class='ccc' @click="click" v-model="date"></air-calender-h>
</div>

::: demo
```html
<air-calender-h :data=data class='ccc'></air-calender-h>

<script>
  import addDays from 'date-fns/esm/addDays'
  import format from 'date-fns/esm/format'
  export default {
    data () {
      return {
        date: new Date(),
        data: this.initData()
      }
    },
    methods: {
      click (date) {
        alert(date)
      },
      initData () {
        const data = []
        for (let i = -1; i < 365; i++) {
          data.push({
            date: format(addDays(new Date(), i), 'YYYY-MM-DD'),
            text: parseInt(Math.random() * 1000)
          })
        }
        return data
      }
    }
  }
</script>

<style>
  .ccc{
     background-color: #4b3932;
     color: white;
  }
</style>
```
:::

### 自定义非激活状态的文字, 日期改变事件
<div class="demo-block">
  <air-calender-h :data=data class='ccc' @change="change" next-text='后一天' pre-text='前一天' v-model="date" v-model="date"></air-calender-h>
</div>

::: demo
```html
<air-calender-h :data=data class='ccc' next-text='后一天' pre-text='前一天'></air-calender-h>

<script>
  import addDays from 'date-fns/esm/addDays'
  import format from 'date-fns/esm/format'
  export default {
    data () {
      return {
        date: new Date(),
        data: this.initData()
      }
    },
    methods: {
      change (date) {
        alert(date)
      },
      initData () {
        const data = []
        for (let i = -1; i < 365; i++) {
          data.push({
            date: format(addDays(new Date(), i), 'YYYY-MM-DD'),
            text: parseInt(Math.random() * 1000)
          })
        }
        return data
      }
    }
  }
</script>
<style>
  .ccc{
     background-color: #4b3932;
     color: white;
  }
</style>
```
:::

### 自定义图标
<div class="demo-block">
  <air-calender-h :data=data class='ccc' v-model="date">
    <span slot="icon">
       <svg aria-hidden="true" fill="#FFFFFF" height="30" version="1.1" viewBox="0 0 16 16" width="30"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
    </span>
    <span slot="left" class='arrow'>&lt;&lt;</span>
    <span slot="right" class='arrow'>&gt;&gt;</span>
  </air-calender-h>
</div>

::: demo
```html
<air-calender-h :data=data class='ccc'>
  <span slot="icon">
     <svg aria-hidden="true" fill="#FFFFFF" height="30" version="1.1" viewBox="0 0 16 16" width="30"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
  </span>
  <span slot="left" class='arrow'>&lt;&lt;</span>
  <span slot="right" class='arrow'>&gt;&gt;</span>
</air-calender-h>

<script>
  import addDays from 'date-fns/esm/addDays'
  import format from 'date-fns/esm/format'
  export default {
    data () {
      return {
        date: new Date(),
        data: this.initData()
      }
    },
    methods: {
      initData () {
        const data = []
        for (let i = -1; i < 365; i++) {
          data.push({
            date: format(addDays(new Date(), i), 'YYYY-MM-DD'),
            text: parseInt(Math.random() * 1000)
          })
        }
        return data
      }
    }
  }
</script>
<style>
  .ccc{
     background-color: #4b3932;
     color: white;
  }
  .arrow{
   font-size: 20px;
  }
</style>
```
:::

<script>
  import addDays from 'date-fns/esm/addDays'
  import format from 'date-fns/esm/format'
  export default {
    data () {
      return {
        date: new Date(),
        startDate: addDays(new Date(), -2),
        endDate: addDays(new Date(), 8),
        data: this.initData()
      }
    },
    methods: {
      click (date) {
        alert('点击了激活的日期')
      },
      change (date) {
        alert('日期改变了：' + date)
      },
      initData () {
        const data = []
        for (let i = -1; i < 365; i++) {
          data.push({
            date: format(addDays(new Date(), i), 'YYYY-MM-DD'),
            text: parseInt(Math.random() * 1000)
          })
        }
        return data
      }
    }
  }
</script>
<style>
  .ccc{
     background-color: #4b3932;
     color: white;
  }
  .arrow{
   font-size: 20px;
  }
</style>


### 属性
|属性名|类型|描述|必须|默认|
|----|----|-------------|----|--------|
|value|Date|用v-model绑定的值，日期变化会同步更新这个值|-|new Date()|
|start-date|Date|开始日期|-|new Date()|
|end-date|Date|结束日期, 不传就是无限滚动|-|new Date()|
|data|Array|在日期上显示的文本，如价格，格式为{date: 'YYYY-MM-DD', text: ''}|-|[]|
|next-text|String|下一天的文本，设置后，当前日期的下一天不显示实际日期，显示为设置的文本|-|-|
|pre-text|String|上一天的文本，设置后，当前日期的上一天不显示实际日期，显示为设置的文本|-|-|
|clickEnable|Boolean|除了点击左右按钮，点击日期也能切换|-|false|

### Slots
|Name|描述|
|----|----|
|icon|激活的日期右边显示的图标|
|left|左边按钮|
|right|右边按钮|

### 事件
|事件名|描述|返回值类型|说明|
|----|----|-------------|---|
|click|点击激活的日期触发|Date|返回当前激活的日期|
|change|日期改变时触发|Date|返回当前激活的日期|
|input|日期改变时触发，这个事件在指定了v-model时生效，不要单独使用|Date|返回当前激活的日期|
