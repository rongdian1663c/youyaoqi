import http from '../http/http.js'
export default {
  //发现数据
  getDetectList: () => http.get({
    "url": '/v3/appV3_3/ios/phone/comic/getDetectList'
  }),
  getDetectUpdataList: (page = 1, day = 0) => http.get({
    "url": '/v3/appV3_3/ios/phone/list/todayRecommendList?&day=' + (day + 1) + "&page=" + page,
    "showLoading": false
  }),
  getComicList: (comicid) => http.get({
    "url": '/v3/appV3_3/ios/phone/comic/detail_static_new?version=4.3.12&comicid=' + comicid
    
  }), 
  getComicDetailsList: (comicid) => http.get({
    "url": '/v3/appV3_3/ios/phone/comic/detail_realtime?version=4.3.12&comicid=' + comicid
  }),
  getComicLikeList: (comicid) => http.get({
    "url": '/v3/appV3_3/ios/phone/comic/guessLike?version=4.3.12comicid=' + comicid
  }),
}