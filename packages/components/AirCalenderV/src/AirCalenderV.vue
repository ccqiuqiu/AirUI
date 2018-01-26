<!--Created by 熊超超(https://github.com/ccqiuqiu) on 2018/1/25.-->
<template>
  <div class="air-calender-v" :class="'air-calender-v__select'+select">
    <!--已选择日期-->
    <div class="air-calender-v--header" v-if="double">
       <div v-for="(text, i) in titles" :class="{active:select === i + 1}">
         <span class="text">{{text}}</span>
         <span>{{activeDate1.format}}</span>
       </div>
    </div>
    <!--星期-->
    <div class="air-calender-v--week" :class="weekBg">
      <span v-for="w in weeks">{{w}}</span>
    </div>
    <!--日历-->
    <div class="air-calender-v--content">
      <div class="air-calender-v--month" v-for="month in renderList" :key="month.m">

        <div class="air-calender-v--title">
          <span>{{month.m}}</span>
          <span>月{{month.y}}年</span>
          <span class="price">{{month.lowPrice && currency + month.lowPrice + '+'}}</span>
        </div>

        <div class="air-calender-v--days">
          <span v-for="(date, index) in month.ds" :key="index" @click="clickDate(month, date)"
                :class="{
                  disable:date.state === -1,
                  low:date.low,
                  null: !date,
                  'is-area': isBefore && date.state >= 1 && date.state <= 3,
                  active1: date.state === 1,
                  active2: date.state === 3,
                  weekend: date.w === 6 || date.w === 0
                }">
            <span class="holiday" v-if="date.holiday">￥{{date.holiday}}</span>
             <span class="day">{{date.d}}</span>
            <span v-if="isBefore && date.state >= 1 && date.state <= 3" class="area"></span>
            <span class="price" v-if="date.price">{{currency + date.price}}</span>
          </span>
        </div>

      </div>
    </div>

    <div class="air-calender-v--btn" v-if="!double && activeDate1.date || isBefore" @click="selected">
      <slot name="btn">
        <div>{{btnText}}</div>
      </slot>
    </div>

  </div>
</template>
<script>
  import format from 'date-fns/esm/format'
  import addMonths from 'date-fns/esm/addMonths'
  import startOfMonth from 'date-fns/esm/startOfMonth'
  import isBefore from 'date-fns/esm/isBefore'
  import startOfDay from 'date-fns/esm/startOfDay'
  import endOfMonth from 'date-fns/esm/endOfMonth'
  import eachDayOfInterval from 'date-fns/esm/eachDayOfInterval'

  export default{
    name: 'AirCalenderV',
    props: {
      num: {
        type: Number,
        default: 12
      },
      startSun: {
        type: Boolean,
        default: false
      },
      weekBg: {
        type: String,
        default: 'air-calender-v--wbg'
      },
      date: String,
      date2: String,
      data: {
        type: Array,
        default: () => []
      },
      data2: {
        type: Array,
        default: () => []
      },
      currency: {
        type: String,
        default: '￥'
      },
      double: {
        type: Boolean,
        default: false
      },
      titles: {
        type: Array,
        default: () => ['出发日期', '返回日期']
      },
      btnText: {
        type: String,
        default: '确定'
      }
    },
    data () {
      return {
        monthList: this.initData(), // 基础日历，仅日期数据
        select: 1,
        activeDate1: this.date ? {
          date: new Date(this.date),
          format: this.date
        } : {},
        activeDate2: this.date ? {
          date: new Date(this.date2),
          format: this.date2
        } : {}

      }
    },
    computed: {
      isBefore () {
        return isBefore(this.activeDate1.date, this.activeDate2.date)
      },
      weeks () {
        const w = [...'一二三四五六日']
        if (this.startSun) {
          w.pop()
          w.unshift('日')
        }
        return w
      },
      // 切换要显示的数据
      renderData () {
        return (!this.double || this.select === 1) ? this.data : this.data2
      },
      // 最终要渲染的日历，包含了所有数据
      renderList () {
        return this.monthList.map(month => {
          // 先取出当前月的价格
          const ps = this.renderData.filter(p => p.date.substr(0, 7) === format(month.y + '-' + month.m2, 'YYYY-MM'))
          // 取出当前月的最低价
          const lowPrice = Math.min.apply(null, ps.map(p => Number(p.text) || 0))

          // 组装需要的数据
          const ds = month.ds.map(date => {
            if (date) {
              const dateStr = format(date, 'YYYY-MM-DD')
              const p = ps.find(p => p.date === dateStr) // 从价格数据里面获取当前日期的价格对象
              const price = p ? p.text : 0
              // 标识状态
              let state = 0
              // 今天前，或者选择第二个日期的时候，第一个日期前 都是 -1
              const d = startOfDay(new Date())
              if (isBefore(date, d) || this.select === 2 && isBefore(date, this.activeDate1.date)) {
                state = -1
              } else if (dateStr === this.activeDate1.format) {
                state = 1
              } else if (dateStr === this.activeDate2.format) {
                state = 3
              } else if (!isBefore(date, this.activeDate1.date) && isBefore(date, this.activeDate2.date)) {
                state = 2
              }
              return {
                date,
                format: dateStr,
                d: format(date, 'D'),
                w: parseInt(format(date, 'd')),
                price,
                state,
                low: price === lowPrice
              }
            } else {
              return false
            }
          })

          return {
            ...month,
            lowPrice,
            ds
          }
        })
      }
    },
    mounted () {
      // 如果有传初始激活的日期，那么自动滚动到日期的位置
      const dom = this.$el.querySelector('.active1')
      dom && dom.scrollIntoViewIfNeeded()
    },
    methods: {
      initData () {
        // 起始日是当月的第一天
        const startDate = startOfMonth(new Date())
        const monthList = new Array(this.num).fill('')
          .map((item, i) => this.createMonthData(addMonths(startDate, i)))
        return monthList
      },
      // 创建一个月的数据
      createMonthData (start) {
        const month = {
          y: format(start, 'YYYY'),
          m: format(start, 'M'),
          m2: format(start, 'MM')
        }
        const weekStart =  this.startSun ? 0 : 1
        // 月的最后一天
        const end = endOfMonth(start)
        // 生成第一天到最后一天的数据
        const arr = eachDayOfInterval({start, end})
        // 补全第一天不是在星期的开始的时候的空位，如第一天是周3  就要补全周2、周1 2个空位
        const start_w = start.getDay() || 7
        arr.unshift(...new Array(start_w - weekStart).fill(false))
        // 补全最后一天不是在星期的结束的时候的空位，如最后一天是周3  就要补全周4、周5、周6、周日 4个空位
        const end_w = end.getDay()
        arr.push(...new Array(Math.max(7 - end_w - weekStart, 0)).fill(false))

        month.ds = arr
        return month
      },
      clickDate (month, date) {
        if (date.state === 0 || date.state === 2) {
          this['activeDate'+ this.select] = date
          if (this.double) {
            this.select = 3 - this.select
          }
        }
      },
      selected () {
        this.$emit('selected', this.double ? [this.activeDate1, this.activeDate2] : this.activeDate1)
      }
    }
  }
</script>
