import roleMap from './card.js';
// components/card/index.js
const romeNumber = [, 
  'I', 'II', 'III', 'IV', 'V', 'VI','VII', 'VIII', 'IX', 'X',
  'XI', "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII"
]
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
        },
        adsbtn:{
            type: String,
            default: ""
        },
        seat:{
          type: String,
          default: ""
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        role: {},
        visiable: true,
        adsVisiable: false,
        romeNumber
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showTable(){
            this.setData({
                visiable: !this.data.visiable,
            })
        },
        clickads(){
            this.triggerEvent("adsclick")
        }
    }
})
