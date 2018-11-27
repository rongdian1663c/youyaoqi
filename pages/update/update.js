import api from "../../http/api.js"

var app = getApp();
Page({
  data: {
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    imgUrls: []
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },

  // onLoad: function () {
  //   api.getDetectList()
  //     .then((res) => {
  //       this.setData({
  //         imgUrls: res.galleryItems,
  //         imgComics: res.comicLists
  //       })
  //     })
  //     .catch()
  // }
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  
  onLoad: function () {
    api.getDetectUpdataList()
      .then((res) => {
        this.setData({
          imgUrls: res.comics,
          
        })
      })
      .catch()
  },
  footerTap: app.footerTap
})