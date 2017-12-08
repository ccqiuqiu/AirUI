<template>
  <div class="air-index-select">
    <div class="air-index-select__top">
      <div class="air-index-select__search">
        <input type="text" :placeholder="searchHit" v-model.trim="keyword" />
      </div>
      <div class="air-index-select__tab" v-if="tabs">
        <span @click="tabValue=tab.value" v-for="(tab, index) in tabs"
              :style="{borderColor: tab.value === tabValue ? activeColor : 'transparent', color: tab.value === tabValue ? '#333333' : '#AAAAAA'}">{{tab.text}}</span>
      </div>
    </div>
    <div class="air-index-select__content" @scroll="scroll">
      <div class="air-index-select__list">
        <dl :class="['air-index-select__dl', 'air-index-select__key-hot']" v-show="!keyword">
          <dt>热门</dt>
          <dd>
            <span v-for="item in hotData" @click="clickItem(item)">{{item[textField]}}</span>
          </dd>
        </dl>
        <dl v-for="(value, key) in listData" :class="['air-index-select__dl', 'air-index-select__key-'+key]">
          <dt>{{key}}</dt>
          <dd v-for="item in value" @click="clickItem(item)">
            <span class="air-index-select__text">{{item[textField]}}</span>
            <span class="air-index-select__sub-text">{{item[subTextField]}}</span>
          </dd>
        </dl>
      </div>
    </div>
    <div :class="['air-index-select__index', {'air-index-select__index--tabs': !!tabs}]">
      <template v-for="char in index">
        <span class="air-index-select__char" v-if="char === active" :style=[tipActiveStyle] @click="clickChar(char)">{{char}}</span>
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
        default: []
      },
      tabs: {
        type: Array,
        default: ['']
      },
      tabField: String
    },
    data () {
      return {
        index: [...'热ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
        tip: '', // 提示文字
        active: '热', // index上面激活的文字
        searchDom: null,
        contentDom: null,
        showTip: false,
        titleOffsetTops: [],
        tipActiveStyle: {
          color: this.activeColor,
          fontWeight: 'bold',
          fontSize: '16px'
        },
        keyword: '',
        tabValue: this.tabs[0].value
      }
    },
    computed: {
      hotData () {
        if (this.hots && this.hots.length > 0) {
          return this.data.filter(item => this.hots.includes(item[this.keyField]))
        }
        return []
      },
      searchResult () {
        let temp = {}
        if (this.tabs && this.tabField) {
          if (this.tabValue.indexOf('!') === 0) {
            temp = this.data.filter(item => this.tabValue !== item[this.tabField])
          } else {
            temp = this.data.filter(item => this.tabValue === item[this.tabField])
          }
        }
        if (this.keyword) {
          temp = temp.filter(item => this.searchFields.some(f => item[f].toUpperCase().indexOf(this.keyword.toUpperCase()) > -1))
        }
        return temp
      },
      listData () {
        const temp = {}
        this.searchResult.sort((item1, item2) => { // 排序
          const key1 = item1[this.groupField].charAt(0).toUpperCase()
          const key2 = item2[this.groupField].charAt(0).toUpperCase()
          if (key1 > key2) {
            return 1
          } else if (key1 < key2) {
            return -1
          } else {
            return 0
          }
        }).forEach(item => { // 分组
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
      this.searchDom = this.$el.querySelector('.air-index-select__search')
      this.contentDom = this.$el.querySelector('.air-index-select__content')
      this.titleOffsetTops = Array.from(this.$el.querySelectorAll('dt')).map(dt => ({char: dt.innerText, y: dt.offsetTop}))
      this.bindEvent()
    },
    methods: {
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
        const dts = this.titleOffsetTops.filter(dt => dt.y - this.contentDom.scrollTop <= this.searchDom.clientHeight)
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
          titleDom.scrollIntoView()
          // this.contentDom.scrollTop = titleDom.offsetTop - this.searchDom.clientHeight
        }
      }
    }
  }
</script>
