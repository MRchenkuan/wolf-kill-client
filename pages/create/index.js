// pages/create/index.js
import { commonApi as api } from '../../api/index.js';
import openidBehavior from '../../behaivor/openid.js';
import authorizeBehavior from '../../behaivor/authorize.js';
import { getOpenId, showToast } from "../../utils/index.js";
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ...openidBehavior.data,
        ...authorizeBehavior.data,
    },
    ...openidBehavior.member,
    ...authorizeBehavior.member,
    create(){
        
        // 获取openId
        getOpenId().then(userId=>{
            // 创建游戏
            api.createGame({ userId }).then(tableId => {
                // 创建成功之后进入游戏页;
                wx.navigateTo({
                    url: '/pages/ready/index?tableId=' + tableId,
                })
            }).catch(e=>{
                showToast('游戏创建失败（网络）')
            })
        }).catch(e=>{
            showToast('用户id 获取失败')  
        })
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 同步openid
        this.syncOpenid()
        // 确认授权
        this.checkAuth();        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})