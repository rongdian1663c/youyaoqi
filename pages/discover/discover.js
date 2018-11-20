import api from "../../http/api.js"

Page({
  data: {
    imgUrls: [],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 1000, //滑动动画时长
    inputShowed: false,
    inputVal: ""

  },

  /**正在加載中 */
  onLoad: function() {
    api.getDetectList()
      .then((res) => {
        this.setData({
          imgUrls: res.galleryItems
        })
      })
      .catch()
  }

})