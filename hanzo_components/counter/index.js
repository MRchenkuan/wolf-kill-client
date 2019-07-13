Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: Number,
    step: {
      type: Number,
      value: 1
    },
    max: {
      type: Number,
      value: 99
    },
    min: {
      type: Number,
      value: 0
    },
    disabled: {
      type: Boolean,
      value: false
    },
    editable: Boolean,
    async: {
      type: Boolean,
      value: false
    },
    iconSize:{
        type: String,
        value: '74rpx'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: 0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 计数器增加
    onPlus(e) {
      const { value, step, max, min } = this.data;
      const newValue = value + step;
      if (newValue <= max) this.update(newValue);
      this.triggerEvent("plus", this.data.value);
    },
    // 计数器减少
    onMinus(e) {
      const { value, step, max, min } = this.data;
      const newValue = value - step;
      if (newValue >= min) this.update(newValue);
      this.triggerEvent("minus", this.data.value);
    },
    onInput(e){
      this.triggerEvent('input', e.detail)
    },
    onBlur(e){
        this.triggerEvent('blur', e.detail)
    },
    onFocus(e){
        this.triggerEvent('focus', e.detail)
    },
    // 更新值
    update(newVal) {
      if (this.data.async) return;
      this.setData({
        value: newVal
      });
    }
  }
});
