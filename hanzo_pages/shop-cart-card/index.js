/**
 * shop-cart-card 组件演示页面
 */

Page({
    data: {
        editStatus:false, // 是否编辑
        list: [
            {
                key: 1,
                checked: true,
                disabled: false,
                status: 'SOLDOUT',
                title: '三文鱼 一斤装',
                cover: 'http://frxs-devevn2018.oss-cn-shenzhen.aliyuncs.com/productMainImg/20190226/100percent_03c2a055-41a4-4568-9306-6c10721306761551162131538.jpg',
                info: '该商品不在您的自提门店配送范围内',
                tag: '',
                vendor: 'UAT789专供',
                price: 0.02,
                marketPrice: null,
                cartCount: 5,
                // slot 读取字段
                cell: '一斤装每份'
            },
            {
                key: 2,
                checked: true,
                status: '',
                title: '乔帮主约了花花仙子食在农帮主 新鲜黄牛肉 约400g/份',
                cover: 'http://frxs-devevn2018.oss-cn-shenzhen.aliyuncs.com/productMainImg/20190225/100percent_ad583582-f6d2-40b7-b744-6434dd9a821b1551075460833.jpg',
                info: '该商品将于20:30:00开售',
                tag: 'https://yd.frxs.cn/static/images/inseasonicon.png',
                vendor: 'UAT789专供',
                price: 10.00,
                marketPrice: 20.00,
                cartCount: 2,
                // slot 读取字段
                cell: '一斤装每份一斤装每份一斤装每份一斤装每份一斤装每份一斤装每份一斤装每份一斤装每份一斤装每份'
            },
            {
                key: 3,
                checked: false,
                disabled: false,
                status: 'LACK',
                title: '食在农帮主 黄牛肉 约400g/份',
                cover: 'http://frxs-devevn2018.oss-cn-shenzhen.aliyuncs.com/productMainImg/20190225/100percent_ad583582-f6d2-40b7-b744-6434dd9a821b1551075460833.jpg',
                info: '',
                tag: '',
                vendor: 'UAT789专供',
                price: 5.00,
                marketPrice: 30.00,
                cartCount: 1,
                // slot 读取字段
                cell: '一斤装每份'
            },
            {
                key: 4,
                checked: false,
                disabled: true,
                status: 'OVER',
                title: '食在农帮主 黄牛肉 约400g/份',
                cover: 'http://frxs-devevn2018.oss-cn-shenzhen.aliyuncs.com/productMainImg/20190225/100percent_ad583582-f6d2-40b7-b744-6434dd9a821b1551075460833.jpg',
                info: '',
                tag: '',
                vendor: 'UAT789专供',
                price: 5.00,
                marketPrice: 30.00,
                cartCount: 1,
                // slot 读取字段
                cell: '一斤装每份'
            },
            {
                key: 5,
                checked: false,
                disabled: false,
                status: '',
                title: '三文鱼 一斤装',
                cover: 'http://frxs-devevn2018.oss-cn-shenzhen.aliyuncs.com/productMainImg/20190226/100percent_03c2a055-41a4-4568-9306-6c10721306761551162131538.jpg',
                info: '该商品不在您的自提门店配送范围内',
                tag: '',
                vendor: 'UAT789专供',
                price: 0.02,
                marketPrice: null,
                cartCount: 5,
                // slot 读取字段
                cell: '一斤装每份'
            },
            {
                key: 6,
                checked: false,
                disabled: false,
                status: '',
                title: '三文鱼 一斤装',
                cover: 'http://frxs-devevn2018.oss-cn-shenzhen.aliyuncs.com/productMainImg/20190226/100percent_03c2a055-41a4-4568-9306-6c10721306761551162131538.jpg',
                info: '该商品不在您的自提门店配送范围内',
                tag: '',
                vendor: 'UAT789专供',
                price: 0.02,
                marketPrice: null,
                cartCount: 5,
                // slot 读取字段
                cell: '一斤装每份'
            },
            {
                key: 7,
                checked: false,
                disabled: false,
                status: '',
                title: '三文鱼 一斤装',
                cover: 'http://frxs-devevn2018.oss-cn-shenzhen.aliyuncs.com/productMainImg/20190226/100percent_03c2a055-41a4-4568-9306-6c10721306761551162131538.jpg',
                info: '',
                tag: '',
                vendor: 'UAT789专供',
                price: 0.02,
                marketPrice: null,
                cartCount: 5,
                // slot 读取字段
                cell: '一斤装每份'
            },
            {
                key: 8,
                checked: false,
                disabled: false,
                status: '',
                title: '三文鱼 一斤装',
                cover: 'http://frxs-devevn2018.oss-cn-shenzhen.aliyuncs.com/productMainImg/20190226/100percent_03c2a055-41a4-4568-9306-6c10721306761551162131538.jpg',
                info: '',
                tag: '',
                vendor: 'UAT789专供',
                price: 0.02,
                marketPrice: null,
                cartCount: 5,
                // slot 读取字段
                cell: '一斤装每份'
            },
            {
                key: 9,
                checked: false,
                disabled: false,
                status: '',
                title: '三文鱼 一斤装',
                cover: 'http://frxs-devevn2018.oss-cn-shenzhen.aliyuncs.com/productMainImg/20190226/100percent_03c2a055-41a4-4568-9306-6c10721306761551162131538.jpg',
                info: '',
                tag: '',
                vendor: 'UAT789专供',
                price: 0.02,
                marketPrice: null,
                cartCount: 5,
                // slot 读取字段
                cell: '一斤装每份'
            },
        ],
        isSelectedAll:false, // 是否全选
        totalPrice: 0
    },
    onLoad(options) {

    },
    onReady() {

    },
    onShow() {
        this.countTotalPrice();
    },
    onHide() {

    },
    onUnload() {

    },
    /*******业务逻辑*******/
    /**
     * 购物车商品列表状态检测
     */
    checkGoodsStatus(){
        let changeData = null;
        this.data.list.forEach((item,index) => {
            const currentStatus = item.status;
            if(currentStatus==='SOLDOUT' || currentStatus==='LACK' || currentStatus==='OVER'){
                if(!changeData){
                    changeData = {}
                }
                changeData[`list[${index}].checked`]= false;
                changeData[`list[${index}].disabled`]= true;
            }
        });
        if(changeData && Object.keys(changeData).length>0){
            this.setData(changeData);
        }
    },
    /**
     * 计算总价
     */
    countTotalPrice() {
        let totalPrice = 0;
        this.checkGoodsStatus();
        this.data.list.forEach(item => {
            if (!item.checked) {
                return
            }
            const price = item.price;
            const num = item.cartCount;
            let goodsPrice = num * price;
            if (!isNaN(goodsPrice)) {
                totalPrice += goodsPrice;
            } else {
                console.warn('checkTotalPrice 计算总价出错了!')
                return 0
            }
        });
        if(!isNaN(totalPrice)){
            this.setData({
                totalPrice:totalPrice.toFixed(2)
            })
        }else {
            console.warn('countTotalPrice error!',totalPrice)
        }
    },
    /*******交互事件*******/
    onScrollWrap() {

    },
    onScrollUpper() {

    },
    onScrollLower() {

    },
    // 提交数据
    onSubmit(){
        const selectedList =  this.data.list.filter(item=> item.checked===true);
        console.log('==选中的商品==',selectedList);
        if(!this.data.editStatus){
            // 提交到订单
            console.log('==提交到订单==');
        }else {
            // 删除状态
            console.log('==删除状态==');
        }
    },
    // 全选
    onSelectAll(){
        let changeData = {
            'isSelectedAll':!this.data.isSelectedAll
        };
        this.data.list.forEach((item,index)=>{
            changeData[`list[${index}].checked`]= !this.data.isSelectedAll;
        });
        this.setData(changeData,function () {
            this.countTotalPrice();
        });
    },
    // 切换，编辑
    onSwitchEdit() {
        const editStatus = this.data.editStatus;
        let changeData = {
            'editStatus':!editStatus
        };
        this.data.list.forEach((item,index)=>{
            changeData[`list[${index}].checked`]= editStatus;
        });
        this.setData(changeData);
        this.countTotalPrice();
    },
    onTap(data) {
        console.log('==onTap====', data.detail);
    },
    onCheck(data) {
        const _index = data.currentTarget.id;
        const goods = data.detail.item;
        const isChecked = goods.checked;
        if (goods.disabled) {
            return
        }
        this.setData({
            [`list[${_index}].checked`]: !isChecked
        });
        this.countTotalPrice();
    },
    onAdd(data) {
        const val = data.detail.val + 1;
        // const key = data.detail.key;
        // const goods = data.detail.item;
        const _index = data.currentTarget.id;
        this.setData({
            [`list[${_index}].cartCount`]: val
        });
        this.countTotalPrice();
    },
    onReduce(data) {
        if (data.detail.val <= 1) {
            return
        }
        const val = --data.detail.val;
        const _index = data.currentTarget.id;
        this.setData({
            [`list[${_index}].cartCount`]: val
        });
        this.countTotalPrice();
    },
    onChange(data) {
        const changeVal = data.detail.val;
        const _index = data.currentTarget.id;
        this.setData({
            [`list[${_index}].cartCount`]: changeVal
        });
        this.countTotalPrice();
    },
    onBlur(data) {
        // console.log('==onBlur====',data.detail);
    },
    onFocus(data) {
        //console.log('==onFocus====',data.detail);
    },
    onDel(data){
        console.log('==onDel====',data.detail);
    }
});
