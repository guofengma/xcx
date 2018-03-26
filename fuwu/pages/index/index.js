
const APP_ID = 'wx9352f3b75707fdca';//输入小程序appid  
const APP_SECRET = 'f9fd6a92602863fc12b53165b4ff8883';//输入小程序app_secret  
var OPEN_ID = ''//储存获取到openid  
var SESSION_KEY = ''//储存获取到session_key  

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '开始发送',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  //事件处理函数
  sendmsg: function () {
    wx.navigateTo({
      url: '../send/send'
    })
  },

  onLoad: function () {

    var uid = wx.getStorageSync('uid');
    if(uid == "" || uid.length > 20){
        //如果存储为空，或者长度大于20，不可能大于20
        this.getuid();
        uid = wx.getStorageSync('uid');
    }

    console.log(uid);

    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo);
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        //console.log(res);
        // console.log(res.encryptedData);
        // console.log(res.iv);
        //不调用了，用其他方法
        //this.getunionid(res.encryptedData, res.iv);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


  },
  
  getUserInfo: function(e) {
     //console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  getuid: function () {
    var that = this;
   
    wx.login({
      success: function (res) {
       // console.log(res.code);
        wx.request({
          url: 'https://oa.yudw.com/index.php?m=lang&c=index&a=getuid',
          data: {
            appid: APP_ID,
            secret: APP_SECRET,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: function (res) {
            var uid = res.data;
            //console.log(uid)
            wx.setStorageSync('uid', uid);
          }
        })
      }
    })
  },


})
