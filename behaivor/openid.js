import { getOpenId, showToast } from "../utils/index.js";

export default {
    data: {
        openid: wx.getStorageInfoSync('openid'),
    },
    member: {
        syncOpenid(){
            if (!this.data.openid) {
                getOpenId().then(openid => {
                    this.setData({ openid });
                }).catch(e => {
                    console.log(e);
                    showToast('openid 获取失败')
                })
            }
        }
    }
}