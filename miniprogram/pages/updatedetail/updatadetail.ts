// pages/updatedetail/updatadetail.ts
let newtitle: ''
let newlocation: ''
let newprice: ''
let new_id: ""
let newimg:""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e) {

    new_id = e.id


    wx.cloud.database().collection("experience").doc(e.id).get().then(res => {

      this.setData({
        items: res.data
      })
    })
  },
  addimg() {
    var that = this
    let img = null
    wx.chooseMedia({
      count: 9,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log("上传图片成功", res.tempFiles[0].tempFilePath);
        that.setData({
          img: res.tempFiles[0].tempFilePath
        })
        newimg = res.tempFiles[0].tempFilePath
        console.log(newimg);

      }
    })
  },
  getTitle(e: { detail: { value: any } }) {
    newtitle = e.detail.value
  },

  getLocation(e: { detail: { value: any } }) {
    newlocation = e.detail.value

  },
  getPrice(e: { detail: { value: any } }) {
    newprice = e.detail.value

  },

  updateCat() {

    wx.cloud.database().collection("experience").doc(new_id).update({
      data: {
        title: newtitle,
        location: newlocation,
        price: newprice,
        img:newimg
      }
    }).then(res=>{
      console.log("更新成功",res);
      wx.showToast({
        icon:"success",
        title:"更新成功"
      })
      setTimeout(
        function(){ 
          wx.navigateTo({
            url: "../myexperience/myexperience?id=" + new_id
          })
        },1500)

    }).catch(res=>{
      console.log("更新失败",res);
      
    })

  },
})