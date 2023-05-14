var app = getApp()
Page({

  data: {

  },


  onLoad() {
    this.setData({
      userinfo:app.globalData.userInfo,
      status:app.globalData.status
    })
  },

  userlogin(e:any) {  //用户登录
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认以用户身份登录吗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.getUserProfile({
            desc: "用于信息完善",
            success(res) {
              var user = res.userInfo //user是自己的信息
              app.globalData.userInfo = user //globalData里面的userinfo
              app.globalData.status = e.currentTarget.dataset.status
              console.log(app.globalData.status);
              
              that.setData({
                userinfo: user ,//userinfo在前端用
                status:e.currentTarget.dataset.status
              })
              wx.cloud.database().collection("user").where({
                _openid:app.globalData.openid
              }).get().then(res=>{
                if(res.data.length==0){
                  {
                    wx.cloud.database().collection("user").add({
                      data: {
                        avatarUrl: user.avatarUrl,
                        nickname: user.nickName
                      }
                    }).then(res => {
                      wx.showToast({
                        icon: "success",
                        title: "登录成功"
            
                      })
                    })
                  }
                }
                else{
                  that.setData({
                    userinfo:app.globalData.userInfo[0]
                  })
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   
  },
  spotlogin(e:any) {  //景区管理员登录
    console.log(e.currentTarget.dataset.status);
    
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认以用户身份登录吗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.getUserProfile({
            desc: "用于信息完善",
            success(res) {
              console.log(res.userInfo);
              var user = res.userInfo //user是自己的信息
              app.globalData.userInfo = user //globalData里面的userinfo
              app.globalData.status = e.currentTarget.dataset.status
              console.log("啦啦啦",app.globalData.userInfo);
              console.log(user);
              that.setData({
                userinfo: user ,//userinfo在前端用
                status:e.currentTarget.dataset.status
              })
              wx.cloud.database().collection("spotadmin").where({
                _openid:app.globalData.openid
              }).get().then(res=>{
                console.log(res.data.length);
                if(res.data.length==0){
                  {
                    wx.cloud.database().collection("spotadmin").add({
                      data: {
                        avatarUrl: user.avatarUrl,
                        nickname: user.nickName
                      }
                    }).then(res => {
                      wx.showToast({
                        icon: "success",
                        title: "登录成功"
            
                      })
                    })
                  }
                }
                else{
                  that.setData({
                    userinfo:app.globalData.userInfo[0]
                  })
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   
  },
  exlogin(e:any) {  //体验馆管理员登录
    console.log(e.currentTarget.dataset.status);
    
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认以体验馆管理员身份登录吗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.getUserProfile({
            desc: "用于信息完善",
            success(res) {
              console.log(res.userInfo);
              var user = res.userInfo //user是自己的信息
              app.globalData.userInfo = user //globalData里面的userinfo
              app.globalData.status = e.currentTarget.dataset.status
              console.log("啦啦啦",app.globalData.userInfo);
              console.log(user);
              that.setData({
                userinfo: user ,//userinfo在前端用
                status:e.currentTarget.dataset.status
              })
              wx.cloud.database().collection("exadmin").where({
                _openid:app.globalData.openid
              }).get().then(res=>{
                console.log(res.data.length);
                if(res.data.length==0){
                  {
                    wx.cloud.database().collection("exadmin").add({
                      data: {
                        avatarUrl: user.avatarUrl,
                        nickname: user.nickName
                      }
                    }).then(res => {
                      wx.showToast({
                        icon: "success",
                        title: "登录成功"
            
                      })
                    })
                  }
                }
                else{
                  that.setData({
                    userinfo:app.globalData.userInfo[0]
                  })
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   
  },

  gotomycategory(){
    wx.redirectTo({
      url:"../mycategory/mycategory"
    })
  },
  gotomyex(){
    wx.redirectTo({
      url:"../myexperience/myexperience"
    })
  },
  gotomyspot(){
    wx.redirectTo({
      url:"../myspot/myspot"
    })
  },
  gotospotticket(){
    wx.redirectTo({
      url:"../spotticket/spotticket"
    })
  },
  gotoexticket(){
    wx.redirectTo({
      url:"../exticket/exticket"
    })
  },
  logout(){
    app.globalData.userInfo = null
    app.globalData.status = null
    console.log(app.globalData.userInfo);
    this.setData({
      userinfo:null
      
    })

    
  }
})