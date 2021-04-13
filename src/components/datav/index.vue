<template>
  <div id="data-view">
    <dv-full-screen-container>

      <top-header />

      <div class="main-content">
        <digital-flop :raspiInfo = 'raspiInfo'/>

        <div class="block-left-right-content">
          <ranking-board />

          <div class="block-top-bottom-content">
            <div class="block-top-content">
              <rose-chart />

              <water-level-chart :raspiInfo = 'raspiInfo'/>

              <scroll-board />
            </div>

            <cards :raspiInfo = 'raspiInfo'/>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import topHeader from './topHeader'
import digitalFlop from './digitalFlop'
import rankingBoard from './rankingBoard'
import roseChart from './roseChart'
import waterLevelChart from './waterLevelChart'
import scrollBoard from './scrollBoard'
import cards from './cards'

export default {
  name: 'DataView',
  components: {
    topHeader,
    digitalFlop,
    rankingBoard,
    roseChart,
    waterLevelChart,
    scrollBoard,
    cards
  },
  data () {
    return {
      'raspiInfo': {}
    }
  },
  mounted () {
    this.CONFIG.$WebSocket = this.getNewWebSocket()
  },
  methods: {
    /**
     * 获取WebSocket链接
     */
    getNewWebSocket () {
      let _this = this
      // 判断当前浏览器是否支持WebSocket
      if ('WebSocket' in window) {
        // 连接WebSocket节点
        let _websocket = new WebSocket(this.CONFIG.$WEBSOCKET_HOST + new Date().getTime())
        // 连接发生错误的回调方法
        _websocket.onerror = function () {
          setTimeout(function () {
            this.CONFIG.$WebSocket = _this.getNewWebSocket()
          }, 5000)
        }
        // 接收到消息的回调方法
        _websocket.onmessage = function (event) {
          var data = JSON.parse(event.data)
          _this.showRaspiInfo(data)
        }
        // 连接成功建立的回调方法
        _websocket.onopen = function (event) {
          // setMessageInnerHTML("open");
        }

        // 接收到消息的回调方法
        _websocket.onmessage = function (event) {
          var data = JSON.parse(event.data)
          _this.showRaspiInfo(data)
        }

        // 连接关闭的回调方法
        _websocket.onclose = function () {
          // setMessageInnerHTML("close");
        }
        return _websocket
      } else {
        alert('Not support websocket')
      }
    },
    /**
     * 显示树莓派信息到页面上
     */
    showRaspiInfo (json) {
      console.log('树莓派当前信息', json)
      this.raspiInfo = json
    }
  }
}
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .block-left-right-content {
    flex: 1;
    display: flex;
    margin-top: 20px;
  }

  .block-top-bottom-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 20px;
  }

  .block-top-content {
    height: 55%;
    display: flex;
    flex-grow: 0;
    box-sizing: border-box;
    padding-bottom: 20px;
  }
}
</style>
