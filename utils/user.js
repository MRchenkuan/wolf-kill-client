import { commonApi as api } from '../api/index.js';
/**
 * 获取用户 openID
 */
export function getOpenId(){
    return new Promise((resolve, rej)=>{
        let openid = wx.getStorageSync('openid');
        if (openid) return resolve(openid)
        // 登录
        wx.login({
            success: res => {
                api.getOpenId({ code: res.code }, { silence: true }).then((data => {
                    wx.setStorageSync('openid', data);
                    resolve(data);
                })).catch(e=>{
                    rej(e)
                    console.log(e)
                })
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            },
            fail(e){
                rej(e);
                console.log(e)
            }
        })
    })
}