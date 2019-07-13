// pure-hanzo_components/image/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        src: String,
        mode: String,
        lazyLoad: { type: Boolean, value:true},
        ariaLabel: String,
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
        handleerror(e){
            this.triggerEvent('error', e);
        },
        handleload(e){
            this.triggerEvent('load', e);
        }
    }
})
