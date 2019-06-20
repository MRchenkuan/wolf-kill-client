### api 使用手册
1. 在 modules 中配置接口基本信息
    - url 接口地址
    - method 请求方式
    - 更多配置
    ```javascript
        export default {
            // 一个简单的url 配置
            'fetchSomeData': {
                 // 完整的访问方法名
                 url: "/sample/data/normal", // 请求的地址（必填）
                 mockUrl: "/mock/data/normal", // mock 地址（可选项）
                 mockData: { rspCode: "success", data: [] }, // 静态 mock 数据
                 cached: "5000", // 表示接口在多久以内，缓存临时数据（可选项）
                 sensitive: "11", // 灵敏期，在这个时间段内，不会走缓存
                 method: "POST", // 请求方法 post get（可选项）
                 concurrency: false, // 是否允许并发（可选项）
                 mock: false, // 是否访问mock（可选项）
                 fit: (rsp, params) => {
                   // 拦截返回数据格式化
                   return rsp;
                 },
                 repeat: 3, // 重试次数
                 feed: (rsp, params)=>{ // 补偿机制，如果重试无效，则进入兜底返回
                     // 补偿机制
                 }
            }
        }
    ```
2. 在 api.js 中注册对应的模块，同时导出。
    - 导出的变量名，既是最终使用时调用的名字。
    - 如： api.brandHouse.fetch1(params, options)
     - 其中 brandHouse 就是 模块名
     - params 就是接口本次带的参数
     - options 包含如下两个参数
      - loading false string|bool|object 如果为 object ，则完整支持 wx.showLoading(object)
      - silence false bool 是否在出错的时候静默
