// pages/detail/detail.ts
let newtitle = ''
var id = ''
let db = wx.cloud.database().collection("spot")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: {},
    list:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */


  getlist(){
    wx.cloud.database().collection("experience").where({
      spotid:id
    }).get().then(res=>{
      console.log(res.data);
      this.setData({
        list:res.data
      })
    })
  },
  onLoad(options) {
    console.log("携带的值", options.id);
    id = options.id

    this.getlist()
  },


})