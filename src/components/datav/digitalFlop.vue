<template>
  <div id="digital-flop">
    <div
      class="digital-flop-item"
      v-for="item in digitalFlopData"
      :key="item.title"
    >
      <div class="digital-flop-title">{{ item.title }}</div>
      <div class="digital-flop">
        <dv-digital-flop
          :config="item.number"
          style="width:100%;height:50px;"
        />
          <div class="unit">{{ item.unit }}</div>
      </div>
    </div>

    <dv-decoration-10 />
  </div>
</template>

<script>
export default {
  name: 'DigitalFlop',
  data () {
    return {
      digitalFlopData: []
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
      // const { randomExtend } = this
      let now = this.getDate('time')
      this.digitalFlopData = [
        {
          title: this.$i18n.t('digitalFlop.digitalFlopData.startTime'),
          number: {
            number: [0],
            content: '{nt}',
            textAlign: 'right',
            style: {
              fill: '#4d99fc',
              fontWeight: 'bold'
            }
          },
          unit: '小时'
        },
        {
          title: this.$i18n.t('digitalFlop.digitalFlopData.now'),
          number: {
            content: now,
            textAlign: 'right',
            style: {
              fill: '#40faee',
              fontWeight: 'bold'
            }
          },
          unit: ''
        },
        {
          title: this.$i18n.t('digitalFlop.digitalFlopData.hardware'),
          number: {
            content: 'BCM2835',
            textAlign: 'right',
            style: {
              fill: '#f46827',
              fontWeight: 'bold'
            }
          }
        },
        {
          title: this.$i18n.t('digitalFlop.digitalFlopData.implementer'),
          number: {
            content: '0x41',
            textAlign: 'right',
            style: {
              fill: '#40faee',
              fontWeight: 'bold'
            }
          },
          unit: ''
        },
        {
          title: this.$i18n.t('digitalFlop.digitalFlopData.part'),
          number: {
            content: '0xd08',
            textAlign: 'right',
            style: {
              fill: '#4d99fc',
              fontWeight: 'bold'
            }
          }
        },
        {
          title: this.$i18n.t('digitalFlop.digitalFlopData.revision2'),
          number: {
            content: 'c03112',
            textAlign: 'right',
            style: {
              fill: '#f46827',
              fontWeight: 'bold'
            }
          }
        },
        {
          title: this.$i18n.t('digitalFlop.digitalFlopData.totalMem'),
          number: {
            content: '3886',
            textAlign: 'right',
            style: {
              fill: '#40faee',
              fontWeight: 'bold'
            }
          },
          unit: 'MB'
        },
        {
          title: this.$i18n.t('digitalFlop.digitalFlopData.diskCapacity'),
          number: {
            content: '59',
            textAlign: 'right',
            style: {
              fill: '#4d99fc',
              fontWeight: 'bold'
            }
          },
          unit: 'GB'
        }
      ]
    },
    loadData (raspiInfo) {
      if (raspiInfo) {
        // const { randomExtend } = this
        let now = this.getDate('time')
        // 单位为秒
        let startTime = raspiInfo.sysStartTime
        startTime = startTime / 60 / 60
        this.digitalFlopData = [
          {
            title: this.$i18n.t('digitalFlop.digitalFlopData.startTime'),
            number: {
              number: [startTime],
              content: '{nt}',
              toFixed: 2,
              textAlign: 'right',
              style: {
                fill: '#4d99fc',
                fontWeight: 'bold'
              }
            },
            unit: '小时'
          },
          {
            title: this.$i18n.t('digitalFlop.digitalFlopData.now'),
            number: {
              content: now,
              textAlign: 'right',
              style: {
                fill: '#40faee',
                fontWeight: 'bold'
              }
            },
            unit: ''
          },
          {
            title: this.$i18n.t('digitalFlop.digitalFlopData.hardware'),
            number: {
              content: raspiInfo.cpuInfo.hardware,
              textAlign: 'right',
              style: {
                fill: '#f46827',
                fontWeight: 'bold'
              }
            }
          },
          {
            title: this.$i18n.t('digitalFlop.digitalFlopData.implementer'),
            number: {
              content: raspiInfo.cpuInfo.implementer,
              textAlign: 'right',
              style: {
                fill: '#40faee',
                fontWeight: 'bold'
              }
            },
            unit: ''
          },
          {
            title: this.$i18n.t('digitalFlop.digitalFlopData.part'),
            number: {
              content: raspiInfo.cpuInfo.part,
              textAlign: 'right',
              style: {
                fill: '#4d99fc',
                fontWeight: 'bold'
              }
            }
          },
          {
            title: this.$i18n.t('digitalFlop.digitalFlopData.revision2'),
            number: {
              content: raspiInfo.cpuInfo.revision2,
              textAlign: 'right',
              style: {
                fill: '#f46827',
                fontWeight: 'bold'
              }
            }
          },
          {
            title: this.$i18n.t('digitalFlop.digitalFlopData.totalMem'),
            number: {
              content: raspiInfo.memUseInfoList[0].total.replace('MB', ''),
              textAlign: 'right',
              style: {
                fill: '#40faee',
                fontWeight: 'bold'
              }
            },
            unit: 'MB'
          },
          {
            title: this.$i18n.t('digitalFlop.digitalFlopData.diskCapacity'),
            number: {
              content: raspiInfo.diskUseInfoList[0].capacity,
              textAlign: 'right',
              style: {
                fill: '#4d99fc',
                fontWeight: 'bold'
              }
            },
            unit: 'GB'
          }
        ]
      }
    },
    randomExtend (minNum, maxNum) {
      if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10)
      } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      }
    },
    /**
     * @param {Number} num 数值
     * @returns {String} 处理后的字符串
     * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
     */
    getHandledValue (num) {
      return num < 10 ? '0' + num : num
    },
    /**
     * @param {Date} time 传入的时间,默认为''
     * @param {Boolen} type 要返回的时间字符串的格式类型，传入true则返回带时分秒的完整时间
     */
    getDate (type) {
      let d = new Date()
      let year = d.getFullYear()
      let month = this.getHandledValue(d.getMonth() + 1)
      let date = this.getHandledValue(d.getDate())
      let hours = this.getHandledValue(d.getHours())
      let minutes = this.getHandledValue(d.getMinutes())
      let second = this.getHandledValue(d.getSeconds())
      let resStr = ''
      if (type === 'time') {
        resStr = hours + ':' + minutes + ':' + second
      } else if (type === 'date') {
        resStr = year + '-' + month + '-' + date
      } else {
        resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
      }
      return resStr
    }
  },
  mounted () {
    const { createData } = this

    createData()

    setInterval(createData, 30000)
  }
}
</script>

<style lang="less">
#digital-flop {
  position: relative;
  height: 15%;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(6, 30, 93, 0.5);

  .dv-decoration-10 {
    position: absolute;
    width: 95%;
    left: 2.5%;
    height: 5px;
    bottom: 0px;
  }

  .digital-flop-item {
    width: 11%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 3px solid rgb(6, 30, 93);
    border-right: 3px solid rgb(6, 30, 93);
  }

  .digital-flop-title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .digital-flop {
    display: flex;
  }

  .unit {
    margin-left: 10px;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    padding-bottom: 13px;
  }
}
</style>
