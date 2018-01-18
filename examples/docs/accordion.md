# AirAccordion 可折叠组件
----

> 可折叠组件

### 基础用法
<div class="demo-block">
  <air-accordion>
    <air-accordion-content v-for="(item,i) in 5" :key="i">
      <span slot="icon">v</span>
      <div slot="header">Item</div>
      <div style="padding:16px;background-color:#eee;">
        <p v-for="a in i+1">asdasd</p>
      </div>
    </air-accordion-content>
  </air-accordion>
</div>

::: demo
```html
  <air-accordion>
    <air-accordion-content v-for="(item,i) in 5" :key="i">
      <span slot="icon">v</span>
      <div slot="header">Item</div>
      <div style="padding:16px;background-color:#eee;">
        <p v-for="a in i+1">asdasd</p>
      </div>
    </air-accordion-content>
  </air-accordion>
```
:::

### 可展开多个
<div class="demo-block">
  <air-accordion expand>
    <air-accordion-content v-for="(item,i) in 5" :key="i">
      <span slot="icon">v</span>
      <div slot="header">Item</div>
      <div style="padding:16px;background-color:#eee;">
        <p v-for="a in i+1">asdasd</p>
      </div>
    </air-accordion-content>
  </air-accordion>
</div>

::: demo
```html
  <air-accordion expand>
    <air-accordion-content v-for="(item,i) in 5" :key="i">
      <span slot="icon">v</span>
      <div slot="header">Item</div>
      <div style="padding:16px;background-color:#eee;">
        <p v-for="a in i+1">asdasd</p>
      </div>
    </air-accordion-content>
  </air-accordion>
```
:::

### inset样式
<div class="demo-block">
  <air-accordion inset>
    <air-accordion-content v-for="(item,i) in 5" :key="i">
      <span slot="icon">v</span>
      <div slot="header">Item</div>
      <div style="padding:16px;background-color:#eee;">
        <p v-for="a in i+1">asdasd</p>
      </div>
    </air-accordion-content>
  </air-accordion>
</div>

::: demo
```html
  <air-accordion inset>
    <air-accordion-content v-for="(item,i) in 5" :key="i">
      <span slot="icon">v</span>
      <div slot="header">Item</div>
      <div style="padding:16px;background-color:#eee;">
        <p v-for="a in i+1">asdasd</p>
      </div>
    </air-accordion-content>
  </air-accordion>
```
:::

### popout样式
<div class="demo-block">
  <air-accordion popout>
    <air-accordion-content v-for="(item,i) in 5" :key="i">
      <span slot="icon">v</span>
      <div slot="header">Item</div>
      <div style="padding:16px;background-color:#eee;">
        <p v-for="a in i+1">asdasd</p>
      </div>
    </air-accordion-content>
  </air-accordion>
</div>

::: demo
```html
  <air-accordion popout>
    <air-accordion-content v-for="(item,i) in 5" :key="i">
      <span slot="icon">v</span>
      <div slot="header">Item</div>
      <div style="padding:16px;background-color:#eee;">
        <p v-for="a in i+1">asdasd</p>
      </div>
    </air-accordion-content>
  </air-accordion>
```
:::

### 按tab键可聚焦
<div class="demo-block">
  <air-accordion focusable>
    <air-accordion-content v-for="(item,i) in 5" :key="i">
      <span slot="icon">v</span>
      <div slot="header">Item</div>
      <div style="padding:16px;background-color:#eee;">
        <p v-for="a in i+1">asdasd</p>
      </div>
    </air-accordion-content>
  </air-accordion>
</div>

::: demo
```html
  <air-accordion focusable>
    <air-accordion-content v-for="(item,i) in 5" :key="i">
      <span slot="icon">v</span>
      <div slot="header">Item</div>
      <div style="padding:16px;background-color:#eee;">
        <p v-for="a in i+1">asdasd</p>
      </div>
    </air-accordion-content>
  </air-accordion>
```
:::

### 属性
|属性名|类型|描述|必须|默认|
|----|----|-------------|----|--------|
|expand|Boolean|是否能展开多个item|-|false|
|focusable|Boolean|使面板可聚焦|-|false|
|inset|Boolean|展开的面板使用inset样式|-|false|
|popout|Boolean|展开的面板使用popout样式|-|false|


### Slots(air-accordion-content)
|Name|描述|
|----|----|
|header|面板的标题|
|icon|标题右边的图标|


