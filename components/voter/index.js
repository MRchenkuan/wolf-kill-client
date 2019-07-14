// components/card/index.js
import {shake} from '../../utils/index.js'
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
        name: {
            type: String,
            default: "投票器",
        },
        isHost: {
          type: Boolean,
          default: false,
        },
        tickets:{
          type: Object,
          default: {},
          observer(v){
                this.drawTickets();
                const count = {};
                Object.keys(v).map(f=>{
                    const t = v[f];
                    if (!(count[t] >= 0)) count[t]=0;
                    count[t]++
                })
                this.setData({count});
          }
        },
        options: {
            type: Array,
            default: [],
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
        tearup: {},
        visible:true,
    },
    attached(){
        shake();
        this.ctx = wx.createCanvasContext('voteroutes', this);
        
    },
    dettached(){
        shake();
    },
    /**
     * 组件的方法列表
     */
    methods: {
        drawTickets(){
            setTimeout(() => {
                this.ctx.clearRect(0, 0, 9999, 9999);
                const tearup = {};
                const {tickets} = this.data;
                const validTickets = Object.keys(tickets).filter(fr=>{
                    const to = tickets[fr];
                    if(!to) tearup[fr] = true;
                    return !!to;
                });
                // 弃权玩家
                this.setData({tearup})
                // 投票玩家
                Promise.all(validTickets.map(fr => {
                    return new Promise((resolve, rej) => {
                        const to = tickets[fr];
                        const query = this.createSelectorQuery();
                        query.select(`#voter-inner-frame`).boundingClientRect();
                        query.select(`#fr_${fr}`).boundingClientRect();
                        query.select(`#to_${to}`).boundingClientRect();

                        query.exec(([frame, fr, to]) => {
                            const start = [
                                fr.left - frame.left + fr.width + 5,
                                fr.top - frame.top + fr.height / 2
                            ];
                            const end = [
                                to.left - frame.left - 5,
                                to.top - frame.top + to.height / 2
                            ];
                            resolve([...start, ...end])
                        })
                    })
                })).then(arrows=>{
                    arrows.map(arrow=>{
                        this.drawRoutes(...arrow);
                    })
                    shake();
                    this.ctx.draw()
                })
            }, 1000);
        },
        drawRoutes(fromX, fromY, toX, toY, color ="#3cb176"){
            const ctx = this.ctx;
            var theta = 30,
            handlerlen = 10,
            headlen = 6,
            angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
            // angle = Math.atan2(0, -1) * 180 / Math.PI,
            angle1 = (angle + theta) * Math.PI / 180,
            angle2 = (angle - theta) * Math.PI / 180,
            topX = headlen * Math.cos(angle1),
            topY = headlen * Math.sin(angle1),
            botX = headlen * Math.cos(angle2),
            botY = headlen * Math.sin(angle2);
            ctx.setStrokeStyle(color)
            ctx.setShadow(1, 1, 2, "#444")
            ctx.setLineWidth(3);
            ctx.save();
            ctx.beginPath();
            var arrowX, arrowY;
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(fromX + handlerlen, fromY);
            // ctx.lineTo(toX - handlerlen, toY);
            ctx.lineTo(toX, toY);
            arrowX = toX + topX;
            arrowY = toY + topY;
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(toX, toY);
            arrowX = toX + botX;
            arrowY = toY + botY;
            ctx.lineTo(arrowX, arrowY);
            this.ctx.stroke();
            this.ctx.restore();
        },
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
        tearup(){
            shake();
            this.triggerEvent('vote', { vid: this.data.vid, to: null})
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
