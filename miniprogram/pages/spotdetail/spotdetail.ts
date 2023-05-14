// pages/detail/detail.ts
let newtitle = ''
var id = ''
let db = wx.cloud.database().collection("spot")
let income = 0
let name = ''
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */

  getitem() {
    db.doc(id)
      .get().then(res => {
        console.log("获得到", res.data);
        this.setData({
          items: res.data
        })
      }).catch(err => {
        console.log("失败");

      })
  },
  getlist() {
    wx.cloud.database().collection("experience").where({
      spotid: id
    })
      .get().then(res => {
        console.log("获得到", res.data);
        this.setData({
          list: res.data
        })
      }).catch(err => {
        console.log("失败");

      })
  },
  onLoad(options) {
    console.log("携带的值", options.id);
    id = options.id
    this.getitem()
    this.getlist()
    // income = 0
  },
  getTicket() {
    var that = this
    if (app.globalData.status != "user") {
      wx.showModal({
        title: '提示',
        content: '请以用户身份登录',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: "../user/user"
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.cloud.database().collection("spot").doc(id).get().then(res => {
        console.log(res.data.title);
        name = res.data.title
        wx.cloud.database().collection("spotticket").add({
          data: {
            ticketid: id,
            title: name,
            isused: false
          }
        }).then(res => {
          console.log(res);

          wx.showToast({
            icon: "success",
            title: "获取成功"
          }),
            wx.redirectTo({
              url: "../spotticket/spotticket"
            })
          wx.cloud.database().collection("spot").doc(id).get()
            .then(res => {
              console.log(parseFloat(res.data.price));
              console.log(parseFloat(res.data.countincome));
              income = parseFloat(res.data.price) + parseFloat(res.data.countincome)
              console.log(income);
              wx.cloud.database().collection("spot").doc(id).update({
                data: {
                  countincome: income
                }
              }).then(res => {
                console.log(res);

              })
            })
        })
      })
    }

  },
  gotoex(e: any) {
    console.log(e.currentTarget.dataset.id);
    wx.redirectTo({
      url: "../detail/detail?id=" + e.currentTarget.dataset.id
    })
  }
})