// pure-hanzo_components/switch/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checked: Boolean,
    loading: Boolean,
    disabled: Boolean,
    activeColor: String,
    inactiveColor: String,
    size: {
      type: String,
      value: '30px'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  ready() {
     this.setData({ value: this.data.checked });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClick() {
      if (!this.data.disabled && !this.data.loading) {
        const checked = !this.data.checked;
        this.triggerEvent('input', checked);
        this.triggerEvent('change', checked);
      }
    }
  }
});
