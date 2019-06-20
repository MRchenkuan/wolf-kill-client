export default function (urlPrefix) {
    return {
        connect(params) {
            const queryStr = Object.keys(params).map(key => {
                return `${key}=${params[key]}`
            }).join("&");
            return wx.connectSocket({
                url: urlPrefix + '?' + queryStr,
                header: {
                    'content-type': 'application/json'
                },
                // protocols: [],
                tcpNoDelay: false,
                success(conn) { },
                fail() { },
                complete() { }
            })
        }
    }
}