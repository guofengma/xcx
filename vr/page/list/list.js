Page({
  data: {
    list: {}
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.title
    })
  },
  onLoad: function (options) {
    var that = this
    this.title = options.title
    wx.request({
      url: 'https://oa.yudw.com/vr/api/list.php?id=' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
         that.setData({
           list: res.data.stories
         })
         console.log(res.data)
      }
    })
  }
})
