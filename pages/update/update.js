import api from "../../http/api.js"

var app = getApp();
Page({
  data: {
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    imgUrls: [],
    tabs: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    page: 1,
    isLoadingComplete: false,
    isLoading: false
  },

  // 滚动切换标签样式
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current,
      page: 1,
      isLoadingComplete: false,
      isLoading: false
    });
    this.checkCor();
    this.getData()
  },

  swichNav: function(e) {
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
  checkCor: function() {
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

  onLoad: function() {
    this.getData()
    //  高度自适应
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          winHeight: res.windowHeight * (750 / res.windowWidth)
        });
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.isLoadingComplete && !this.data.isLoading) {
      this.data.page++;
      this.setData({
        isLoading: true,
        page: this.data.page, //每次触发上拉事件，把pageNum+1
      });
      this.getData(true);
    }
  },

  getData: function(loadmore) {
    api.getDetectUpdataList(this.data.page, this.data.currentTab)
      .then((res) => {
        var imgUrls = [];
        if (loadmore) {
          if (res) {
            imgUrls = this.data.imgUrls.concat(res.comics)
          } else {
            this.setData({
              isLoadingComplete: true
            })
            return;
          }
        } else {
          imgUrls = res.comics
        }
        imgUrls.map((res)=>{
          res.cover = res.cover.replace("webp", "jpg")  //webp图片在ios不展示
        })
        this.setData({
          imgUrls: imgUrls,
          isLoading: false,
        })
      })
  }
})