const util = require('../../utils/util.js')

const app = getApp()

Page({
	data: {
		scrollTop: 100,
		newestArticles:[],	// 最新文章
		hotArticles: []		// 热门文章
	},
	// 调整接口获取到的文章数据
	fixArticlesInfo: (articles) => {
		articles.map((obj,i) => {
			let icon = obj.userColumn.user.iconPath;

			// 用户有头像显示用户头像，没有显示默认头像
			obj.iconPath = icon ? app.url + icon : "/images/default_icon.png"; 
			// 计算文章发表时间已过多久
			obj.gmtCreate = util.CountAgo(obj.gmtCreate);
			
			return obj;
		});

		return articles;
	},
	onLoad: function () {
		// 请求最新文章信息
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

		// 请求热门文章信息
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
