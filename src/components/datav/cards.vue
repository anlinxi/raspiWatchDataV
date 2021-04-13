<template>
  <div id="cards">
    <div
      class="card-item"
      v-for="(card, i) in cards"
      :key="card.title"
    >
      <div class="card-header">
        <div class="card-header-left">{{ card.title }}</div>
        <div class="card-header-right">{{ '0' + (i + 1) }}</div>
      </div>
      <dv-charts class="ring-charts" :option="card.ring"/>
      <div class="card-footer">
        <div class="card-footer-item">
          <div class="footer-title">{{ card.total.name }}</div>
          <div class="footer-detail">
            <dv-digital-flop :config="card.total" style="width:70%;height:35px;"/>
            {{ card.total.unit }}
          </div>
        </div>
        <div class="card-footer-item">
          <div class="footer-title">{{ card.num.name }}</div>
          <div class="footer-detail">
            <dv-digital-flop :config="card.num" style="width:70%;height:35px;"/>
            {{ card.num.unit }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cards',
  data () {
    return {
      cards: []
    }
  },
  props: {
    // 树莓派信息
    raspiInfo: {
      type: Object
    }
  },
  /**
   * 监听
   */
  watch: {
    raspiInfo: {
      // 深度监听，可监听到对象、数组的变化
      handler (val, oldVal) {
        // console.log('raspiInfo', val)
        this.loadData(val)
      },
      // true 深度监听
      deep: true
    }
  },
  methods: {
    createData () {
      const { randomExtend } = this

      // this.cards = new Array(5).fill(0).map((foo, i) => ({
      //   title: '占用情况' + (i + i),
      //   total: {
      //     number: [randomExtend(9000, 10000)],
      //     content: '{nt}',
      //     textAlign: 'right',
      //     style: {
      //       fill: '#ea6027',
      //       fontWeight: 'bold'
      //     },
      //     unit: '元'
      //   },
      //   num: {
      //     number: [randomExtend(30, 60)],
      //     content: '{nt}',
      //     textAlign: 'right',
      //     style: {
      //       fill: '#26fcd8',
      //       fontWeight: 'bold'
      //     },
      //     unit: '处'
      //   },
      //   ring: {
      //     series: [
      //       {
      //         type: 'gauge',
      //         startAngle: -Math.PI / 2,
      //         endAngle: Math.PI * 1.5,
      //         arcLineWidth: 13,
      //         radius: '80%',
      //         data: [
      //           { name: '使用情况', value: randomExtend(40, 60) }
      //         ],
      //         axisLabel: {
      //           show: false
      //         },
      //         axisTick: {
      //           show: false
      //         },
      //         pointer: {
      //           show: false
      //         },
      //         backgroundArc: {
      //           style: {
      //             stroke: '#224590'
      //           }
      //         },
      //         details: {
      //           show: true,
      //           formatter: '使用情况{value}%',
      //           style: {
      //             fill: '#1ed3e5',
      //             fontSize: 20
      //           }
      //         }
      //       }
      //     ],
      //     color: ['#03d3ec']
      //   }
      // }))
    },
    /**
     * 加载数据
     * @param val
     */
    loadData (val) {
      let arr = []
      // 获取cpu使用情况图标
      arr.push(this.getCpuInfo(val))
      // todo 获取内存使用情况图标
      arr.push(this.getMemoryInfo(val))
      // todo 获取硬盘使用情况图标
      arr.push(this.getCpuInfo(val))
      // todo 获取缓存使用情况图标
      arr.push(this.getCpuInfo(val))
      // todo 获取温度使用情况图标
      arr.push(this.getTempInfo(val))
      this.cards = arr
    },
    /**
     * 获取温度使用情况图标
     */
    getTempInfo (val) {
      // 当前温度
      var temp = val.temperature.replace('℃', '')
      temp = parseFloat(temp)
      // 最大温度
      let maxTemperature = localStorage.raspiMaxTemperature
      if (maxTemperature == null || maxTemperature === undefined || maxTemperature === '') {
        maxTemperature = temp
        localStorage.raspiMaxTemperature = maxTemperature
      }
      maxTemperature = parseFloat(maxTemperature)
      if (maxTemperature < temp) {
        localStorage.raspiMaxTemperature = temp
      }
      return this.createOneCard({
        title: '当前温度',
        toFixed: 1,
        total: {
          name: '历史最高温度',
          value: maxTemperature,
          unit: '℃'
        },
        num: {
          name: '当前温度',
          value: temp,
          unit: '℃'
        },
        ring: {
          name: '温度 ',
          value: temp / maxTemperature * 100
        }
      })
    },
    /**
     * 内存使用率
     */
    getMemoryInfo (val) {
      // cpu当前频率
      let memUseInfo = val.memUseInfoList[0]
      let total = parseInt(memUseInfo.total.replace('MB', '')) / 1024
      // cpu占用百分比
      let used = parseInt(memUseInfo.used.replace('MB', '')) / 1024
      return this.createOneCard({
        title: '内存使用率',
        toFixed: 1,
        total: {
          name: '总容量',
          value: total,
          unit: 'GB'
        },
        num: {
          name: '当前使用',
          value: used,
          unit: 'GB'
        },
        ring: {
          name: '使用率 ',
          value: used / total * 100
        }
      })
    },
    /**
     * 获取cpu使用情况图标
     */
    getCpuInfo (val) {
      // cpu当前频率
      let armFreq = parseInt(val.cpuInfo.armFreq)
      armFreq = armFreq / 1000
      // cpu占用百分比
      let cpuUseInfo = val.cpuUseInfo.replace('%', '')
      cpuUseInfo = parseFloat(cpuUseInfo)
      return this.createOneCard({
        title: '处理器使用率',
        toFixed: 1,
        total: {
          name: '总频率',
          value: armFreq,
          unit: 'Ghz'
        },
        num: {
          name: '当前频率',
          value: armFreq * cpuUseInfo / 100,
          unit: 'Ghz'
        },
        ring: {
          name: '使用率 ',
          value: cpuUseInfo
        }
      })
    },
    /**
     * 创建一个面板
     * @param data
     * @returns {{total: {number: [*], unit: *, textAlign: string, style: {fill: string, fontWeight: string}, content: string}, ring: {color: [string], series: [{axisLabel: {show: boolean}, pointer: {show: boolean}, startAngle, data: [{name: *, value: *}], backgroundArc: {style: {stroke: string}}, endAngle, axisTick: {show: boolean}, details: {formatter: string, show: boolean, style: {fontSize: number, fill: string}}, type: string, arcLineWidth: number, radius: string}]}, num: {number: [*], unit: (string), textAlign: string, style: {fill: string, fontWeight: string}, content: string}, title: *}}
     */
    createOneCard (data) {
      let card = {
        title: data.title,
        total: {
          name: data.total.name,
          number: [data.total.value],
          content: '{nt}',
          toFixed: data.toFixed,
          textAlign: 'right',
          style: {
            fill: '#ea6027',
            fontWeight: 'bold'
          },
          unit: data.total.unit
        },
        num: {
          name: data.num.name,
          number: [data.num.value],
          content: '{nt}',
          toFixed: data.toFixed,
          textAlign: 'right',
          style: {
            fill: '#26fcd8',
            fontWeight: 'bold'
          },
          unit: data.num.unit
        },
        ring: {
          series: [
            {
              type: 'gauge',
              startAngle: -Math.PI / 2,
              endAngle: Math.PI * 1.5,
              arcLineWidth: 13,
              radius: '80%',
              data: [
                { name: data.ring.name, value: data.ring.value }
              ],
              axisLabel: {
                show: false
              },
              axisTick: {
                show: false
              },
              pointer: {
                show: false
              },
              backgroundArc: {
                style: {
                  stroke: '#224590'
                }
              },
              details: {
                show: true,
                formatter: data.ring.name + '{value}%',
                style: {
                  fill: '#1ed3e5',
                  fontSize: 20
                }
              }
            }
          ],
          color: ['#03d3ec']
        }
      }
      return card
    },
    randomExtend (minNum, maxNum) {
      if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10)
      } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      }
    }
  },
  mounted () {
    const { createData } = this

    createData()

    setInterval(this.createData, 30000)
  }
}
</script>

<style lang="less">
  #cards {
    display: flex;
    justify-content: space-between;
    height: 45%;

    .card-item {
      background-color: rgba(6, 30, 93, 0.5);
      border-top: 2px solid rgba(1, 153, 209, .5);
      width: 19%;
      display: flex;
      flex-direction: column;
    }

    .card-header {
      display: flex;
      height: 20%;
      align-items: center;
      justify-content: space-between;

      .card-header-left {
        font-size: 18px;
        font-weight: bold;
        padding-left: 20px;
      }

      .card-header-right {
        padding-right: 20px;
        font-size: 40px;
        color: #03d3ec;
      }
    }

    .ring-charts {
      height: 55%;
    }

    .card-footer {
      height: 25%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    .card-footer-item {
      padding: 5px 10px 0px 10px;
      box-sizing: border-box;
      width: 40%;
      background-color: rgba(6, 30, 93, 0.7);
      border-radius: 3px;

      .footer-title {
        font-size: 15px;
        margin-bottom: 5px;
      }

      .footer-detail {
        font-size: 20px;
        color: #1294fb;
        display: flex;
        font-size: 18px;
        align-items: center;

        .dv-digital-flop {
          margin-right: 5px;
        }
      }
    }
  }
</style>
