Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 滑块
        swipeLeftWidth:{
            type: Number,
            value: 0 // 0不显示 65 则显示
        },
        swipeRightWidth:{
            type: Number,
            value: 0 // 0不显示 65 则显示
        },
        swipeLeftText:{
            type:String,
            value:"选择"
        },
        swipeRightText:{
            type:String,
            value:"删除"
        },
    },

    /**
     * 组件的初始数据
     */
    data: {},
    /**
     * 组件的方法列表
     */
    methods: {
        onTap(e) {
            this.triggerEvent("onTap", {val: e.detail, key: this.data.key, item: this.data});
        },
        onCheck(e) {
            this.triggerEvent("check", {val: e.detail, key: this.data.key, item: this.data});
        },
        onAdd(e) {
            this.triggerEvent("add", {val: e.detail, key: this.data.key, item: this.data});
        },
        onReduce(e) {
            this.triggerEvent("reduce", {val: e.detail, key: this.data.key, item: this.data});
        },
        onChange(e) {
            let changeVal = e.detail.value;
            if (!changeVal || changeVal <= 1) {
                changeVal = 1
            } else if (changeVal > this.data.maxCartCount) {
                changeVal = this.data.maxCartCount;
            } else {
                changeVal = parseInt(changeVal);
            }
            this.triggerEvent("change", {val: changeVal, key: this.data.key, item: this.data});
        },
        onBlur(e) {
            let changeVal = e.detail.value;
            if (!changeVal || changeVal <= 1) {
                changeVal = 1
            } else if (changeVal > this.data.maxCartCount) {
                changeVal = this.data.maxCartCount;
            } else {
                changeVal = parseInt(changeVal);
            }
            this.triggerEvent("blur", {val: changeVal, key: this.data.key, item: this.data});
        },
        onFocus(e) {
            let changeVal = e.detail.value;
            if (!changeVal || changeVal <= 1) {
                changeVal = 1
            } else if (changeVal > this.data.maxCartCount) {
                changeVal = this.data.maxCartCount;
            } else {
                changeVal = parseInt(changeVal);
            }
            this.triggerEvent("focus", {val: changeVal, key: this.data.key, item: this.data});
        },
        onSwipeLeft(e){
            this.triggerEvent("swipeLeft", {val: e.detail, key: this.data.key, item: this.data});
        },
        onSwipeRight(e){
            this.triggerEvent("swipeRight", {val: e.detail, key: this.data.key, item: this.data});
        }
    }
});
