// components/card/index.js
import {shake} from '../../utils/index.js'

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
          shake()
          this.setData({checked: checked.userId});
      },
      vote(e){
        if(this.data.checked){
            shake()
          this.triggerEvent('vote', { vid: this.data.vid, to: this.data.checked})
        }
      },
      closeVote(){
        this.triggerEvent('close', { vid: this.data.vid });
          shake()
      },
      hideVote(){
        shake()
        this.setData({ visible: false})
      },
      showVoter(){
        this.setData({ visible: true });
        shake()
      }
    }
})
