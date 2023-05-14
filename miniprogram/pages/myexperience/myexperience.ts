// pages/mycategory/mycategory.ts
var app = getApp()
let myopenid = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myopenid: app.globalData.openid
  },

  onLoad() {
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
          success: (res) => {
            myopenid = res.data.openid
            console.log("myopenid为",myopenid);

          },
          fail: err => {
            console.log("失败", err);

          }
        })
      }
    })

    wx.cloud.database().collection("experience").where({
       _openid:this.data.myopenid
  
    }).get().then(res=>{
      console.log("成功",res.data);
      this.setData({
        list:res.data
      })
    })
  },

  addex(){
    wx.redirectTo({
      url:"../addex/addex"
    })
  },
  gomyDetail(e: any) {
    console.log("输出", e.currentTarget.dataset.id);
    wx.navigateTo({
      url: "../myexdetail/myexdetail?id=" + e.currentTarget.dataset.id
    })
  },
})