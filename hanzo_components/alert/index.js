// pure-hanzo_components/alert/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        message: String,
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
        onTap(e){
            this.triggerEvent(e);
        }
    }
})
