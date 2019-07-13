/**
 * demo 组件演示页面
 */

Page({
    data: {
        show: true,
    },
    click() {
        this.setData({
            show: !this.data.show
        })
    }
});
