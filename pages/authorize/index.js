const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },
    //自定义数据
    isAuthorize: false,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) { },
    onGotUserInfo: function (e) {
        if (e.detail.userInfo){
            this.isAuthorize = true;
            wx.setStorageSync('userInfo', e.detail.userInfo);
            app.globalData.userInfo = e.detail.userInfo;
            wx.navigateBack({
                delta: 1
            });
        }
    },
    onAuthorizeFail(){},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        if (this.isAuthorize === false) {
            wx.showModal({
                content: '未取得微信授权，是否继续授权？',
                success: function (res) {
                    if (res.confirm) {
                        wx.redirectTo({
                            path: '/pages/authorize/index',
                        });
                    } else {
                        var pages = getCurrentPages();
                        var onAuthorizeFail = pages[pages.length - 1].onAuthorizeFail;
                        if (typeof onAuthorizeFail == "function") {
                            if (!onAuthorizeFail()) {
                                return;
                            }
                        }
                    }
                }
            });
        }
    }
})