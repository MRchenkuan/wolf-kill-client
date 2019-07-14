// components/card/index.js
import {shake} from '../../utils/index.js'
Component({
    properties:{
        donateList: {
            type: Array,
            default: [],
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        show: false
    },
    /**
     * 组件的方法列表
     */
    methods: {
        coin(){
            this.setData({
                show: !this.data.show,
            })
        },
        tap(){
            wx.previewImage({
                urls: ['cloud://prod-gugmx.7072-prod-gugmx/qrcode.jpg'],
            });
        },
    }
})
