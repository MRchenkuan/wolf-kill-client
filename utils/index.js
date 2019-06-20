export * from './user.js';
export * from './toast.js';
export * from './sysInfo.js';
export * from './datetime.js';
export * from './types.js';

export function createScrollingProcessor(processor){
    let lastScrollTop = false;
    return (scrollTop) => {
        let direction = null;
        if (scrollTop > lastScrollTop) direction = 'down'
        if (scrollTop < lastScrollTop) direction = 'up'
        const result = { scrollTop: Math.max(0, scrollTop), direction }
        lastScrollTop = scrollTop;
        return processor(result)
    }
}

export function debounce(fn, delay, prexec = true) {
    let timer = null;

    if (prexec){
        return function (...args) {
            if (timer === null) fn.apply(this, args)
            clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null
            }, delay)
        }
    } else {
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(()=>{
                fn.apply(this, args)
            }, delay)
        }
    }

}

/**
 * 商品唯一id
 * @param {*} acId 活动id
 * @param {*} prId 商品id
 */
export function pk(acId, prId){
    return `${acId}-${prId}`
}
/**
 * 商品唯一id 解析
 * @param {*} key
 */
export function pkp(key){
    const [acId, prId] = key.split('-')
    return {
        acId, prId
    }
}

/**
 * 数字抽象化
 * @param {*} number
 */
export function shortText(number){

    if (isNaN(number)) {
        return 0;
    }
    else if (number < 10000) {
        return number;
    }
    else if (number < 100000000) {
        var numStr = (+(number / 10000).toFixed(1)) + "万";
        return numStr;
    }
    else {
        var numStr = (+(number / 100000000).toFixed(1)) + "亿";
        return numStr;
    }
}

/**
 * 浅比较
 */
export function shallowEqual(a, b) {
    try {
        return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
        return false;
    }
}

/**
 * 截取字符串
 * @param {string} val
 * @param {Number} max
 * @param {boolean} isAddEllipsis
 */
export function getByteVal(val, max, isAddEllipsis) {
    var returnValue = '';
    var byteValLen = 0;
    for (var i = 0; i < val.length; i++) {
        if (val[i].match(/[^\x00-\xff]/ig) != null)
        byteValLen += 2;
        else
        byteValLen += 1;
        if (byteValLen > max)
        break;
        returnValue += val[i];
    }
    if (isAddEllipsis && val.replace(/[^\x00-\xff]/ig, "  ").length > returnValue.replace(/[^\x00-\xff]/ig, "  ").length) {
        returnValue += "...";
    }
    return returnValue;
}
