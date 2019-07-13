// hanzo_components/search/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		cartCount: {
			type: Number
		},
		type: {
			type: String,
			value: 'cart'
		}
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
		handleSearchBlur(e) {
			this.triggerEvent('search-blur', e.detail.value)
		},
		bindSearch(e) {
			this.triggerEvent('search-confirm', e.detail.value)
		},
		handleFocusSearch(e) {
			this.triggerEvent('search-focus', e.detail.value)
		},
		searchText(e) {
			this.triggerEvent('search-input', e.detail.value);
		},
		bindToCart(e) {
			this.triggerEvent('to-cart', e);
		},
		handlesearch(e) {
			this.triggerEvent('search-click', e);
		}
	}
})
