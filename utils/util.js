const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

const CountAgo = timestamp => {
	var now = new Date().getTime() / 1000;
	var delta = now - timestamp;

	if(delta<=0){
		return "刚刚";
	}

	var year = delta / (31536000);
	if(year > 1){
		return Math.round(year) + "年前";
	}else{
		var month = delta / (2592000);
		if(month > 1){
			return Math.round(month) + "个月前";
		}else{
			var day = delta / (86400);
			var week = day / 7;
			if(week > 1){
				return Math.round(week) + "周前";
			}else if(day > 1){
				return Math.round(day) + "天前";
			}else{
				var hour = delta / (3600);
				if(hour > 1){
					return Math.round(hour) + "小时前";
				}else{
					var minute = delta / (60);
					if(minute > 1){
						return Math.round(minute) + "分钟前";
					}else{
						return Math.round(delta) + "秒前";
					}
				}
			}
		}
	}
}

module.exports = {
	formatTime: formatTime,
	CountAgo : CountAgo
}
