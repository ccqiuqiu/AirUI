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
    props: {
      map: {
        type: Object,
        default: () => ({
          fill: '#DDD',
          stroke: '#BBB'
        })
      },
      airPorts: {
        type: Array,
        required: true
      },
      icon: {
        type: Object,
        default: () => ({
          size: 20,
          z: 100,
          fill: '#F00'
        })
      },
      line: {
        type: Object,
        default: () => ({
          stroke: '#333',
          z: 0
        })
      },
      dot: {
        type: Object,
        default: () => ({
          fill: '#000',
          z: 10,
          r: 3
        })
      },
    },
    data() {
      return {
        zr: null, // 画布实例
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
      const lineArr = utils.converts([[114.31484, 30.717637], [114.1874,22.315144], [113.266194, 23.140093]])
      lineArr.forEach((p, index, arr) => {
        // 每个坐标位置画点
        this.zr.add(new zrender.Circle({
          shape: {
            cx: p[0],
            cy: p[1],
            r: this.dot.r
          },
          style: {
            fill: this.dot.fill
          },
          z: this.dot.z
        }))
        const p2 = arr[index + 1]
        // 每2点间画线
        if (index < arr.length - 1) {
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
          air.animate('position', true)
            .when(0, startPoint)
            .when(1000, startPoint)
            .when(5000, endPoint)
            .when(6000, endPoint)
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
