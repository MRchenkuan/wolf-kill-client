import './utils/polyfill.js';
import { getOpenId } from './utils/index';
import { commonApi as api } from './api/index.js';

//app.js
App({
  onLaunch: function () {
    // 获取用户的openId
    getOpenId();

    // 获取用户 userInfo
    const userInfo =wx.getStorageSync('userInfo');
    if (userInfo) this.globalData.userInfo = userInfo;
  },
  globalData: {
    userInfo: null
  }
})