# IndexSelect 索引选择器
----
### 基础用法

<script>
  import airPort from './airPort'
  export default {
    data () {
      return {
        data: airPort
      }
    }  
  }
</script>

<div class="demo-block" style="height: 300px;">
  <air-index-select
  :data="data"
  :hots="['WAW', 'LAX', 'GRU', 'SCL', 'TYO', 'SHA', 'CAN']"
  text='citynameCN'
  sub-text='airportnameCN'
  group='airportnameEN'
  key='itatCode' />
</div>

::: demo
```html

<div>
  <air-index-select />
</div>

```
