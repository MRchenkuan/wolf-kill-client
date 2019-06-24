// pages/ready/index.js
import { commonApi as api, commonSocket as wsCommon } from '../../api/index.js'
import { showToast, getOpenId} from '../../utils/index.js';
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
        this.tableId = tableId;
        this.joinGame(tableId)
    },
    shakeMyCard(){
        this.setData({ myCardShake: false}, ()=>{
            this.setData({ myCardShake: true})
            wx.vibrateShort()
        })
    },
    /**
     * 加入游戏
     */
    joinGame(tableId){
        const { avatarUrl, nickName } = app.globalData.userInfo;
        // 获取openId
        getOpenId().then(userId => {
            // 加入游戏
            api.joinGame({ userId, tableId, name: nickName, avt: avatarUrl }).then((table) => {
                // 同步房间信息
                this.syncLocal(userId, table);
                // 监听服务器信息
                this.connect({ userId, tableId });
            }).catch(e=>{
                console.log(e)
                showToast("加入游戏失败");
                //todo 重新加入
            });
        }).catch(e => {
            showToast('用户id 获取失败')
        })
    },

    /**
     * 开始游戏
     */
    startGame(){
        const { seats, players, roleMap} = this.data;
        const roleCount = Object.values(roleMap).reduce((a, b) => a + b.count, 0);
        if(seats!==players.length) return showToast('玩家数与座位数不匹配，请调整座位');
        if (roleCount > seats) return showToast('角色牌过多');
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
                    isVoted: !!tickets[userId],
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
        // 建立服务器连接
        this.wss = wsCommon.connect({ userId, tableId });
        // 监听服务端消息
        this.wss.onMessage((message) => {
            const { name, data } = JSON.parse(message.data);
            this.eventRouter(name, data);
        });
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
     * 法官设置座位
     */
    onSeatChange(e){
        const value = e.detail;
        const {seats, players} = this.data;
        if (seats!=value && (value >= players.length) && (value <= 14)){
            getOpenId().then(userId => {
                api.updateTable({
                    key: 'seats',
                    data: value,
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

    }
})