function isObj(x) {
    const type = typeof x;
    return x !== null && (type === 'object' || type === 'function');
}

const getClassNames = (name) => ({
    enter: `hanzo-${name}-enter hanzo-${name}-enter-active`,
    'enter-to': `hanzo-${name}-enter-to hanzo-${name}-enter-active`,
    leave: `hanzo-${name}-leave hanzo-${name}-leave-active`,
    'leave-to': `hanzo-${name}-leave-to hanzo-${name}-leave-active`
});

const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 30));


export default Behavior({
    properties: {
        show: {
            type: Boolean,
            value: true,
            observer: "observeShow"
        },
        duration: {
            type: [Number, Object],
            value: 300,
            observer: "observeDuration"
        },
        name: {
            type: String,
            value: "fade",
            observer: "updateClasses"
        },
        customClass: String,
        customStyle: String
    },

    data: {
        type: "",
        inited: false,
        display: false,
        classNames: getClassNames("fade")
    },

    attached() {
        if (this.data.show) {
            this.show();
        }
    },

    methods: {
        observeShow(value) {
            if (value) {
                this.show();
            } else {
                this.leave();
            }
        },

        updateClasses(name) {
            this.setData({
                classNames: getClassNames(name)
            });
        },

        show() {
            const { classNames, duration } = this.data;
            const currentDuration = isObj(duration) ? duration.leave : duration;

            Promise.resolve()
                .then(nextTick)
                .then(() =>
                    this.setData({
                        inited: true,
                        display: true,
                        classes: classNames.enter,
                        currentDuration
                    })
                )
                .then(nextTick)
                .then(() =>
                    this.setData({
                        classes: classNames["enter-to"]
                    })
                );
        },

        leave() {
            const { classNames, duration } = this.data;
            const currentDuration = isObj(duration) ? duration.leave : duration;

            if (+currentDuration === 0) {
                this.onTransitionEnd();
                return;
            }

            Promise.resolve()
                .then(nextTick)
                .then(() =>
                    this.setData({
                        classes: classNames.leave,
                        currentDuration
                    })
                )
                .then(nextTick)
                .then(() =>
                    this.setData({
                        classes: classNames["leave-to"]
                    })
                );
        },

        onTransitionEnd() {
            if (!this.data.show) {
                this.setData({ display: false });
                this.triggerEvent("transitionend");
            }
        }
    }
})