import roleMap from './card.js';
// components/card/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        type: {
            type: String,
            default: null,
            observer(v){
                this.setData({ role: roleMap[v] })
            }
        },
        shake:{
            type: Boolean,
            default: true,
        },
        police: {
            type: Boolean,
            default: false,
        },
        alive:{
            type: Boolean,
            default: false,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        role: {},
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
