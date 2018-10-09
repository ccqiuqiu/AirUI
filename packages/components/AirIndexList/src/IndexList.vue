<!--Created by 熊超超(https://github.com/ccqiuqiu) on 2017/11/15.-->
<template>
  <div class="air-index-select scroll">
    <div class="air-index-select__top">
      <div class="air-index-select__search" :class="searchClass">
        <div>
          <slot name="icon"></slot>
          <input type="text" :placeholder="searchHit" v-model.trim="keyword" />
        </div>
      </div>
      <div class="air-index-select__tab" v-if="tabs">
        <span @click="tabIndex=index" v-for="(tab, index) in tabs"
              :style="{borderColor: index === tabIndex ? activeColor : 'transparent', color: index === tabIndex ? '#333333' : '#AAAAAA'}">{{tab}}</span>
      </div>
    </div>
    <div class="air-index-select__content">
      <scroll class="air-index-select__list" ref="scroll" noRoot listenScroll @scroll="scroll" :probeType="2" :scrollbar="false">
        <!--历史-->
        <dl :class="['air-index-select__dl', 'air-index-select__key-his', hisClass]" v-show="!keyword" v-if="hisText">
          <dt>
            <slot name="his">历史</slot>
          </dt>
          <dd>
            <span v-for="item in hisData" :key="item[keyField]" @click="clickItem(item)">{{item[textField]}}</span>
          </dd>
        </dl>
        <!--热门-->
        <dl :class="['air-index-select__dl', 'air-index-select__key-hot', hotClass]" v-show="!keyword">
          <dt>
            <slot name="hot">热门</slot>
          </dt>
          <dd>
            <span v-for="item in hotData" :class="getHightLineClass(item[keyField])" :key="item[keyField]" @click="clickItem(item)">{{item[textField]}}</span>
          </dd>
        </dl>
        <dl v-for="(value, key) in listData" :key="key" :class="['air-index-select__dl', 'air-index-select__key-'+key]">
          <dt>{{key}}</dt>
          <dd v-for="item in value" :key="item[keyField]" @click="clickItem(item)">
            <slot :item="item">
              <span class="air-index-select__text">{{item[textField]}}</span>
              <span class="air-index-select__sub-text">{{item[subTextField]}}</span>
            </slot>
          </dd>
        </dl>
      </scroll>
      <div class="air-index-select__title" :style="titleStyle" v-show="/[A-Z]/.test(active) && fixTitle">{{active}}</div>
    </div>
    <div :class="['air-index-select__index', {'air-index-select__index--tabs': !!tabs}, indexClass]" v-show="!keyword"
         @touchstart.stop.prevent="touchstart"
         @touchmove.stop.prevent="touchmove"
         @touchend.stop.prevent="touchend">
      <template v-for="char in index">
        <span class="air-index-select__char air-index-select__char--active" v-if="char === active" :style={color:activeColor} @click="clickChar(char)">{{char}}</span>
        <span class="air-index-select__char" v-else @click="clickChar(char)">{{char}}</span>
      </template>
    </div>
    <div class="air-index-select__tip" v-show="showTip">{{tip}}</div>
  </div>
</template>
<script>
  import Scroll from '../../AirScroll'
  export default{
    name: 'AirIndexList',
    components: {Scroll},
    props: {
      data: {
        type: Array,
        required: true
      },
      hots: Array,
      hotHighlight: Array,
      hotHighlightClass: {
        type: String,
        default: 'air-index-select__key-hot-hl'
      },
      histories: Array,
      textField: {
        type: String,
        required: true
      },
      subTextField: String,
      groupField: {
        type: String,
        required: true
      },
      keyField: {
        type: String,
        required: true
      },
      searchHit: String,
      activeColor: {
        type: String,
        default: '#FF0000'
      },
      searchFields: {
        type: Array,
        default: () => ([])
      },
      tabs: Array,
      hotText: {
        type: String,
        default: '热'
      },
      hisText: {
        type: String,
        default: ''
      },
      searchClass: String,
      hotClass: String,
      indexClass: String,
      hisClass: String,
      fixTitle: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        tip: '', // 提示文字
        active: this.hisText || this.hotText, // index上面激活的文字
        titleDom: null,
        contentDom: null,
        showTip: false,
        titleOffsetTops: [],
        keyword: '',
        tabIndex: 0,
        offset: 0 // 下一个标题距离顶部位置
      }
    },
    created () {
      // 排序
      this.sortedData()
    },
    computed: {
      index () {
        const arr = [this.hotText, ...Object.keys(this.listData)]
        this.hisText && arr.unshift(this.hisText)
        return arr
      },
      tabFilterData () {
        if (this.tabs) {
          return this.data[this.tabIndex]
        } else {
          return this.data
        }
      },
      hotData () {
        return this.hots.map(item => this.tabFilterData.find(item2 => item2[this.keyField] === item))
            .filter(item => item)
        // return this.tabFilterData.filter(item => this.hots.includes(item[this.keyField]))
      },
      hisData () {
        if (this.histories && this.histories.length > 0) {
          // return this.tabFilterData.filter(item => this.histories.includes(item[this.keyField]))
          return this.histories.map(item => this.tabFilterData.find(item2 => item2[this.keyField] === item))
            .filter(item => item)
        }
        return []
      },
      searchData () {
        if (this.keyword) {
          return this.tabFilterData.filter(item => this.searchFields.some(f => item[f].toUpperCase().indexOf(this.keyword.toUpperCase()) > -1))
        }
        return this.tabFilterData
      },
      listData () {
        const temp = {}
        this.searchData.forEach(item => { // 分组
          const key = item[this.groupField].charAt(0).toUpperCase()
          if (!temp[key]) {
            temp[key] = []
          }
          temp[key].push(item)
        })
        this.$nextTick(() => {
          this.titleOffsetTops = Array.from(this.$el.querySelectorAll('dt')).map((dt, index) => {
            let text = dt.innerText
            if (this.hisText) {
              if (index === 0) {
                text = this.hisText
              } else if (index === 1) {
                text = this.hotText
              }
            } else {
              if (index === 0) {
                text = this.hotText
              }
            }
            return {char: text, y: dt.offsetTop}
          })
        })
        return temp
      },
      titleStyle() {
        return {
          transform: `translate3d(0, ${this.offset}px, 0)`
        }
      }
    },
    mounted () {
      this.contentDom = this.$el.querySelector('.air-index-select__content')
      this.titleDom = this.$el.querySelector('.air-index-select__title')
      // this.titleOffsetTops = Array.from(this.$el.querySelectorAll('dt')).map(dt => ({dom: dt, char: dt.innerText, y: dt.offsetTop}))
    },
    methods: {
      sortedData () {
        if (this.tabs) {
          this.data.forEach(a => this.sortedArray(a))
        } else {
          this.sortedArray(this.data)
        }
      },
      sortedArray (arr) {
        arr.sort((item1, item2) => { // 排序
          const key1 = item1[this.groupField].charAt(0).toUpperCase()
          const key2 = item2[this.groupField].charAt(0).toUpperCase()
          if (key1 > key2) {
            return 1
          } else if (key1 < key2) {
            return -1
          } else {
            return 0
          }
        })
      },
      // 绑定索引条触摸事件
      touchstart(e) {
        this.moveIndex(e)
      },
      touchmove(e) {
        this.moveIndex(e)
      },
      touchend() {
        this.showTip = false
      },
      moveIndex(e) {
        const point = e.changedTouches ? e.changedTouches[0] : e
        // 找到点击的dom
        const pointElement = document.elementFromPoint(point.pageX, point.pageY)
        if (pointElement) {
          let char = pointElement.innerText
          if (this.index.includes(char)) {
            const titleDom = this.$el.querySelector('.air-index-select__key-' + this.getChar(char))
            if (char && titleDom) {
              this.clickChar(char)
              this.showTip = true
            }
          }
        }
      },
      getChar(char) {
        if (char === this.hotText) {
          return 'hot'
        } else if (char === '历史') {
          return 'his'
        } else {
          return char
        }
      },
      getHightLineClass(key) {
        if (this.hotHighlight)
        return this.hotHighlight.find(item => item === key) ? this.hotHighlightClass : ''
      },
      clickChar (char) {
        this.tip = char
        this.active = char
      },
      scroll ({y}) {
        y = Math.abs(Math.min(y, 0))
        const dts = this.titleOffsetTops.filter(dt => dt.y - y <= 0)
        if (dts && dts.length > 0) {
          this.active = dts[dts.length - 1].char
        }
        // 下一个标题距离顶部的位置
        const h = Math.ceil(this.titleDom.clientHeight)
        const offset = this.titleOffsetTops[(dts.length)] ? this.titleOffsetTops[(dts.length)].y - y : h
        this.offset = Math.min(Math.max(0, offset), h) - h
      },
      clickItem (item) {
        this.$emit('on-selected', item)
      }
    },
    watch: {
      tip (char) {
        const titleDom = this.$el.querySelector('.air-index-select__key-' + this.getChar(char))
        if (titleDom) {
          this.$refs.scroll.scrollToElement(titleDom, 0)
        }
      },
      offset(val, oldVal) {
        if (val !== oldVal) {
          // this.titleDom.style.transform = `translate3d(0, ${val}px, 0)`
        }
      },
      data(val, oldVal) {
        if (val !== oldVal) {
          this.sortedData()
        }
      }
    }
  }
</script>
