### 按钮

#### 适用场景
> 

#### 基本调用
``` 
 <hanzo-button>按钮</hanzo-button>
```
#### 参数 props
| 参数 |   说明    |  类型  | 可选值 | 默认值 | 可选性 |
| :--: | :-------: | :----: | :----: | :----: | :----: |
|  type | 按钮类型 |  String |   primary,warn,info,error,success,outline   |     |   -    |
|  inline | 是否为行内元素 |  Boolean |      |   false  |   -    |
| size  | 按钮大小 | String |   large, small   |     |   -    |
| shape | 按钮形状 | String |   circle,square   |  circle   |   -    |
| disabled | 禁用状态 | Boolean |      |  false   |   -    |
| loading | 是否加载中 | Boolean |      |  false   |   -    |
| open-type | 微信开放能力 | String |      |  -   |   -    |

#### 事件 event
| 名称          |  参数         | 说明                 | 备注            |
| ------------- |:-------------:| :--------------------| :---------------| 
| onTap          |               |  按钮在可用状态被点击时触发  |               |
| onGetUserInfo          |               |  用户点击该按钮时，会返回获取到的用户信息  |               |
| onContact          |               |  客服消息回调  |               |
| onGetPhoneNumber          |               |  获取用户手机号回调  |               |
|onError  |               |  当使用开放能力时，发生错误的回调  |               |
#### 相关演示
![An image](../../../docs/img/button_0.png)

