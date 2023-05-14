
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
  getKey(e) {

    this.setData({
      key: e.detail.value
    })
  },
  goDetail(e: any) {
    console.log("输出", e.currentTarget.dataset.id);
    wx.navigateTo({
      url: "../detail/detail?id=" + e.currentTarget.dataset.id
    })
  },
  goSearch() {
    let key = this.data.key
    console.log(key);

    if (this.data.key) {
      wx.cloud.database().collection("category").
        where({
          title: wx.cloud.database().RegExp({
            regexp: key,//要搜索的词
            options: 'i',
          })
        }).get().then(res => {
          console.log("ok", res);
          this.setData({
            list: res.data
          })
        }).catch(err => {
          console.log("wrong");

        })

    } else {
      wx.showToast({
        icon: 'error',
        title: "输入为空"
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(opts): WechatMiniprogram.Page.ICustomShareContent {
    console.log(opts.target)
    return {}
  }
})