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

  update(){
    wx.navigateTo({
      url:"../updatespot/updatespot?id="+id
    })
  },
  delete(){
    wx.showModal({
      title: '提示',
      content: '确定删除?',
      success (res) {
        if (res.confirm) {
          wx.cloud.database().collection("spot").doc(id).remove()
          .then(res=>{
            wx.switchTab({
              url:"../user/user"
            })
            
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
 
  }
})