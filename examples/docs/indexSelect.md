# IndexSelect 索引选择器
----

> 带索引和搜索功能的选择器组件，用于机场选择、城市选择、联系人选择等场景。索引条支持滑动选择

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
    key-field="itatCode"
    @on-selected="selected" />
</div>
<script>
  import {airPort} from '../../packages/res'
  export default {
    data () {
      return {
        data: [airPort.filter(item => item.countrynameEN === 'CN'), airPort.filter(item => item.countrynameEN !== 'CN')],
        searchFields: ['itatCode','airportnameEN'],
        hots: ['WAW', 'LAX', 'GRU', 'SCL', 'TYO', 'SHA', 'CAN'],
        tabs: ['国内', '国际']
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
<air-index-select
  :data="data"
  :hots="hots"
  text-field="citynameCN"
  sub-text-field="airportnameCN"
  group-field="airportnameEN"
  search-hit="出发地中文/拼音/英文/机场三字码"
  :search-fields="searchFields"
  :tabs="tabs"
  key-field="itatCode"
  @on-selected="selected" />

<script>
  import {airPort} from 'airui-vue/res'
  export default {
    data () {
      return {
        data: [airPort.filter(item => item.countrynameEN === 'CN'), airPort.filter(item => item.countrynameEN !== 'CN')],
        searchFields: ['itatCode','airportnameEN'],
        hots: ['WAW', 'LAX', 'GRU', 'SCL', 'TYO', 'SHA', 'CAN'],
        tabs: ['国内', '国际']
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

### 使用了AirScroll组件的版本,滑动效果更好一些

<div class="demo-block demo-block-m">
  <air-index-list
    :data="data"
    :hots="hots"
    text-field="citynameCN"
    sub-text-field="airportnameCN"
    group-field="airportnameEN"
    search-hit="出发地中文/拼音/英文/机场三字码"
    :search-fields="searchFields"
    :tabs="tabs"
    key-field="itatCode"
    @on-selected="selected" />
</div>

::: demo
```html
<air-index-list
  :data="data"
  :hots="hots"
  text-field="citynameCN"
  sub-text-field="airportnameCN"
  group-field="airportnameEN"
  search-hit="出发地中文/拼音/英文/机场三字码"
  :search-fields="searchFields"
  :tabs="tabs"
  key-field="itatCode"
  @on-selected="selected" />

<script>
  import {airPort} from 'airui-vue/res'
  export default {
    data () {
      return {
        data: [airPort.filter(item => item.countrynameEN === 'CN'), airPort.filter(item => item.countrynameEN !== 'CN')],
        searchFields: ['itatCode','airportnameEN'],
        hots: ['WAW', 'LAX', 'GRU', 'SCL', 'TYO', 'SHA', 'CAN'],
        tabs: ['国内', '国际']
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
|key-field|String|主键字段|**是**|-|
|data|Array|要显示的数据|**是**|如果tabs不为空，那么data格式必须为[[],[]]|
|text-field|String|在列表中需要显示的字段名|**是**|-|
|group-field|String|分组字段|**是**|-|
|hots|Array|热点区域要显示的内容，通过key-field属性从data里面查询得到|-|[]|
|sub-text-field|String|在列表中显示的字段名-次要|-|''|
|search-hit|String|搜索框的placeholder|-|''|
|search-fields|Array|会在这个字段列表里面搜索|－|key-field的值|
|tabs|Array|用于在列表上显示一个可以切换的标签组,tabs的length和data的length必须一致|－|-|

### 事件
|事件名|描述|返回值类型|说明|
|----|----|-------------|---|
|on-selected|点击列表中的一项后触发|Object|数组data里面的一个对象|
