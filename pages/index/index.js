const util = require('../../utils/util.js')

const app = getApp()

Page({
	data: {
		scrollTop: 100,
		newestArticles:[],
		hotArticles: []
	},
	fixArticlesInfo: (articles) => {
		articles.map((obj,i) => {
			let icon = obj.userColumn.user.iconPath;

			obj.iconPath = icon ? app.url + icon : "/images/default_icon.png"; 
			obj.gmtCreate = util.CountAgo(obj.gmtCreate);
			return obj;
		});

		return articles;
	},
	onLoad: function () {
		wx.request({
			url: app.url + "api/article/all",
			data: {
				page:0,
				size:8
			},
			success: (res) => {
				let result = res.data;

				if(result && result.size > 0){
					this.setData({
						newestArticles: this.fixArticlesInfo(result.content)
					});
				}
			}
		});

		wx.request({
			url: app.url + "api/article/hot",
			data: {
				page:0,
				size:8
			},
			success: (res) => {
				let result = res.data;

				if(result && result.size > 0){
					this.setData({
						hotArticles: this.fixArticlesInfo(result.content)
					});
				}
			}
		})
	},
	upper: function(e) {
		console.log(e)
	},
	lower: function(e) {
		console.log(e)
	}
})
