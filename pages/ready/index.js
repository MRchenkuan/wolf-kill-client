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
        players:[],
        roles: [], // 角色列表
        roleMap: [], // 角色方案
        stage: 0, // 游戏阶段 0:准备, 1:进行中，2:投票中， -1:已结束， 
        me: {},
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
        // this.joinGame(tableId)
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
        getOpenId().then(userId => {
            api.startGame({ userId, tableId: this.tableId }).then(table=>{
                // 同步房间信息
                this.syncLocal(userId, table);
            })
        })
    },
    /**
     * 同步房间信息
     */
    syncLocal(userId, table){
        const { ownerId, player, roleMap, status, seats, roles } = table;
        // 座位
        this.seats = seats;
        // 我是谁
        const me = player.find(it => it.userId === userId) || {}
        // 同步信息
        this.setData({
            // 游戏阶段
            stage: status,
            // 玩家列表
            players: player.filter(it=>!it.isJudge),
            // 法官
            judge: player.find(it=>it.isJudge),
            // 角色方案
            roleMap: this.transformRoleMap(roleMap),
            // 当前是否房主
            isHost: ownerId === userId,
            // 我的信息
            me,
        });
    },
    pullRemote(){
        getOpenId().then(userId => {
            api.getTable({ userId, tableId: this.tableId }).then(table=>{
                // 同步房间信息
                this.syncLocal(userId, table);
            })
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
                this.pullRemote();
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
        if (roleCount >= this.data.seats) return showToast('请减少其他身份');
        roleMap.find(it => it.key === detail).count++
        this.changeRoleCount(roleMap);
    },
    /**
     * 减少角色数量
     */
    decreaseRole({ detail }){
        const roleMap = this.data.roleMap;
        const role = roleMap.find(it => it.key === detail);
        if(role.count<=0) return;
        role.count--;
        this.changeRoleCount(roleMap);
    },
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
        // todo sync remote
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
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (this.tableId) this.joinGame(this.tableId)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})