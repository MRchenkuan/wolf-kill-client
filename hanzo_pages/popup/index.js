/**
 * popup 组件演示页面
 */

Page({
    data: {
        showPopup:false,
        showPopupMask:true
    },
    onLoad(options) {

    },
    onReady() {

    },
    onShow() {

    },
    onHide() {

    },
    onUnload() {

    },
    /*******业务逻辑*******/
    /*******交互事件*******/
    onPopupShow(){
        this.setData({
            showPopup:true
        })
    },
    onMaskClick(){
        this.setData({
            showPopup:false
        })
    }
});
