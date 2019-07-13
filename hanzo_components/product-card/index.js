const SALE_STATUS = {
  WAITING: "WAITING", // 预售
  ACTIVE: "ACTIVE", // 正常
  SOLDOUT: "SOLDOUT", // 售罄
  OVER: "OVER", //  活动结束
  LACK: "LACK", // 缺货
};
const CARD_TYPE = {
    NORMAL: 'NORMAL',
    FRESH_HOUSE: 'FRESH_HOUSE',
    FRESH_ENTRY: "FRESH_ENTRY" // 仅作为入口
  }
var myPlayVideo = require('/behavior/playVideo.js');
Component({
  behaviors: [myPlayVideo],
  /**
   * 组件的属性列表
   */
  properties: {
    buyer: Array, // 购买记录
    cartCount: {type:Number,value:0}, // 购物车数量
    cover: String,
    follows: String,
    key: String, // 卡片ID
    limit: Number, // 个人限量
    marketPrice: String, // 市场价
    pickUpDate: String,
    preSaleDate: String,
    price: String, // 折后价
    saled: String, // 已售，销量
    saledTotle: String, // 已售
    skeleton: Boolean, // 是否骨架
    status: { type: String, value: SALE_STATUS.ACTIVE }, // 卡片状态
    statusText: { type: String, value: "加入购物车" }, // 卡片状态文字
    totle: Number, //库存、总量,
    timeOffset: Number, //修正本地时间
    title: String,
    type: { type: String, value: CARD_TYPE.NORMAL }, // 卡片类型，品牌馆卡片、普通商品
    vendor: String,
    video: String,
	isPraised: Boolean, // 是否已被赞
	viewNum: String,  // 播放次数
	likeNum: String, // 点赞次数
  },
  /**
   * 组件的初始数据
   */
  data: {
    aimateConfig: [],
	startAimate: false,
	isTouch: false
	},
	observers: {
		'isPraised': function (newV) {
			const { menuInfo } = this.data;
			if ( newV ) {
				this.setData({
					aimateConfig: [],
					startAimate: false,
					isTouch: true
				});
			} else {
				this.lovesConfig();
			}
		}
	},
	ready() {
		const { video, isPraised } = this.data;
		if (video && !isPraised ) {
			this.lovesConfig();
		}
	},
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 事件相关处理函数
     */
    // 购物车增加
    onAdd(e) {
      this.triggerEvent("cart-add", { cart: e.detail, key: this.data.key }, this.data);
    },
    // 购物车减少
    onReduce(e) {
      this.triggerEvent("cart-reduce", { cart: e.detail, key: this.data.key }, this.data);
    },
    // 封面点击
    onCoverClick(e) {
      this.triggerEvent("cover-click", this.data.key, this.data);
    },
    onBtnClick(e) {
      this.triggerEvent("btn-click", this.data.key, this.data);
    },
    // 封面图长按
    onCoverPress(e, duration) {
      if (this.data.playStatus > 1) {
        return;
      }
      this.triggerEvent("cover-press", this.data.cover, this.data);
      let url = [e.currentTarget.dataset.src];
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: url // 需要预览的图片http链接列表
      });
    },
    // 查看购买者
    onBuyerClick(e) {
      this.triggerEvent("buyer-click", this.data.key, this.data);
    },
	// 点赞
	giveaLike() {
		this.triggerEvent("love-click", this.data.key, this.data);
	},
	// 生成冒泡爱心的配置
	lovesConfig() {
		let aimateConfig = [];
		let aimateColor = ['#947cff', '#f62b48', '#ffe27c', '#f42bf6'];
		for (var i = 0; i < 6; i++) {
			let config = {};
			config.time = parseInt(Math.random() * (1000 - 0 + 1) + 0, 10) + 'ms';
			config.color = aimateColor[parseInt(Math.random() * (3 - 0 + 1) + 0, 10)];
			config.top = parseInt(Math.random() * (10 - 0 + 1) + 0, 10) + 'rpx';
			config.left = parseInt(Math.random() * (10 - 0 + 1) + 0, 10) + 'rpx';
			aimateConfig.push(config);
		}
		this.setData({
			aimateConfig,
			startAimate: true,
			isTouch: false
		});
	}
  }
});
