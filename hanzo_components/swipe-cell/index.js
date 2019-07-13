// pure-hanzo_components/swipe-cell/index.js
import { touch } from '../mixins/touch';
const THRESHOLD = 0.15;

Component({
    behaviors: [touch],
    /**
     * 组件的属性列表
     */
    properties: {
        disabled: Boolean,
        leftWidth: {
            type: Number,
            value: 0
        },
        rightWidth: {
            type: Number,
            value: 0
        },
        asyncClose: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
        offset: 0,
        dragIng: false
    },

    ready(){

    },
    /**
     * 组件的方法列表
     */
    methods: {
        onTransitionend() {
            this.swipe = false;
        },

        open(position) {
            const { leftWidth, rightWidth } = this.data;
            const offset = position === 'left' ? leftWidth : -rightWidth;
            this.swipeMove(offset);
            this.resetSwipeStatus();
        },

        close() {
            this.setData({ offset: 0 });
        },

        resetSwipeStatus() {
            this.swiping = false;
            this.opened = true;
        },

        swipeMove(offset = 0) {
            this.setData({ offset });
            offset && (this.swiping = true);
            !offset && (this.opened = false);
        },

        swipeLeaveTransition(direction) {
            const { offset, leftWidth, rightWidth } = this.data;
            const threshold = this.opened ? 1 - THRESHOLD : THRESHOLD;

            // right
            if (direction > 0 && -offset > rightWidth * threshold && rightWidth > 0) {
                this.open('right');
                // left
            } else if (direction < 0 && offset > leftWidth * threshold && leftWidth > 0) {
                this.open('left');
            } else {
                this.swipeMove();
            }
        },

        startDrag(event) {
            if (this.data.disabled) {
                return;
            }

            this.setData({ dragIng: true });
            this.touchStart(event);

            if (this.opened) {
                this.startX -= this.data.offset;
            }
        },

        onDrag(event) {
            if (this.data.disabled) {
                return;
            }

            this.touchMove(event);
            const { deltaX } = this;
            const { leftWidth, rightWidth } = this.data;

            if (
                (deltaX < 0 && (-deltaX > rightWidth || !rightWidth)) ||
                (deltaX > 0 && (deltaX > leftWidth || (deltaX > 0 && !leftWidth)))
            ) {
                return;
            }

            if (this.direction === 'horizontal') {
                this.swipeMove(deltaX);
            }
        },

        endDrag() {
            if (this.data.disabled) {
                return;
            }

            this.setData({ dragIng: false });
            if (this.swiping) {
                this.swipeLeaveTransition(this.data.offset > 0 ? -1 : 1);
            }
        },

        onClick(event) {
            const { key: position = 'outside' } = event.currentTarget.dataset;
            this.triggerEvent('click', position);

            if (!this.data.offset) {
                return;
            }

            if (this.data.asyncClose) {
                this.triggerEvent('close', { position, instance: this });
            } else {
                this.swipeMove(0);
            }
        }
    }
});
