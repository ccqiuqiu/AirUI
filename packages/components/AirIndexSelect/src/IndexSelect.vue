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
        <dl :class="['air-index-select__dl', 'air-index-select__hot']" v-show="!keyword">
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
    </div>
    <div :class="['air-index-select__index', {'air-index-select__index--tabs': !!tabs}]">
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
        index: [...'热ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
        tip: '', // 提示文字
        active: '热', // index上面激活的文字
        topDom: null,
        contentDom: null,
        showTip: false,
        titleOffsetTops: [],
        keyword: '',
        tabIndex: 0
      }
    },
    created () {
      // 排序
      this.sortedData()
    },
    computed: {
      tabFilterData () {
        if (this.tabs) {
          return this.data[this.tabIndex]
        } else {
          return this.data
        }
      },
      hotData () {
        if (this.hots && this.hots.length > 0) {
          return this.tabFilterData.filter(item => this.hots.includes(item[this.keyField]))
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
          this.titleOffsetTops = Array.from(this.$el.querySelectorAll('dt')).map(dt => ({char: dt.innerText, y: dt.offsetTop}))
        })
        return temp
      }
    },
    mounted () {
      this.topDom = this.$el.querySelector('.air-index-select__top')
      this.contentDom = this.$el.querySelector('.air-index-select__content')
      this.titleOffsetTops = Array.from(this.$el.querySelectorAll('dt')).map(dt => ({char: dt.innerText, y: dt.offsetTop}))
      this.bindEvent()
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
      bindEvent () {
        const indexBar = this.$el.querySelector('.air-index-select__index')
        let findStart = e => {
          const point = e.changedTouches ? e.changedTouches[0] : e
          const pointElement = document.elementFromPoint(point.pageX, point.pageY)
          if (pointElement) {
            let char = pointElement.innerText
            const titleDom = this.$el.querySelector('.air-index-select__key-' + (char === '热' ? 'hot' : char))
            if (char && titleDom && char.length === 1) {
              this.clickChar(char)
              this.showTip = true
            }
          }
          e.preventDefault()
        }
        let findEnd = () => {
          this.showTip = false
        }
        indexBar.addEventListener('touchstart', e => findStart(e))
        indexBar.addEventListener('touchmove', e => findStart(e))
        indexBar.addEventListener('touchend', e => findEnd(e))
      },
      clickChar (char) {
        this.tip = char
        this.active = char
      },
      scroll () {
        const dts = this.titleOffsetTops.filter(dt => dt.y - this.contentDom.scrollTop <= this.topDom.clientHeight)
        if (dts && dts.length > 0) {
          // this.tip = dts[dts.length - 1].char.charAt(0)
          this.active = dts[dts.length - 1].char.charAt(0)
        }
        // todo 滚动的时候动态将分组标题置顶
      },
      clickItem (item) {
        this.$emit('on-selected', item)
      }
    },
    watch: {
      tip (char) {
        const titleDom = this.$el.querySelector('.air-index-select__key-' + (char === '热' ? 'hot' : char))
        if (titleDom) {
          this.contentDom.scrollTop = titleDom.offsetTop - this.topDom.clientHeight
        }
      }
    }
  }
</script>
