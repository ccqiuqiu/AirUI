<template>
  <div class="air-index-select">
    <div class="air-index-select__search">
      <input type="text" :value="searchHit"/>
    </div>
    <div class="air-index-select__content" @scroll="scroll">
      <div class="air-index-select__history">
        搜索历史
      </div>
      <div class="air-index-select__hot">热门城市</div>
      <div class="air-index-select__list">
        <dl v-for="(value, key) in listData" :class="['air-index-select__dl', 'air-index-select__key-'+key]">
          <dt>{{key}}</dt>
          <dd v-for="item in value">
            <span class="air-index-select__text">{{item.citynameCN}}</span>
            <span class="air-index-select__sub-text">{{item.airportnameCN}}</span>
          </dd>
        </dl>
      </div>
    </div>
    <div class="air-index-select__index">
      <template v-for="char in index">
        <span class="air-index-select__char" v-if="char === tip" :style=[tipActiveStyle] @click="clickChar(char)">{{char}}</span>
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
      text: {
        type: String,
        required: true
      },
      subText: String
    },
    data () {
      return {
        index: [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
        tip: '',
        searchDom: null,
        contentDom: null,
        searchHit: '',
        showTip: false,
        titleOffsetTops: [],
        tipActiveStyle: {
          color: '#FF0000',
          fontWeight: 'bold',
          fontSize: '16px'
        }
      }
    },
    computed: {
      listData () {
        const temp = {}
        this.data.sort((item1, item2) => { // 排序
          const key1 = item1.airportnameEN.charAt(0).toUpperCase()
          const key2 = item2.airportnameEN.charAt(0).toUpperCase()
          if (key1 > key2) {
            return 1
          } else if (key1 < key2) {
            return -1
          } else {
            return 0
          }
        }).forEach(item => { // 分组
          const key = item.airportnameEN.charAt(0).toUpperCase()
          if (!temp[key]) {
            temp[key] = []
          }
          temp[key].push(item)
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
            const titleDom = this.$el.querySelector('.air-index-select__key-' + char)
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
      },
      scroll () {
        const dts = this.titleOffsetTops.filter(dt => dt.y - this.contentDom.scrollTop <= this.searchDom.clientHeight)
        if (dts && dts.length > 0) {
          this.tip = dts[dts.length - 1].char
        }
        // todo 滚动的时候动态将分组标题置顶
      }
    },
    watch: {
      tip (val) {
        const titleDom = this.$el.querySelector('.air-index-select__key-' + val)
        if (titleDom) {
          this.contentDom.scrollTop = titleDom.offsetTop - this.searchDom.clientHeight
        }
      }
    }
  }
</script>
