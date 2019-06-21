// components/card/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        options: {
            type: Array,
            default: []
        },
        shake:{
            type: Boolean,
            default: true,
        },
        viewMode: {
            type: Boolean,
            default: false,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        checked: null,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onCheck(e){
            const checked = e.currentTarget.dataset.checked;
            this.setData({checked: checked.userId});
        }
    }
})
