// hanzo_components/popup/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show:{
            type:Boolean,
            value:false,
        },
        position: {
            type: String,
            value: 'center', // center top left right bottom
        },
        transitionName:{
            type: String,
            value: 'fade', // 参考transition组件 fade slide-up
        },
        mask:{
            type:Boolean,
            value:true
        },
        zIndex: {
            type: Number,
            value: 2
        },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onOverlayClick(){
            this.triggerEvent('mask-click');
        },
    }
})
