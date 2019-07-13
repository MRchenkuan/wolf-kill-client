// pure-hanzo_components/overlay/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: Boolean,
        mask: Boolean,
        duration: {
            type: [Number, Object],
            value: 300
        },
        zIndex: {
            type: Number,
            value: 1
        }
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
        onClick() {
            this.triggerEvent('click');
        },
        noop(){}
    }
})
