Page({
  data: {
    list: []
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://oa.yudw.com/vr/index.php?m=home&c=api&a=vrlist',
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