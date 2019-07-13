/**
 * settlement-bar 组件演示页面
 */

Page({
  data:{
    count: 10,
    checked: true,
    amount: 520.01,
    disabled: false,
    mode: 'normal',
    status:''
  },
  onChecked(data) {
    const isChecked = data.detail.item.checked;
    const checkText = !isChecked ? "全选" : "取消全选";
    this.setData({
      checked : !isChecked,
      status: "您点击了" + checkText + "事件"
    });

    if(!isChecked)
      this.setData({
        count:10,
        amount:520.01
      })
    else
      this.setData({
        count: 0,
        amount: 0
      })
  },
  onSubmit(data){
    this.setData({
      status : "您点击了提交事件"
    })
  },
  onDel(data) {
    this.setData({
      status: "您点击了删除事件"
    })
  },
  changMode(){
    this.setData({
      mode: this.data.mode == "normal" ? "del" : "normal"
    })
  },
  changDisabled() {
    if (!this.data.disabled)
      this.setData({
        count: 0,
        amount: 0,
        checked: false,
        disabled: this.data.disabled ? false : true
      })
    else
      this.setData({
        count: 10,
        amount: 520.01,
        checked: true,
        disabled: this.data.disabled ? false : true
      })
  }
});
