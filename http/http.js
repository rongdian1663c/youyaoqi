const Fly = require("../utils/wx.umd.min")
const fly = new Fly
var isShowLoading = false //是否加载loading
var isShowToast = false //是否显示toast
var loadingType = 1 //loading类型

//http://app.u17.com/v3/appV3_3/ios/phone/comic/getDetectList
fly.config.timeout = 20000;
fly.config.baseURL = "http://app.u17.com";
fly.config.headers = {
  "content-type": "application/json",
  "Accept-Language": "zh_CN", //zh_CN/en_US
}

fly.interceptors.request.use((request) => {
  if (isShowLoading) {
    if (loadingType == 1) {
      wx.showLoading({
        title: "加载中",
        mask: true,
      });
    } else {
      wx.showNavigationBarLoading()
    }
  }
  console.log('request', request)
  return request;
})

fly.interceptors.response.use(
  (response) => {
    return resolveResponse(response)
  },
  (err) => {
    return resolveHttpErr(err)
  })

function resolveHttpErr(err) {
  console.log('response', err)
  wx.hideLoading();
  wx.hideNavigationBarLoading()
  if (err.status == 0) {
    return showErrToast("网络连接异常", err.status)
  } else if (err.status == 1) {
    return showErrToast("网络连接超时", err.status)
  } else {
    return showErrToast("请求数据失败,请稍后再试", err.status)
  };
}

function resolveResponse(response) {
  console.log('response', response)
  wx.hideLoading();
  wx.hideNavigationBarLoading()
  return new Promise((resolve, reject) => {
    //返回resolve,你将在then方法中看到的数据
    if (response.data.code == 1) {
      resolve(response.data.data.returnData)
    } else if (response.data.code == 2) {
      reject(showErrToast("服务器错误", response.data.code))
    } else {
      reject(showErrToast(response.data.message || "服务器错误", response.data.code))
    }
  });
}

function showErrToast(msg, code) {
  if (isShowToast) {
    wx.showToast({
      title: msg,
      icon: 'none',
    })
  }
  return errResponse(msg, code)
}

/**所有错误,异常必须返回{code:1,msg:"错误"}的格式,上层好捕获code和msg */
function errResponse(msg, code) {
  return {
    msg: msg,
    code: code
  }
}

function get(data) {
  resolveParams(data)
  return fly.get(data.url, data.params)
}

function post(data) {
  resolveParams(data)
  return fly.post(data.url, data.params)
}

/**
 * data:{
 * url:path路径
 * params:请求参数
 * showLoading:是否显示loading  
 * showToast:是否显示toast
 * base_url:baseUrl,用于切换其他域名
 * loadingType:1.toast形式loading;2.导航栏显示loading
 * }
 */
function resolveParams(data) {
  isShowLoading = typeof data.showLoading == 'undefined' ? true : data.showLoading
  isShowToast = typeof data.showToast == 'undefined' ? true : data.showLoading
  loadingType = data.loadingType || 1
}

module.exports = {
  get,
  post
}