<!--Created by 熊超超(https://github.com/ccqiuqiu) on 2017/11/15.-->
<template>
  <div class="air-index-select">
    <div class="air-index-select__top">
      <div class="air-index-select__search">
        <input type="text" :placeholder="searchHit" v-model.trim="keyword" />
      </div>
      <div class="air-index-select__tab" v-if="tabs">
        <span @click="tabIndex=index" v-for="(tab, index) in tabs"
              :style="{borderColor: index === tabIndex ? activeColor : 'transparent', color: index === tabIndex ? '#333333' : '#AAAAAA'}">{{tab}}</span>
      </div>
    </div>
    <div class="air-index-select__content" @scroll="scroll">
      <div class="air-index-select__list">
        <dl :class="['air-index-select__dl', 'air-index-select__key-hot']" v-show="!keyword">
          <dt>热门</dt>
          <dd>
            <span v-for="item in hotData" :key="item[keyField]" @click="clickItem(item)">{{item[textField]}}</span>
          </dd>
        </dl>
        <dl v-for="(value, key) in listData" :key="key" :class="['air-index-select__dl', 'air-index-select__key-'+key]">
          <dt>{{key}}</dt>
          <dd v-for="item in value" :key="item[keyField]" @click="clickItem(item)">
            <span class="air-index-select__text">{{item[textField]}}</span>
            <span class="air-index-select__sub-text">{{item[subTextField]}}</span>
          </dd>
        </dl>
      </div>
      <div class="air-index-select__title" v-show="active !== '热'">{{active}}</div>
    </div>
    <div :class="['air-index-select__index', {'air-index-select__index--tabs': !!tabs}]"
         @touchstart.stop.prevent="touchstart"
         @touchmove.stop.prevent="touchmove"
         @touchend.stop.prevent="touchend"
    >
      <template v-for="char in index">
        <span class="air-index-select__char air-index-select__char--active" v-if="char === active" :style={color:activeColor} @click="clickChar(char)">{{char}}</span>
        <span class="air-index-select__char" v-else @click="clickChar(char)">{{char}}</span>
      </template>
    </div>
    <div class="air-index-select__tip" v-show="showTip">{{tip}}</div>
  </div>
</template>
<script>
  export default{
    name: 'AirIndexSelect',
    props: {
      data: {
        type: Array,
        required: true
      },
      hots: Array,
      hotList: Array,
      hotSortField: String,
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
      tabs: Array
    },
    data () {
      return {
        tip: '', // 提示文字
        active: '热', // index上面激活的文字
        contentDom: null,
        titleDom: null,
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
        return ['热', ...Object.keys(this.listData)]
      },
      tabFilterData () {
        if (this.tabs) {
          return this.data[this.tabIndex]
        } else {
          return this.data
        }
      },
      hotData () {
        let hotData = []
        if (this.hots && this.hots.length > 0) {
          hotData = this.tabFilterData.filter(item => this.hots.includes(item[this.keyField]))
        }
        if (this.hotList && this.hotList.length > 0) {
          hotData = this.hotList
        }
        if (this.hotSortField) {
          hotData.sort((a, b) => b[this.hotSortField] - a[this.hotSortField])
        }
        return hotData
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
          this.titleOffsetTops = Array.from(this.$el.querySelectorAll('dt')).map(dt => ({char: dt.innerText, y: dt.offsetTop}))
        })
        return temp
      }
    },
    mounted () {
      this.contentDom = this.$el.querySelector('.air-index-select__content')
      this.titleDom = this.$el.querySelector('.air-index-select__title')
      // this.titleOffsetTops = Array.from(this.$el.querySelectorAll('dt')).map(dt => ({char: dt.innerText, y: dt.offsetTop - this.contentDom.offsetTop}))
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
            const titleDom = this.$el.querySelector('.air-index-select__key-' + (char === '热' ? 'hot' : char))
            if (char && titleDom && char.length === 1) {
              this.clickChar(char)
              this.showTip = true
            }
          }
        }
      },
      clickChar (char) {
        this.tip = char
        this.active = char
      },
      scroll () {
        const dts = this.titleOffsetTops.filter(dt => dt.y - this.contentDom.scrollTop <= this.contentDom.offsetTop)
        if (dts && dts.length > 0) {
          this.active = dts[dts.length - 1].char.charAt(0)
        }
        // 下一个标题距离顶部的位置
        const offset = this.titleOffsetTops[(dts.length)] ?
          this.titleOffsetTops[(dts.length)].y - this.contentDom.scrollTop - this.contentDom.offsetTop : 26
        // 这个值只能在0-26之间才触发位移  26为title的高
        this.offset = Math.min(Math.max(0, offset), 26) - 26
      },
      clickItem (item) {
        this.$emit('on-selected', item)
      }
    },
    watch: {
      tip (char) {
        const titleDom = this.$el.querySelector('.air-index-select__key-' + (char === '热' ? 'hot' : char))
        if (titleDom) {
          this.contentDom.scrollTop = titleDom.offsetTop
        }
      },
      offset(val, oldVal) {
        if (val !== oldVal) {
          this.titleDom.style.transform = `translate3d(0, ${val}px, 0)`
        }
      }
    }
  }
</script>
