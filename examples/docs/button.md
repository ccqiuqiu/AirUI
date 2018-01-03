# AirLineMap 航线地图
----


### 基础用法

<div>
  <air-button text="按钮" @on-click="click" />
</div>

<script>
  export default {
    methods: {
      click(string){
       console.log(string)
      }
    }
  }
</script>

::: demo
```html
<air-button />
```
:::

### 属性
|属性名|类型|描述|必须|默认|
|----|----|-------------|----|--------|

