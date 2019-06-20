const app = getApp();

export default {
    data: {
        authorized: !!(app.globalData.userInfo || wx.getStorageSync('userInfo')),
    },
    member: {
        checkAuth(){
            if(!this.data.authorized) {
                wx.navigateTo({
                    url: '/pages/authorize/index',
                })
            }
        }
    }
}