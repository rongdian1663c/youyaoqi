import api from "../../http/api.js"


Page({
  data: {
    comicObj: null,
    comicList: [],
    comicDetaiList: null,
    collect: null,
    comicCatalog: []
  },

  fiexdAmound: function(num) {
    let amount = num.toString();
    let list = amount.split(".");
    if (list.length === 1) {
      return amount + '.00';
    } else {
      if (list[1].length === 1) {
        return amount + "0"
      } else {
        return amount;
      }
    }
  },

  onLoad: function(options) {
    this.setData({
      comicObj: JSON.parse(options.comic)

    })

    api.getComicList(this.data.comicObj.comicId)
      .then((res) => {
        this.setData({
          comicList: res.comic,
          comicCatalog: res.chapter_list,
        })
      }),
      api.getComicDetailsList(this.data.comicObj.comicId)
      .then((res) => {
        var num = (res.comic.favorite_total) / 10000;
          this.setData({
            comicDetaiList: res.comic,
            collect: num.toFixed(2)
          })
      })

  },


  // var num : this.data.comicDetaiList.favorite_total,
  // collect: num.toFixed(2),


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})