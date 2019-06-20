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
                this.setData({ shake: false }, ()=>{
                    this.setData({ role: roleMap[v], shake: true })
                });
                
                // setTimeout(()=>{
                //     this.setData({ role: roleMap[v], shake: false })
                // }, 1000)
            }
        },
        police: {
            type: Boolean,
            default: false,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        role: {},
        shake: true,
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
