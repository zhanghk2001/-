// pages/myticket/myticket.ts
var app = getApp()
let myopenid = ""
let people = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.startPullDownRefresh()
    this.getlist()

  },

  getlist(){
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
            console.log("myopenid为", myopenid);

          },
          fail: err => {
            console.log("失败", err);

          }
        })
      }
    })
    wx.cloud.database().collection("exticket").where({
      _openid: this.data.myopenid

    }).get().then(res => {
      console.log("成功", res.data);
      this.setData({
        list: res.data
      })
    })
  },
  // gototicketdetail(e: any){
  //   console.log(e.currentTarget.dataset.id);

  // }
  clockin(e: any) {
    console.log(e.currentTarget.dataset);
    var that = this
    wx.cloud.database().collection("experience").doc(e.currentTarget.dataset.id)
      .get().then(res => {
        console.log(res.data.countpeople);
        people = res.data.countpeople
        wx.cloud.database().collection("experience").doc(e.currentTarget.dataset.id).update({
          data: {
            countpeople: people + 1
          }
        }).then(res=>{
          console.log(res);
          wx.cloud.database().collection("exticket").doc(e.currentTarget.dataset.ticketid).update({
            data: {
              isused:true
            }
          }).then(res=>{
            console.log(res);
            wx.showToast({
              icon:"success",
              title:"打卡成功"
            })
            that.getlist()
          })
        })
      })
  },
})