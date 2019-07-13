import { registerModule } from './core.js';


/**
 * 公共接口
 */
import common from './modules/api.js';

/**
 * 公共 ws
 */
import wsCommon from './websocket/common.js'

/**
 * 导出
 */
// export const commonApi = registerModule('http://localhost:3000', common);
// export const commonApi = registerModule('http://192.168.1.5:3000', common);
export const commonApi = registerModule('https://langrensha.chenkuan.cc', common)



// export const commonSocket = wsCommon("ws://192.168.1.5:3000");
export const commonSocket = wsCommon("wss://langrensha.chenkuan.cc");