import http from '../http/http.js'
export default {
  //发现数据
  getDetectList: () => http.get({
    "url": '/v3/appV3_3/ios/phone/comic/getDetectList'
  }),
  getDetectUpdataList: () => http.get({
    "url": '/v3/appV3_3/ios/phone/list/todayRecommendList?&day=1&page=0'
  }),
}