import { isFunction, showLoading, shallowEqual, showToast } from "../utils/index.js";

const HOOKS = {
    afterFetch: []
}

let app = getApp();
// 动态配置
let computed = {
    // userId(){
    //     if(!app) app = getApp();
    //     return app.globalData.openid;
    // }
}

let request = {
  method: "POST",
  dataType: "json",
  loadMsg: "加载中",
  // 是否不提示异常信息
  silence: false,
  loading: false,
  data: {}
};

request.header = {
    'content-type': 'application/json',
  'Accept': 'application/json, text/plain, */*'
}; // 设置请求的 header

/**
 * @param url 请求地址
 * @param params 请求参数
 * @param options 额外的配置，用于覆盖
 * @param mockData 静态数据，用于静态mock 的返回
 */
export const fetch = (url, params = {}, options = {}, mockData) => {
    const { silence } = options || {}
    return new Promise((resolve, reject) => {
        const callbacks = {
            success: function (res) {
                const { data, rspCode, rspDesc } = (res || {}).data || {};
                if (rspCode === 'success') {
                    resolve(data);
                } else {
                    // todo
                    if (!silence) showToast("发生了一些小问题~");
                    // todo notvalidroom
                    if (rspCode === 'notvalidroom'){
                        wx.redirectTo({
                            url: '/pages/create/index',
                        })
                    }
                    reject((res || {}).data || {});
                }
            },
            fail: function (res) {
                if (!silence) showToast("网络连接失败~");
                reject(res);
            },
            complete: function(res){
                if(HOOKS.afterFetch.length){
                    HOOKS.afterFetch.map(hook=> {
                        hook(url, res, params, {...request,...options,});
                    })
                }
            }
        }

        const computedOptions = Object.keys(computed).map(key=>{
            return {[key]: computed[key]()}
        }).reduce((a, b)=>{
            return {...a, ...b}
        },{})

        if (mockData){
            callbacks.success({ data: mockData });
            callbacks.complete({ data: mockData })
            wx.request({
                url,
                ...request,
                data: { ...request.data, ...params, ...computedOptions },
                ...options
            })
        }else{
            wx.request({
                url,
                ...request,
                data: { ...request.data, ...params, ...computedOptions },
                ...callbacks,
                ...options
            })
        }
    })
}

export function registerModule(urlPrefix, apiModule = []){
    const api = {}
    // todo Object.keys
    Object.keys(apiModule).map((name)=>{
        const {
          url,
          method = "POST",
          cached,
          mock,
          mockUrl,
          mockData,
          fit,
          sensitive,
          repeat,
          feed
        } = apiModule[name] || {};
        api[name] = function (data, options={}) {
            const self = api[name];
            const loading = (options || {}).hasOwnProperty('loading') ? options.loading : request.loading;

            let destroy = ()=>{};
            // 模拟 loading
            if (typeof loading === 'object') {
                destroy = showLoading({ ...loading, duration: 10000 })
            } else if (loading) {
                destroy = showLoading({
                    title: loading || '加载中',
                })
            }
            const sensitivePeriod = sensitive && (sensitive == (new Date()).getHours())
            // 如果有缓存要求，则输出缓存
            if (!sensitivePeriod && cached && self.__lastRequestTime && !options.noCached){
                const isExpired = Date.now() - self.__lastRequestTime > cached;
                // 超过缓存时间，并且参数一致
                if (!isExpired && shallowEqual(data, self.__lastCachedParams)){

                    const result = Promise.resolve(self.__lastCachedResponse);
                    result.then(()=>{
                        // 模拟 loading 关闭
                        if (typeof destroy ==='function') setTimeout(destroy, 500)
                    })
                    return result;
                }
            }
            // 否则直接请求
            const fullUrl = mock ? mockUrl : urlPrefix + url;
            const next = (repeat=1)=>{
                return fetch(fullUrl, data, { ...options, method: mock ? 'GET' : method }, mock ? mockData : undefined)
                    .then((response) => {
                        destroy();
                        const finalResponse = typeof fit === 'function'
                            ? fit(response, data)
                            : response
                        self.__lastRequestTime = Date.now();
                        self.cache = self.__lastCachedResponse = finalResponse
                        self.__lastCachedParams = data;
                        return finalResponse;
                    }, (e) => {
                        // 重试
                        if(--repeat>0) {
                            return next(repeat)
                        } else {
                            // 补偿
                            if (isFunction(feed)){
                                return Promise.resolve(feed(e, data));
                            }
                            destroy();
                            return Promise.reject(e);
                        }
                    })
            }
            return next(repeat);
        }
    })
  return api;
}

export function registerHook(name, fn){
    if(!HOOKS.name) HOOKS[name] = []
    HOOKS[name].push(fn);
}

/**
 * 注册计算属性
 * @param {*} options 
 */
export function registerComputedOptions(options){
    computed = {...computed, ...options}
}
