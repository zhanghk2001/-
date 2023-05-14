App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch() {
    wx.cloud.init({
      env: "cloud1-4gqcbjem93996e48"
    })
    var that = this
    wx.login({
      success: res => {
        let code = res.code
        wx.request({
          url: "https://api.weixin.qq.com/sns/jscode2session",
          method: "GET",
          data: {
            appid: "wxc6eff772d467cf03",
            js_code: code,
            grant_type: "authorization_code",
            secret: "a576d4048e9cbbb179d2fd18dc1d53e7"
          },
          success: res => {
            that.globalData.openid = res.data.openid
            console.log("openid为",that.globalData.openid);
            console.log("status为",that.globalData.status);
            
            wx.cloud.database().collection("user").where({
              _openid: res.data.openid
            }).get()
              .then(res => {
                console.log(res);
                that.globalData.userInfo =res.data[0]
              })
          },
          fail: err => {
            console.log("失败", err);

          }
        })
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow(opts) {

  },
  globalData() {
    userInfo: null
    openid: null
    status:null
  },
  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide() {
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError(msg) {
    console.error(msg)
  },
})
