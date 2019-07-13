/**
 * switch-demo 组件演示页面
 */

Page({
    data: {
        checked: true
    },
    onChange({ detail }) {
        // 需要手动对 checked 状态进行更新
        this.setData({ checked: detail });
    },
    onClose(event) {
        const { position, instance } = event.detail;
        switch (position) {
            case 'left':
            case 'cell':
                instance.close();
                break;
            case 'right':
                Dialog.confirm({
                    message: '确定删除吗？'
                }).then(() => {
                    instance.close();
                });
                break;
        }
    }
});
