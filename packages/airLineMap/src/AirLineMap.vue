<!--Created by 熊超超 on 2017/12/13.-->
<template>
  <div class="air-line-map">
  </div>
</template>

<script>
  import zrender from 'zrender'
  import * as utils from './utils'
  import china from './china'
  import airPortLocation from './china_airport_location'
  export default {
    name: 'AirLineMap',
    props: {
      map: {
        type: Object,
        default: () => ({
          fill: '#DDD',
          stroke: '#BBB'
        })
      },
      airPortCodes: {
        type: Array,
        required: true
      },
      icon: {
        type: Object,
        default: () => ({
          size: 20,
          z: 100,
          fill: '#000000'
        })
      },
      line: {
        type: Object,
        default: () => ({
          stroke: '#999',
          z: 0
        })
      },
      dot: {
        type: Object,
        default: () => ({
          fill: '#ff2d7d',
          z: 10,
          r: 8,
          shadowBlur: 10
        })
      },
    },
    data() {
      return {
        airPortLocations: this.airPortCodes.map(code => airPortLocation.find(l => l.airport === code)).filter(l => !!l),
        zr: null, // 画布实例
        timeStop: 1000,
        time: 5000,
        zzSvg: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1513587186952" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="763" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M505.09248446 55.17408783c-251.53840199 0-455.48663077 203.89126651-455.48663077 455.48928069 0 251.59536428 203.94822877 455.48928069 455.48663077 455.4892807 251.54370054 0 455.49457923-203.89391641 455.49457923-455.4892807C960.58573808 259.06535562 756.63485939 55.17408783 505.09248446 55.17408783zM204.17422818 359.37099918c0-16.23298434 16.12965689-24.52036464 16.1296569-24.52036463s168.58114803-119.54571731 172.19892811-122.04676786c0 0 8.17080581-5.77970561 16.73107478-3.89199566 10.18038879 2.22551065 9.90220028 7.34021324 9.90220026 7.34021325l0 97.6919928 164.24537431 0c134.89247243 0 137.11400884 154.85318717 137.11400884 154.85318714 0-49.26460412-132.83387436-67.0580961-132.83387436-67.05809609l-168.52551009 0 0 91.40757262c0 0 0.10862599 7.34021324-10.01215057 9.45312363-9.28223683 2.0029601-20.29321819-1.99766156-20.29321821-1.99766155l-173.25472117-118.87806438C215.57599959 381.72281413 204.17422818 375.2158434 204.17422818 359.37099918zM789.83074315 686.64169077c0 0-168.75071055 119.65566893-172.36186649 122.21368173-1.61481999 1.11408093-6.11883061 4.78087483-13.34379369 3.89464429-10.8467174-1.44790739-12.62050281-7.45413779-12.62050281-7.45413779l0-97.63635483-165.08259105 0c-135.05673638 0-137.28489694-155.01877673-137.28489694-155.01877672 0 49.26460412 133.00343686 67.11240974 133.00343685 67.11240973l169.36404984 0 0-91.46321057c0 0 0.49809043-6.11883061 12.6205028-9.28753537 9.78695012-2.61100214 17.01191319 1.77908395 17.0119132 1.77908395l173.36997004 118.9880147c0 0 11.44945959 6.50829504 11.4494596 22.40745292C805.95510147 678.41524828 789.83074315 686.64169077 789.83074315 686.64169077z" p-id="764"></path></svg>',
        airSvg: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1513314660348" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="776" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M882.19306667 684.68906667l0-67.8656-305.48479999-203.648-1e-8-237.568c0 0 0-67.8656-67.8656-67.8656-67.8912 0-67.8912 67.8656-67.8912 67.8656l-1e-8 237.568L135.49226667 616.82346667l0 67.8656 305.45919999-101.8368 1e-8 190.10560001-101.8112 81.45919999 0 67.8656 169.7024-67.86560001 169.7024 67.86560001 0-67.8656-101.83680001-81.4592 2e-8-190.1056L882.19306667 684.68906667z" p-id="777"></path></svg>'
      }
    },
    mounted () {
      const width = this.$el.clientWidth
      const height = width * 2 / 3 // 长宽比  3:2
      // 初始化画布实例
      this.zr = zrender.init(this.$el, {renderer: 'svg', width, height})
      // 初始化地图投影的工具类
      utils.init(china, width, height)
      // 画中国地图
      utils.drawChinaMap(zrender, this.zr, {fill: this.map.fill, stroke: this.map.stroke})

      // 将经纬度转为画布上的坐标
      this.airPortLocations.forEach((a, index) => a.location = utils.convert(a.location.map(n => Number(n))))
      // 画航线
      this.airPortLocations.forEach((a, index, arr) => {
        const p = a.location
        // 画机场的点 // 中转机场画中转图标
        if (index === 0 || index === arr.length - 1) {
          this.zr.add(new zrender.Circle({
            shape: {
              cx: p[0],
              cy: p[1],
              r: this.dot.r
            },
            style: {
              fill: this.dot.fill,
              text: a.city,
              fontSize: 12,
              textPosition: 'right',
              shadowColor: this.dot.fill,
              shadowBlur: this.dot.shadowBlur
            },
            z: this.dot.z
          }))
        } else {
          const zzIcon = zrender.path.createFromString(this.zzSvg, {
            style: {
              fill: this.dot.fill,
              text: a.city,
              fontSize: 12,
              textPosition: 'right'
            },
            z: this.dot.z})
          // 缩放
          const size = this.dot.r * 2
          zzIcon.attr('scale', [size / 1024, size / 1024])
          zzIcon.attr('position', [p[0] - size / 2 , p[1] - size / 2])
          this.zr.add(zzIcon)
        }
        // 每2点间画线
        if (index < arr.length - 1) {
          const p2 = arr[index + 1].location
          this.zr.add(new zrender.Line({
            shape: {
              x1: p[0],
              y1: p[1],
              x2: p2[0],
              y2: p2[1]
            },
            style: {
              stroke:  this.line.stroke
            },
            z: this.line.z
          }))
          // 画飞机图标
          // 通过svg图新建一个path
          const air = zrender.path.createFromString(this.airSvg, {style: {fill: this.icon.fill}, z: this.icon.z})
          // 缩放
          air.attr('scale', [this.icon.size / 1024, this.icon.size / 1024])
          // 航线角度
          const angle = utils.angle(p, p2, 90)
          // 根据航线方向旋转图标，让飞机头始终向着航向方向
          air.attr('rotation', Math.PI/180 * (angle))
          // 计算偏移
          let out = zrender.matrix.create()
          zrender.matrix.rotate(out, [this.icon.size / 2, this.icon.size / 2], Math.PI/180 * (angle))
          // 计算图标的起点和终点
          const startPoint = [p[0] - this.icon.size / 2 + (this.icon.size / 2 - out[0]), p[1] - this.icon.size / 2 + (this.icon.size / 2 - out[1])]
          const endPoint = [p2[0] - this.icon.size / 2 + (this.icon.size / 2 - out[0]), p2[1] - this.icon.size / 2 + (this.icon.size / 2 - out[1])]
          // air.attr('position', [startPoint , endPoint])
          // 动画效果
          const long = this.time + this.timeStop * 2 // 一个航段的动画时长
          // 移动动画
          air.animate('position', true)
            .when(0, startPoint)
            .when(long * index, startPoint)
            .when(this.timeStop + long * index, startPoint)
            .when(this.timeStop + this.time + long * index, endPoint)
            .when(long * (arr.length - 1), endPoint)
            .start()
          // 透明度动画，不飞行的飞机隐藏
          air.animate('style', true)
            .when(0, {opacity: 0})
            .when(long * index, {opacity: 0})
            .when(this.timeStop + long * index, {opacity: 1})
            .when(this.timeStop + this.time + long * index, {opacity: 1})
            .when(this.timeStop * 2 + this.time + long * index, {opacity: 0})
            .when(long * (arr.length - 1), {opacity: 0})
            .start()
          // 画svg图
          this.zr.add(air)
        }
      })
    },
    destroyed () {
      // 销毁地图
      this.zr && zrender.dispose(this.zr)
    },
    methods: {}
  }
</script>

<style scoped>
  .air-line-map{
    width: 100%;
  }
</style>
