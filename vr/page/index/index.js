Page({
  data: {
    list: []
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://api.c3w.cc/vr/api/vrlist',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //console.log(res),
        that.setData({
          list: res.data
        })
      }
    })
  }
});