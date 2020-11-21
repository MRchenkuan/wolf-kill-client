import './utils/polyfill.js';
import { getOpenId } from './utils/index';
import { commonApi as api } from './api/index.js';
import {showToast} from './utils/index.js';
//app.js
App({
  onLaunch: function (e) {
    // 获取用户的openId
    getOpenId();

    // 获取用户 userInfo
    const userInfo =wx.getStorageSync('userInfo');
    if (userInfo) this.globalData.userInfo = userInfo;

    // 审核逻辑
    api.server({}, { silence: true }).then(()=>{
        if (e.path.indexOf('hanzo_pages')>=0){
            wx.reLaunch({
                url: '/pages/create/index',
            })
        }
    })

    wx.onNetworkStatusChange( (res) => {
      this.globalData.isConnected = res.isConnected
      if(!res.isConnected) {
        showToast('网络已断开', 1500)
      } else {
        showToast('网络已连接', 1500)
      }
    })
  },
  globalData: {
    userInfo: null
  }
})