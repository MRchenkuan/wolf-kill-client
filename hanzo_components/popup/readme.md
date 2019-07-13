### 弹层组件

#### 适用场景
> 

#### 基本调用
``` 
 <hanzo-popup show="{{showPopup}}" bind:mask-click="onMaskClick"></hanzo-popup>
```
#### 参数 props
| 参数 |   说明    |  类型  | 可选值 | 默认值 |
| :--: | :-------: | :----: | :----: | :----: |
|  show |  是否显示|   Boolean     |   -    |  false | 
| position| slot 显示的位置|   String    |  center top left right bottom    |  center |
|  mask |  是否显示遮罩层|   Boolean     |   -    |  true | 
|  zIndex |  弹窗层级 |   Number     |   -    |  2 | 
|transitionName |  参考transition组件动画属性 |   String     |   -    |  fade | 
#### 事件 event
| 名称          |  参数         | 说明                 | 备注            |
| ------------- |:-------------:| :--------------------| :---------------| 
|mask-click     |   -           |     遮罩层事件(一般为关闭) |               |

####  插槽 slot
| 名称          |  说明               | 备注            |
| ------------- |:-------------:| :--------------------|
|-          |               |  -  |               | 

#### 相关演示

