// pages/addcategory/addcategory.ts
let newtitle: ''
let newlocation: ''
let newprice: ''
let newservice: ""
let newimg: ""
let spotid:""
Page({

  data: {

  },

  onLoad() {

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
    console.log(e.detail.value);

  },

  getLocation(e: { detail: { value: any } }) {
    newlocation = e.detail.value

  },
  getPrice(e: { detail: { value: any } }) {
    newprice = e.detail.value

  },

  getService(e: { detail: { value: any } }) {
    newservice = e.detail.value

  },
  addex() {
    wx.cloud.database().collection("spot").add({
      data:{
        img:newimg,
        location:newlocation,
        title:newtitle,
        location:newlocation,
        price:newprice,
        // service:newservice,
        countpeople:0,
        countincome:0,

      }
    }).then(res=>{
      console.log(res);
      wx.showToast({
        icon:"success",
        title:"添加成功"
      })
      wx.switchTab({
        url:"../user/user"
      })
    })
  }

})