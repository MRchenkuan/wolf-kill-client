Component({

	properties: {
		// 内联样式
		iStyle: {
			type: String,
			value: ''
		},
		// 用来初始化显示某个panel
		value: {
			type: String,
			value: ''
		},
		// tab标签数组
		menuList: {
			type: Array,
			value: []
		},
		align: {
			type: String,
			value: 'vertical'
		},
		height: {
			type: String,
			value:''
		},
		selectIndex: {
			type: Number,
			value: 0
		}
	},

	data: {
		menuInfo: [],
		tabIndex: 0,
		scrollLeft: 0,
		scrollTop: 0,
		width: 0,
		ml: 0,
		initMl: 0,
		initHl: 0,
		svHeight: 0,
		svWidth: 0,
		lastLeft: 0,
		lastWidth: 0,
		slideH: 0, // 滑块高度，竖直方向使用
	},
	ready() {
		const { align } = this.data;
		this.initInfo();
		if (align === 'horizontal') {
			this.initCal();
		} else if (align === 'vertical') {
			this.initVertical()
		}

		
	},
	observers: {
		'selectIndex': function( newV ) {
			const { menuInfo } = this.data;
			if (menuInfo[newV] && menuInfo[newV].top ) {
				this.changeTabFun(newV, menuInfo[newV].top);
			}
		}
	},
	methods: {
		initInfo() {
			const { menuList, menuInfo } = this.data;
			menuList.map( (item) => {
				let info = {};
				info.label = item.label;
				menuInfo.push( info );
			} );
			this.setData({ menuInfo } );
		},
		
		/**
		 * 垂直方向初始化
		 */
		initVertical() {
			wx.createSelectorQuery()
				.in(this)
				.selectAll('.menu__item')
				.boundingClientRect(rects => {
					const { menuInfo } = this.data;
					menuInfo.map((item, i) => {
						let info = {};
						item.top = rects[i].top;
					});

					this.setData({
						menuInfo
					});
				})
				// 设置第一个tab元素的top
				.select('.first')
				.boundingClientRect(rect => {
					this.setData({ initHl: rect.top });
				})
				.select('.menu__line__vertical')
				.boundingClientRect(rect => {
					this.setData({ slideH: rect.height });
				})
				// 获取tab外层滚动的view的宽度
				.select('.scroll-view__vertical')
				.boundingClientRect(rect => {
					this.setData({ svHeight: rect.height });
					const { selectIndex, menuInfo } = this.data;
					this.changeTabFun(selectIndex, menuInfo[selectIndex].top);
				})
				.exec();
		},

		/**
		 * @desc 水平 初始化tab及一些元素的计算
		 */
		initCal() {
			wx.createSelectorQuery()
				.in(this)
				.selectAll('.menu__item')
				.boundingClientRect(rects => {
					const { menuInfo } = this.data;
					menuInfo.map((item, i) => {
						let info = {};
						item.left = rects[i].left;
					});

					this.setData({
						menuInfo
					});
				})
				// 设置第一个tab元素的left
				.select('.first')
				.boundingClientRect(rect => {
					this.setData({ initMl: rect.left });
				})
				// 获取tab外层滚动的view的宽度
				.select('.scroll-view')
				.boundingClientRect(rect => {
					this.setData({ svWidth: rect.width });
					const { selectIndex, menuInfo } = this.data;
					this.changeTabFun(selectIndex, menuInfo[selectIndex].left);
				})
				.exec();
		},
		/**
		 * @desc 切换tab事件
		 */
		changeTab(event) {
			const { currentTarget: { dataset } } = event;
			const { align } = this.data;
			if (align === 'horizontal' ) {
				if (this.data.tabIndex === dataset.index) return;
				this.changeTabFun(dataset.index, dataset.left);
			} else {
				if (this.data.tabIndex === dataset.index) return;
				this.changeTabFun(dataset.index, dataset.top);
			}
		},
		/**
		 * @desc 切换tab事件，计算scroll-view显示位置
		 */
		changeTabFun(index, posi) {
			const { menuInfo, initMl, svWidth, menuList, align, svHeight, initHl, slideH } = this.data;
			menuInfo.map((item, i) => (item.active = i === index));
			this.setData({ menuInfo, tabIndex: index });
			wx.createSelectorQuery()
				.in(this)
				.select('.active')
				.boundingClientRect(rect => {
					// if ( !rect ) return;
					// 计算scrollleft
					if (align === 'horizontal') {
						const sc = posi - (svWidth - rect.width) / 2 - initMl;
						this.setData({
							width: rect.width,
							scrollLeft: sc
						});
						// 延迟底部横线切换效果
						setTimeout(() => {
							this.setData({
								ml: posi - initMl
							});
						}, 80);
					} else {
						const sc = posi - (svHeight - rect.height) / 2 - initHl;
						this.setData({
							scrollTop: sc
						});
						// 延迟底部横线切换效果
						setTimeout(() => {
							this.setData({
								ml: posi - initHl + (rect.height - slideH )/2
							});
						}, 80);
					}
				})
				.exec();

			this.triggerEvent('changeMenu', menuList[index] );
		}
	}
});