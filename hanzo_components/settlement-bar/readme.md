###  结算订单栏

#### 基本调用
``` 
 <settlement-bar></settlement-bar>
```
#### 参数 props
| 参数        | 说明           | 类型   | 可选值 | 默认值
| ------------- |:-------------:| :-----| :-----| :-----|
|mode           | 当前模式      | String|       |   normal<br>del   |
|amount         | 合计总价      | Number|       |    0  |
|checked        | 是否全选      | Boolean |     | false |
|disabled       | 全选是否可用     | Boolean |     | false |
|count          | 合计数量        | Number |    | 0     |

#### 事件 event
| 名称          |  说明         | 参数   | 备注|
| ------------- |:-------------:| :-----| :-----| 
|checked       |  全选点击触发 |       |      |
|del       |  删除事件触发 |       |     |
|submit       |  点击结算/删除时触发 |  |     |

#### 相关演示
![An image](../../../docs/img/settlementBar_0.png)
![An image](../../../docs/img/settlementBar_1.png)
![An image](../../../docs/img/settlementBar_2.png)
