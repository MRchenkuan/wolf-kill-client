// components/card/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        
    },
    
    /**
     * 组件的方法列表
     */
    methods: {
      onCheck(e){
          const checked = e.currentTarget.dataset.checked;
          wx.vibrateShort()
          this.setData({checked: checked.userId});
      },
      vote(e){
        if(this.data.checked){
            wx.vibrateShort()
          this.triggerEvent('vote', { vid: this.data.vid, to: this.data.checked})
        }
      },
      closeVote(){
        this.triggerEvent('close', { vid: this.data.vid });
          wx.vibrateShort()
      },
      hideVote(){
        wx.vibrateShort()
        this.setData({ visible: false})
      },
      showVoter(){
        this.setData({ visible: true });
        wx.vibrateShort()
      }
    }
})
