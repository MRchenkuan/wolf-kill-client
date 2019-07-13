Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mode: {
      type: String,
      value: 'normal'
    },
    amount: {
      type: Number,
      value: 0
    },
    checked: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},
  /**
   * 组件的方法列表
   */
  methods: {
    onChecked(e) {
      if (this.data.disabled)
        return
      this.triggerEvent("checked", { val: e.detail, key: this.data.key, item: this.data });
    },
    onSubmit(e) {
      if(this.data.count <= 0 || this.data.amount <= 0)
        return;

      this.triggerEvent("submit", { });
    },
    onDel(e) {
      if (this.data.count <= 0)
        return;

      this.triggerEvent("del", { });
    }
  }
});
