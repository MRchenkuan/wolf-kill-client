### Transition 动画

#### 使用指南

在 app.json 或 index.json 中引入组件
```json
"usingComponents": {
  "hanzo-transition": "path/to/hanzot-weapp/dist/transition/index"
}
```

#### 代码演示

#### 基础用法
将元素包裹在 transition 组件内，在元素展示/隐藏时，会有相应的过渡动画

```html
<hanzo-transition show="{{ show }}" custom-class="block">
  内容
</hanzo-transition>
```

#### 动画类型
transition 组件内置了多种动画，可以通过`name`字段指定动画类型

```html
<hanzo-transition name="fade-up" />
```

#### 高级用法

可以通过外部样式类自定义过渡效果，还可以定制进入和移出的持续时间：

```html
<hanzo-transition
  show="{{ show }}"
  name=""
  duration="{{ { enter: 300, leave: 1000 } }}"
  enter-class="hanzo-enter-class"
  enter-active-class="hanzo-enter-active-class"
  leave-active-class="hanzo-leave-active-class"
  leave-to-class="hanzo-leave-to-class"
/>
```

```css
.hanzo-enter-active-class,
.hanzo-leave-active-class {
  transition-property: background-color, transform;
}

.hanzo-enter-class,
.hanzo-leave-to-class {
  background-color: red;
  transform: rotate(-360deg) translate3d(-100%, -100%, 0);
}
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| name | 动画类型 | `String` | `fade`|
| show | 是否展示组件 | `Boolean` | `true` |
| duration | 动画时长，单位为毫秒 | `Number | Object` | `300` |
| custom-style | 自定义样式 | `String` | - |


### 动画类型

| 名称 | 说明 |
|-----------|-----------|
| fade | 淡入 |
| fade-up | 上滑淡入 |
| fade-down | 下滑淡入 |
| fade-left | 左滑淡入 |
| fade-right | 右滑淡入 |
| slide-up | 上滑进入 |
| slide-down | 下滑进入 |
| slide-left | 左滑进入 |
| slide-right | 右滑进入 |

### todo 动画类型
- 缩放对应的效果
