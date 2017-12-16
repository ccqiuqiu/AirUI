<!--Created by 熊超超 on 2017/12/13.-->
<template>
  <div class="air-line-map">
  </div>
</template>

<script>
  import zrender from 'zrender'
  import * as utils from './utils'
  import china from './china'
  export default {
    name: 'AirLineMap',
    data() {
      return {
        zr: null, // 画布实例
        airSize: 20,
        airSvg: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1513314660348" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="776" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M882.19306667 684.68906667l0-67.8656-305.48479999-203.648-1e-8-237.568c0 0 0-67.8656-67.8656-67.8656-67.8912 0-67.8912 67.8656-67.8912 67.8656l-1e-8 237.568L135.49226667 616.82346667l0 67.8656 305.45919999-101.8368 1e-8 190.10560001-101.8112 81.45919999 0 67.8656 169.7024-67.86560001 169.7024 67.86560001 0-67.8656-101.83680001-81.4592 2e-8-190.1056L882.19306667 684.68906667z" p-id="777"></path></svg>'
        // airSvg: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1513328744234" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="676" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M904.69257885 224.02103723l-62.12259509-62.12259511-466.04834833 93.21904313-217.46423335-217.46423334c0 0-62.1225951-62.1225951-124.2451902 0-62.14602875 62.14602875-0.02343365 124.26862385-0.02343366 124.26862386l217.46423334 217.46423335L159.05740208 845.4110238l62.12259511 62.12259508 186.39121894-372.82930519 174.01825397 174.01825395-18.62974843 167.76147053 62.12259509 62.1225951 93.21904313-217.46423334 217.46423333-93.21904312-62.12259509-62.1225951-167.78490419 18.65318209-174.01825393-174.01825397L904.69257885 224.02103723z" p-id="677"></path></svg>'
      }
    },
    mounted () {
      const width = this.$el.clientWidth
      const height = width * 2 / 3 // 长宽比  3:2
      // 初始化画布实例
      this.zr = zrender.init(this.$el, {renderer: 'svg', width, height})
      // 初始化地图投影的工具类
      utils.init(china, width, height)

      // 将经纬度转为画布上的坐标
      // const lineArr = utils.converts([[112.2363, 31.1572],[111.5332, 27.3779]])
      const lineArr = [[100, 100], [50, 50]]
      // 新建一条线
      const line = new zrender.Line({
        shape: {
          x1: lineArr[0][0],
          y1: lineArr[0][1],
          x2: lineArr[1][0],
          y2: lineArr[1][1]
        }
      })
      // line.attr('position', [100, 100]) // 位移
      // 将线添加到画布
      this.zr.add(line)
      // 通过svg图新建一个path
      const air = zrender.path.createFromString(this.airSvg, {style: {fill: '#F00'}})
      // 将图标定位到航线起点，并往终点移动
      const startPoint = [lineArr[0][0] + this.airSize / 2, lineArr[0][1] + this.airSize / 2]
      const endPoint = [lineArr[1][0] + this.airSize / 2, lineArr[1][1] + this.airSize / 2]
      const angle = utils.angle(startPoint, endPoint)
      console.log(angle)
      air.attr('scale', [this.airSize / 1024, this.airSize / 1024])
      air.attr('rotation', Math.PI/180 * (-45-180))
      this.zr.add(air)

      // air.attr('position', [startPoint[0] - this.airSize / 2 , startPoint[1] - this.airSize / 2])
      // air.origin = startPoint
      // air.attr('rotation', Math.PI/180 * (0))
      // 动画效果
      air.animate('position', true)
        .when(0, startPoint)
        .when(2000, endPoint)
        .when(5000, endPoint)
        .when(5000, startPoint)
        .start()
      // 画svg图
      this.zr.add(air)


      this.zr.add(new zrender.Rect({
        shape: {
          x: 0,
          y: 0,
          width: 100,
          height: 200
        }
      }))

      this.zr.add(new zrender.Rect({
        shape: {
          x: 0,
          y: 0,
          width: 100,
          height: 200
        },
        rotation: Math.PI/180 * (45)
      }))
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
