// components/Seat/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        player: {
            type: Object,
            default: null,
        },
        judge: {
            type: Boolean,
            default: false,
        },
        open: {
            type: Boolean,
            default: false,
        },
        simple: {
            type: Boolean,
            default: false,
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
        onTap(){
            this.triggerEvent('tap', this.data.player)
        }
    }
})
