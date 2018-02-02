<!--Created by 熊超超(https://github.com/ccqiuqiu) on 2018/1/22.-->
<template>
  <div class="air-calendar-h">
    <span class="air-calendar-h--left" :class="{disable: disableLeft}" @click="pre"><slot name="left">&lt;</slot></span>
    <div>
      <div :style="transform" class="air-calendar-h--wrap">
        <div v-for="(item, i) in list" :key="i" class="air-calendar-h--item" @click="clickItem(i)"
             :class="{disable: item.disable, pre: i < index, next: i > index }">
          <div class="air-calendar-h--y" v-if="i === index">{{item.y}}年</div>
          <div class="air-calendar-h--y" v-else>&nbsp;</div>

          <div class="air-calendar-h--con">
            <div class="air-calendar-h--con2">
              <div class="air-calendar-h--date">
                <template v-if="i === index || !preText || !nextText">
                  <span>{{item.m}}-{{item.d}}</span>
                  <span>{{item.w}}</span>
                </template>
                <template v-else>
                  <span>{{i < index ? preText : nextText}}</span>
                </template>
              </div>
              <div class="air-calendar-h--data" v-if="item.text">{{currency + item.text}}</div>
              <div class="air-calendar-h--data" v-else>&nbsp;</div>
            </div>
            <span class="air-calendar-h--icon" v-if="$slots.icon"><slot name="icon" v-if="i === index"/></span>
          </div>

        </div>
      </div>

      <div class="air-calendar-h--line"></div>
    </div>

    <span class="air-calendar-h--right" :class="{disable: disableRight}" @click="next"><slot name="right">&gt;</slot></span>
  </div>
</template>
<script>
  import addDays from 'date-fns/esm/addDays'
  import format from 'date-fns/esm/format'
  import isBefore from 'date-fns/esm/isBefore'
  import { zhCN as locale } from 'date-fns/esm/locale'
  import throttle from '../../../utils/throttle'

  export default{
    name: 'AirCalendarH',
    props: {
      startDate: {
        type: Date,
        default: () => new Date()
      },
      endDate: Date,
      value: {
        type: Date,
        default: () => new Date()
      },
      data: {
        type: Array,
        default: () => []
      },
      nextText: String,
      preText: String,
      clickEnable: Boolean,
      currency: {
        type: String,
        default: '￥'
      }
    },
    data () {
      return {
        // activeDate: this.value,
        list: [],
        index: 4, // 激活的日期的索引
        noAnim: false // 不要动画，用于移动到边界的时候，瞬间调整位置
      }
    },
    computed: {
      activeDate () {
        return this.list.length > 0 ? this.list[this.index].date : this.value
      },
      transform () {
        return {
          transition: this.noAnim ? 'none' :'all 0.3s',
          transform: 'translate3d(' + -33.33333 * (this.index - 1) + '%,0,0)'
        }
      },
      disableLeft () {
        // 开始时间不在激活时间前，禁用后退
        return this.startDate && !isBefore(this.startDate, this.list[this.index].date)
      },
      disableRight () {
        // 激活时间不在结束时间前，禁用前进
        return this.endDate && !isBefore(this.list[this.index].date, this.endDate)
      }
    },
    watch: {
      activeDate (val, oldVal) {
        if (format(val, 'YYYYMMDD') !== format(oldVal, 'YYYYMMDD')) {
          this.$emit('input', val)
          this.$emit('change', val)
        }
      }
    },
    created () {
      this.init()
    },
    methods: {
      // 初始化要显示的日期数组
      init () {
        // 通过激活的日期，生成前后2天，共5天的数据
        // 例如当前激活的日期是22日，那么生成前后5天的日期，[20,21,22,23,24]
        // 假如按照这样的5天一直循环，结构应该是这样[20,21,22,23,24,20,21,22,23,24,20,21,22,23,24,20,21,22,23,24.......]
        // 要实现无限循环，中间取一个完整循环的5天，前面取上一个循环的后2天，后面取下一个循环的前2天
        // 最终结果应该是这样的结构[23,24,20,21,22,23,24,20,21]
        const temp1 = [this.createItem(addDays(this.activeDate, -2)), this.createItem(addDays(this.activeDate, -1))]
        const temp2 = [this.createItem(addDays(this.activeDate, 1)), this.createItem(addDays(this.activeDate, 2))]
        this.list = [...temp2, ...temp1, this.createItem(this.activeDate), ...temp2, ...temp1]
      },
      createItem (date) {
        const disable = this.startDate && format(date, 'YYYYMMDD') - format(this.startDate, 'YYYYMMDD') < 0
          || this.endDate && format(date, 'YYYYMMDD') - format(this.endDate, 'YYYYMMDD') > 0
        const y = format(date, 'YYYY')
        const m = format(date, 'MM')
        const d = format(date, 'DD')
        const w = format(date, 'ddd', {locale})
        // 获取数据
        const item = this.data.find(d => d.date === format(date, 'YYYY-MM-DD'))
        const text = item ? item.text : ''
        return { date, y, m, d, w, disable, text }
      },
      // 这里使用节流的方式，保证在过渡动画完成前不触发下一次动画
      next: throttle(function () {
        if (this.disableRight) {
          return
        }
        // 到达边界，瞬间跳到前面的相同位置
        if (this.index >= 7) {
          this.noAnim = true
          this.index = 2
        }
        // 这里使用$nextTick和setTimeout都是为了保证前面的瞬间跳动的代码完成后才执行下面的更新
        // 只使用$nextTick不能完全保证，所以结合setTimeout一起使用
        this.$nextTick(() => setTimeout(() => this.updateList(false), 0))
      }, 350),
      pre: throttle(function () {
        if (this.disableLeft) {
          return
        }
        // 到达边界，瞬间调到后面的相同位置
        if (this.index <= 1) {
          this.noAnim = true
          this.index = 6
        }
        this.$nextTick(() => setTimeout(() => this.updateList(), 0))
      }, 350),
      updateList(left = true) {
        // 更新集合
        this.noAnim = false
        if (!left) { // 右移
          this.index++
          // 右移的时候，先将当期激活的时间+2天
          const item = this.createItem(addDays(this.list[this.index].date, 2))
          // 计算要更新的2个位置
          const i1 = this.index + 2
          const i2 = this.index - 3
          // 如果位置没有越界，就更新相应位置的数据
          i1 < this.list.length && this.list.splice(i1, 1 ,item)
          i2 >= 0 && this.list.splice(i2, 1 ,item)
        } else { // 左移
          this.index--
          // 左移的时候，先将当期激活的时间-2天
          const item = this.createItem(addDays(this.list[this.index].date, -2))
          // 计算要更新的2个位置
          const i1 = this.index - 2
          const i2 = this.index + 3
          // 如果位置没有越界，就更新相应位置的数据
          i2 < this.list.length && this.list.splice(i2, 1 ,item)
          i1 >= 0 && this.list.splice(i1, 1 ,item)
        }
      },
      clickItem: throttle(function (i) {
        if (this.clickEnable) {
          if (i > this.index) {
            this.next()
          } else if (i < this.index) {
            this.pre()
          }
        }
        // 激活的日期点击事件
        if (this.index === i) {
          this.$emit('click', this.list[this.index].date)
        }
      }, 350)
    }
  }
</script>
