import { isObject } from './types.js';

let queue = [];
// let activeToast = null;

function filterAlive(){
    queue = queue.filter(loading=>loading.alive);
    // 没有存活Toast 则关闭全部
    if (!queue.length) return wx.hideToast();

    // 栈顶的toast
    const loading = queue[queue.length - 1]

    // 二次确认栈顶 toast 的存活
    if (loading.alive) {
        wx.showToast(loading.configs)
    } else {
        console.error('异常情况，showToast 中 filter 执行线程不安全')
    }
}

export function showLoading(configs){
    // 合并完整的 loading 配置对象
    const _configs = { title: '加载中', icon: 'loading', duration: 10000, mask: false, ...configs }

    // loading 实例
    const loading = {
        alive: true, // 是否存活
        configs: _configs,
        timer: 0, // 计时器
    }

    // loading 入栈并激活
    queue.push(loading);
    wx.showToast(_configs);

    // 过期之后自动清除自身
    loading.timer = setTimeout(() => {
        loading.alive = false; // 关闭当前
        filterAlive(); // 打开其他
    }, _configs.duration);

    // 返回关闭方法
    return () => {
        loading.alive = false;
        clearTimeout(loading.timer) // 清除计时器
        filterAlive(); // 打开其他
    }
}

export function showToast(configs, duration){
    if (!isObject(configs)){
        configs = {
            title: `${configs}`,
        }
        if(duration) configs.duration = duration;
    }
    const _configs = { icon: 'none', duration: 4000 }
    return showLoading({
        ..._configs,
        ...configs,
    })
} ;
