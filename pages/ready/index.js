// pages/ready/index.js
import { commonApi as api, commonSocket as wsCommon } from '../../api/index.js'
import { showToast, getOpenId, shake} from '../../utils/index.js';
const app = getApp();
import roleMap from '../../components/card/card.js'
import openidBehavior from '../../behaivor/openid.js';
import authorizeBehavior from '../../behaivor/authorize.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ...openidBehavior.data,
        ...authorizeBehavior.data,
        connected: false,
        isHost: false,
        seats: 12,
        judge: {}, //法官
        players:[], // 玩家
        viewers: [], // 观众
        alives: [], // 活人
        roles: [], // 角色列表
        roleMap: [], // 角色方案
        stage: 0, // 游戏阶段 0:准备, 1:进行中，2:投票中， -1:已结束， 
        me: {},
        myCardShake: true,
        voterShake: true,
        isVoted: false, // 是否已投票
        voter: {}, // 当前的投票
        markerVisiable: false, // 身份标记器是否可见
        shareVisiable: false, // 分享弹窗
        descVisiable: false, // 角色介绍弹窗
        sheriff: "", // 警长
        roleDesc: "", // 角色介绍
        localstamp: "", // 本地标记
        donateList: [], // 捐助列表
    },
    ...openidBehavior.member,
    ...authorizeBehavior.member,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 同步openid
        this.syncOpenid()
        // 确认授权
        this.checkAuth(); 

        // 加入游戏
        const { tableId } = options;
        this.joinGame(tableId)
    },
    shakeMyCard(){
        this.setData({ myCardShake: false}, ()=>{
            this.setData({ myCardShake: true})
            shake()
        })
    },
    /**
     * 加入游戏
     */
    joinGame(tableId){
        console.log('join game')
        this.tableId = tableId;
        const { avatarUrl, nickName } = app.globalData.userInfo;
        // 获取openId
        getOpenId().then(userId => {
            this.userId = userId;
            api.donateList().then(list=>{
                this.setData({donateList: list})
            })
            // 加入游戏
            api.joinGame({ userId, tableId, name: nickName, avt: avatarUrl }).then((table) => {
                // 同步房间信息
                this.syncLocal(userId, table);
                // 连接服务器
                this.connect({ userId, tableId });
            }).catch(e=>{
                clearTimeout(this.beatTimer);
                console.log(e)
                showToast("加入游戏失败");
                //todo 重新加入
            });
        }).catch(e => {
            showToast('用户id 获取失败')
        })
    },
    goOut(){
        wx.navigateTo({
            url: '/pages/create/index',
        })
    },
    /**
     * 开始游戏
     */
    startGame(){
        this.setData({
            sheriff: "",
            localstamp: {}
        })
        const { seats, players, roleMap} = this.data;
        const roleCount = Object.values(roleMap).reduce((a, b) => a + b.count, 0);
        if(seats!==players.length) return showToast('座位未坐满，请调整座位或邀请玩家加入');
        // if (roleCount > seats) return showToast('角色牌过多');
        if (roleCount < seats) return showToast('角色牌太少');
        getOpenId().then(userId => {
            api.startGame({ userId, tableId: this.tableId }).then(table=>{
                // 同步房间信息
                this.syncLocal(userId, table);
            })
        })
    },

    /**
     * 重置游戏
     */
    resetGame() {
        this.setData({
            sheriff: "",
            localstamp: {}
        })
        getOpenId().then(userId => {
            api.resetGame({ userId, tableId: this.tableId }).then(table => {
                // 同步房间信息
                this.syncLocal(userId, table);
            })
        })
    },
    /**
     * 公布身份
     */
    openAllRoles(){
        getOpenId().then(userId => {
            api.openAllRoles({ userId, tableId: this.tableId }).then(table => {
                // 同步房间信息
                this.syncLocal(userId, table);
            })
        })
    },
    /**
     * 同步房间信息
     */
    syncLocal(userId, table){
        return new Promise((resolve, reject)=>{
            try{
                const { ownerId, player, roleMap, status, seats, roles, voter, sheriff } = table;
                // 座位
                this.seats = seats;
                // 我是谁
                const me = player.find(it => it.userId === userId) || {}
                // 法官
                const judge = player.find(it => it.isJudge) || {}
                // 玩家
                const players = player.filter(it => it.isPlayer);
                // 观众
                const viewers = player.filter(it => it.isViewer);
                // 活人
                const alives = players.filter(it=>it.alive)
                // 投票
                const { tickets, status: voteStatus, id: voteId } = voter;
                if (this.data.sheriff !== sheriff) this.shakeMyCard();
                if (this.data.me.alive !== me.alive) this.shakeMyCard();
                // 同步信息
                this.setData({
                    seats,
                    // 游戏阶段
                    stage: status,
                    // 观众列表
                    viewers,
                    // 玩家列表
                    players,
                    // 活人
                    alives,
                    // 法官
                    judge,
                    // 角色方案
                    roleMap: this.transformRoleMap(roleMap),
                    // 当前是否房主
                    isHost: ownerId === userId,
                    // 最近一次投票
                    voter,
                    // 我是否已投票
                    isVoted: !!tickets[userId] || tickets[userId] === null,
                    // 警长
                    sheriff,
                    // 我的信息
                    me,
                }, resolve);
            }catch(e){
                reject(e)
            }
        })
    },
    syncRemote(){
        return new Promise((resolve, reject)=>{
            getOpenId().then(userId => {
                api.getTable({ userId, tableId: this.tableId }).then(table => {
                    // 同步房间信息
                    this.syncLocal(userId, table).then(resolve).catch(reject);
                })
            }).catch(reject);
        })
        
    },
    /**
     * 事件路由
     */
    eventRouter(name, data) {
        switch(name){
            case "roleMap": // 角色方案变化
                this.setData({ roleMap: this.transformRoleMap(data) });
                break;
            case "stage": // 游戏阶段变化
                this.setData({ stage: data });
                break;
            case "sync": // 主动远程同步
                this.syncRemote();
                break;
            case "start": // 游戏开始，摇晃卡片
                this.syncRemote().then(()=>{
                    this.shakeMyCard();
                }).catch(e=>{
                    console.log(e)
                });
                break;
            case "pong": // 心跳
                this.pong = Date.now();
                break;
        }
    },
    /**
     * 转换角色方案
     */
    transformRoleMap(data){
        return Object.keys(roleMap).map(role=>{
            const count = data[role] || 0;
            return { ...roleMap[role], count, key:role}
        })
    },
    /**
     * 增加角色数量
     */
    increaseRole({ detail }){
        const roleMap = this.data.roleMap;
        const roleCount = roleMap.reduce((a, b)=>{
            return a + b.count;
        }, 0)
        const _roleMap = {}
        roleMap.map(role=>{
            _roleMap[role.key] = role.count;
        })
        
        let othersCount = roleCount - _roleMap.Wolf - _roleMap.Villager;

        switch (detail){
            case 'Wolf': 
                _roleMap.Wolf++;
                _roleMap.Villager = Math.max(1, this.data.seats - othersCount - _roleMap.Wolf);
                break;
            case 'Villager':
                _roleMap.Villager++;
                _roleMap.Wolf = Math.max(1, this.data.seats - othersCount - _roleMap.Villager);
                break;
            default: 
                if(_roleMap[detail]>0) {
                    _roleMap[detail] = 0;
                    othersCount -= 1;
                } else {
                    _roleMap[detail] = 1;
                    othersCount += 1;
                }
                _roleMap.Villager = Math.max(1, this.data.seats - othersCount - _roleMap.Wolf);
            break;
        }
        if (!(_roleMap.Wolf > 0)) return showToast('狼人数量必须大于1');
        if (!(_roleMap.Villager > 0)) return showToast('村民数量必须大于1');
        if (Object.values(_roleMap).reduce((a, b) => a + b, 0) > this.data.seats) {
            return
        }
        roleMap.map(role=>{
            role.count = _roleMap[role.key] || 0;
        })
        this.changeRoleCount(roleMap);
    },
    /**
     * 减少角色数量
     */
    // decreaseRole({ detail }){
    //     const roleMap = this.data.roleMap;
    //     const role = roleMap.find(it => it.key === detail);
    //     if(role.count<=0) return;
    //     role.count--;
    //     this.changeRoleCount(roleMap);
    // },
    /**
     * 修改角色方案
     */
    changeRoleCount(roleMap){
        this.setData({ roleMap });
        getOpenId().then(userId => {
            const data = {};
            roleMap.map(it=>{
                data[it.key] = it.count
            });
            api.updateTable({ 
                key: 'roleMap', 
                data, 
                userId, 
                tableId: this.tableId
            });
        })
    },

    /**
     * 连接服务器
     */
    connect({ userId, tableId }){
        if(!this.wss){
            // 建立服务器连接
            wsCommon.connect({ userId, tableId }).then((task)=>{
                this.wss = task;
                // 监听服务端消息
                this.wss.onMessage((message) => {
                    const { name, data } = JSON.parse(message.data);
                    this.eventRouter(name, data);
                });
                this.wss.onClose(() => {
                    this.wss = null
                })
                this.wss.onError(()=>{
                    this.wss = null
                    wx.closeSocket();
                })
                // 开始心跳
                this.beat();
            })
        }
    },
    /**
     * 心跳
     */
    beat(){
        const duration = 1 * 1000;
        const ping = ()=>{
            if(this.wss) this.wss.send({
                data: "ping"
            });
            clearTimeout(this.beatTimer);
            // 十秒钟之后检测 pong
            this.beatTimer = setTimeout(()=>{
                if (!this.pong) this.pong = Date.now();
                // debugger
                if((Date.now() - this.pong) >= duration * 3){
                    this.setData({
                        connected: false
                    })
                    this.joinGame(this.tableId)
                } else {
                    this.setData({
                        connected: true
                    })
                }
                ping();
            }, duration)
        }
        ping();
    },
    /**
     * 创建一个投票
     */
    createVote(){
      getOpenId().then(userId => {
        api.createVote({ userId, tableId: this.tableId }).then((table) => {
          this.syncLocal(userId, table)
        })
      })
    },
    /**
     * 完成投票时触发
     */
    onVote(e){
      const {vid, to} = e.detail;
      getOpenId().then(userId => {
        api.vote({ userId, tableId: this.tableId, vid, to }).then((table)=>{
          this.syncLocal(userId, table)
        })
      })
    },

    /**
     * 关闭投票时触发
     */
    onVoterClose(e){
      const { vid } = e.detail;
      getOpenId().then(userId => {
        api.closeVote({ userId, tableId: this.tableId, vid }).then((table) => {
          this.syncLocal(userId, table)
        })
      })
    },
    /**
     * 点击用户头像
     */
    showMarker({ detail }){
        // 游戏运行中可打开
        if(this.data.stage>0 || this.data.me.isJudge) {
            // 打开法官标记器
            this.setData({
                markerVisiable: true,
                markerTarget: detail,
            })
        }
        
    },
    /**
     * 打开分享
     */
    showShare({ detail }){
        this.setData({
            shareVisiable: true,
        })
    },
    /**
     * 隐藏分享
     */
    hideShare(){
        this.setData({
            shareVisiable: false,
        })
    },
    /**
     * 隐藏角色介绍
     */
    hideDesc() {
        this.setData({
            descVisiable: false,
        })
    },
    /**
     * 展示角色介绍
     */
    showDesc({ detail }){
        this.setData({
            descVisiable: true,
            roleDesc: `【${roleMap[detail].name}】:${roleMap[detail].desc}`
        })
    },
    /**
     * 隐藏标记器
     */
    hideMarker(){
        this.setData({
            markerVisiable: false,
            markerTarget: null,
        })
    },
    /**
     * 法官标记警长paplayerspsfdssf
     */
    markPlayer(e) {
        const type = e.currentTarget.dataset.type;
        const target = (this.data.markerTarget||{}).userId;
        this.hideMarker();
        getOpenId().then(userId => {
            api.markPlayer({ userId, tableId: this.tableId, target, type }).then((table) => {
                this.syncLocal(userId, table)
            })
        })
    },
    /**
     * 标记本地玩家
     */
    markLocal(e){
        const type = e.currentTarget.dataset.type;
        const target = (this.data.markerTarget || {}).userId;
        this.hideMarker();
        this.setData({
            localstamp: { ...this.data.localstamp, [target]: type}
        })
    },
    /**
     * 法官设置座位
     */
    onSeatChange(e){
        const value = e.detail;
        const {seats, players} = this.data;
        if (seats!=value && (value >= players.length) && (value <= 18)){
            getOpenId().then(userId => {
                api.updateTable({
                    key: 'seats',
                    data: Math.max(value, 1),
                    userId,
                    tableId: this.tableId
                }).then((table) => {
                    this.syncLocal(userId, table)
                });
            })
        }
    },
    /**
     * 显示时触发
     */
    onShow(){
        this.joinGame(this.tableId)
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        this.setData({
            shareVisiable: false,
        })
        return {
            title: `「${app.globalData.userInfo.nickName}」邀请你加入他的的游戏房间`,
            path:`/pages/ready/index?tableId=${this.tableId}`
        }
    }
})