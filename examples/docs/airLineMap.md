# AirLineMap 航线地图
----

> 在地图上绘制机场间的航线

### 基础用法

<div class="demo-block">
  <air-line-map :codes="['CAN','PEK','CSX']" />
</div>

::: demo
```html
  <air-line-map :codes="['CAN','PEK','CSX']" />
```
:::

### 属性
|属性名|类型|描述|必须|默认|
|----|----|-------------|----|--------|
|codes|Array|机场三字码数组|**是**|-|
|map-fill|String|地图填充色|-|#DDD|
|map-stroke|String|地图描边色|-|#BBB|
|icon-fill|String|飞机图标颜色|-|#000000|
|icon-size|Number|飞机图标尺寸|-|20|
|icon-z|Number|飞机图标z-index|-|100|
|line-stroke|String|航线颜色|-|#999|
|line-z|Number|航向z-index|-|0|
|dot-fill|String|关键点颜色|-|#ff2d7d|
|dot-R|Number|关键点半径|-|8|
|dot-z|Number|关键点z-index|-|20|
|hd|Boolen|是否开始高清缩放，会根据dpr缩放关键点和图标的大小|-|true|

