# IndexSelect 索引选择器
----

带索引和搜索功能的选择器组件，用于机场选择、城市选择、联系人选择等场景。索引条支持滑动选择

### 基础用法

<div class="demo-block demo-block-m">
  <air-index-select
  :data="data"
  :hots="hots"
  text-field="citynameCN"
  sub-text-field="airportnameCN"
  group-field="airportnameEN"
  search-hit="出发地中文/拼音/英文/机场三字码"
  :search-fields="searchFields"
  :tabs="tabs"
  tab-field="countrynameEN"
  key-field="itatCode" 
  @on-selected="selected" />
</div>
<script>
  import airPort from '../../lib/res/airPort'
  export default {
    data () {
      return {
        data: airPort,
        searchFields: ['itatCode','airportnameEN'],
        hots: ['WAW', 'LAX', 'GRU', 'SCL', 'TYO', 'SHA', 'CAN'],
        tabs: [{text: '国内', value: 'CN'}, {text: '国际', value: '!CN'}]
      }
    },
    methods: {
      selected(item){
       console.log(item)
      }
    }  
  }
</script>

::: demo
```html
<template>
  <air-index-select
  :data="data"
  :hots="hots"
  text-field="citynameCN"
  sub-text-field="airportnameCN"
  group-field="airportnameEN"
  search-hit="出发地中文/拼音/英文/机场三字码"
  :search-fields="searchFields"
  :tabs="tabs"
  tab-field="countrynameEN"
  key-field="itatCode" 
  @on-selected="selected" />
</template>

<script>
  import airPort from 'airui-vue/res/airPort'
  export default {
    data () {
      return {
        data: airPort,
        searchFields: ['itatCode','airportnameEN'],
        hots: ['WAW', 'LAX', 'GRU', 'SCL', 'TYO', 'SHA', 'CAN'],
        tabs: [{text: '国内', value: 'CN'}, {text: '国际', value: '!CN'}]
      }
    },
    methods: {
      selected(item){
       console.log(item)
      }
    }  
  }
</script>
```
:::

### 属性
|属性名|类型|描述|必须|默认|
|----|----|-------------|----|--------|
|data|Array|要显示的数据|**是**|-|
|hots|Array|热点区域要显示的内容，通过key-field属性从data里面查询得到|否|[]|
|text-field|String|在列表中需要显示的字段名|**是**|-|
|sub-text-field|String|在列表中显示的字段名-次要|否|''|
|group-field|String|分组字段|**是**|-|
|search-hit|String|搜索框的placeholder|否|''|
|search-fields|Array|会在这个字段列表里面搜索|否|key-field的值|
|key-field|String|主键字段|**是**|-|
|tabs|Array|用于在列表上显示一个可以切换的tab，text为tab显示文本，value为tab对应的值|否|-|
|tab-field|String|切换tab的时候，通过这个字段来确定筛选的数据|否|-|

### 事件
|事件名|描述|返回值类型|说明|
|----|----|-------------|---|
|on-selected|点击列表中的一项后触发|Object|数组data里面的一个对象|
