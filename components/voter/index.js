// components/card/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        vid:{
          type:String,
          default: "",
          observer(){
            this.setData({ visible: true })
          }
        },
        isHost: {
          type: Boolean,
          default: false,
        },
        tickets:{
          type: Object,
          default: {},
          observer(v){
            const count = {};
            Object.keys(v).map(f=>{
              const t = v[f];
              if (!(count[t] >= 0)) count[t]=0;
              count[t]++
            })
            this.setData({count})
          }
        },
        options: {
            type: Array,
            default: []
        },
        shake:{
            type: Boolean,
            default: true,
        },
        viewMode: {
            type: Boolean,
            default: false,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        checked: null,
        count:{},
        visible:true,
    },
    attached(){
        wx.vibrateShort()
    },
    /**
     * 组件的方法列表
     */
    methods: {
      onCheck(e){
          const checked = e.currentTarget.dataset.checked;
          this.setData({checked: checked.userId});
      },
      vote(e){
        if(this.data.checked){
          this.triggerEvent('vote', { vid: this.data.vid, to: this.data.checked})
        }
      },
      closeVote(){
        this.triggerEvent('close', { vid: this.data.vid })
      },
      hideVote(){
        this.setData({ visible: false})
      }
    }
})
