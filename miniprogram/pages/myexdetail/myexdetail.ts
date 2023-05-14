// pages/detail/detail.ts
let newtitle = ''
var id = ''
let db = wx.cloud.database().collection("experience")
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
  onLoad(options) {
    console.log("携带的值", options.id);
    id = options.id
    this.getitem()

  },

  updatedetail() {
    db.doc(id).get().then(res=>{
      console.log("ok",res.data);

      wx.navigateTo({
        url: "../updatedetail/updatadetail?id=" + res.data._id
      })
      
    })

    
  },
  delItem() {
    console.log("删除商品");
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: "delCategory",
            data: {
              id: id
            }
          })
            .then(res => {
              console.log("删除成功", res);
              wx.navigateTo({
                url: "../myexperience/myexperience"
              })
            }).catch(res => {
              console.log("删除失败", res);

            })
          wx.showToast({
            icon: "none",
            title: "删除成功"
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

})