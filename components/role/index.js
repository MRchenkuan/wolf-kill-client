// components/Seat/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        readOnly: {
            type: Boolean,
            default: true,
        },
        name: {
            type: String,
            default: '0'
        },
        count: {
            type: Number,
            default: '0'
        },
        key: {
            type: String,
            default: ""
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
        increase() {
            if (this.data.readOnly) {
                return this.triggerEvent('touch', this.data.key)
            };
            this.triggerEvent('increase', this.data.key)
        },
        decrease() { 
            if (this.data.readOnly) return;
            this.triggerEvent('decrease', this.data.key)
        },
    }
})
