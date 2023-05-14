Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    imglist:[1,2,3,4]
  },
  //跳转到非tabBar页面  

  /**
 * 生命周期函数--监听页面加载
 */
  getlist() {
    wx.cloud.database().collection("spot").get()
      .then(res => {
        console.log("获取成功", res.data);
        wx.stopPullDownRefresh()
        this.setData({
          list: res.data
        })
      })
      .catch(res => {
        console.log("失败", res);

      })
  },

  goDetail(e: any) {
    console.log("输出", e.currentTarget.dataset.id);
    wx.navigateTo({
      url: "../spotdetail/spotdetail?id=" + e.currentTarget.dataset.id
    })
  },
  onLoad() {
    wx.startPullDownRefresh()
    this.getlist()
  },

  onPullDownRefresh() {
    this.getlist()

  },
  onReachBottom(){
    // console.log("hjaajha ");
    
  },

})