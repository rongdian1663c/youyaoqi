import api from "../../http/api.js"

Page({
  data: {
    imgUrls: [],
    imgComics: [],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 1000, //滑动动画时长
    inputShowed: false,
    inputVal: ""


  },


  click: function (event) {
    wx.navigateTo({
      url: '/pages/particulars/particulars?comic=' + JSON.stringify(event.currentTarget.dataset.comic), 
    })
  },




  /**正在加載中 */
  onLoad: function() {
    api.getDetectList()
      .then((res) => {
        
        res.comicLists.map((item)=>{
          item.comics.map((item,index)=>{
            if (item.cover.includes('ubig') && index == 0){
              console.log("cover:  "+item.cover)
              item.ubig = true
            }else{
              item.ubig = false
            }
          })
        })
        this.setData({
          imgUrls: res.galleryItems,
          imgComics: res.comicLists
        })
        
      })
      .catch()
  }

})

