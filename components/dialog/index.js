// components/box/index.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        animation:{
            type: String,
            default: 'scale',
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    attached(){
        wx.vibrateShort()
    },
    dettached(){
        wx.vibrateShort()
    },
    /**
     * 组件的方法列表
     */
    methods: {
        noop(){},
        hide(){
            this.triggerEvent('hide')
        }
    }
})
