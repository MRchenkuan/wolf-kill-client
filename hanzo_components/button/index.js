Component({
    externalClasses: ['h-class'],

    properties: {
        // primary, info, success, warn, error,outline
        type: {
            type: String,
            value: 'primary',
        },
        // 多个按钮排列方式 是否一行显示
        inline: {
            type: Boolean,
            value: false
        },
        // default, large, small
        size: {
            type: String,
            value: 'default',
        },
        // circle, square
        shape: {
            type: String,
            value: 'circle'
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        loading: {
            type: Boolean,
            value: false,
        },
        long: {
            type: Boolean,
            value: false
        },
        openType: String,
        appParameter: String,
        hoverStopPropagation: Boolean,
        hoverStartTime: {
            type: Number,
            value: 20
        },
        hoverStayTime: {
            type: Number,
            value: 70
        },
        lang: {
            type: String,
            value: 'en'
        },
        sessionFrom: {
            type: String,
            value: ''
        },
        sendMessageTitle: String,
        sendMessagePath: String,
        sendMessageImg: String,
        showMessageCard: Boolean
    },

    methods: {
        handleTap () {
            if (this.data.disabled) return false;

            this.triggerEvent('onTap');
        },
        bindgetuserinfo({ detail = {} } = {}) {
            this.triggerEvent('onGetUserInfo', detail);
        },
        bindcontact({ detail = {} } = {}) {
            this.triggerEvent('onContact', detail);
        },
        bindgetphonenumber({ detail = {} } = {}) {
            this.triggerEvent('onGetPhoneNumber', detail);
        },
        binderror({ detail = {} } = {}) {
            this.triggerEvent('onError', detail);
        }
    }
});
