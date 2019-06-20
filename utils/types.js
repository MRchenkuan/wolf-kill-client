/**
 * 是否函数
 * @param {} t 
 */
export function isFunction(t){
    return typeof t === 'function';
}

export function isString(t){
    return typeof t === 'string';
}

export function isObject(t){
    return t && (typeof t === 'object');
}