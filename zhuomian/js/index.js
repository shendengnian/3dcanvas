//获取类名
var wrap = document.querySelector(".wrap");
var next = document.querySelector(".arrow_right");
var prev = document.querySelector(".arrow_left");

//绑定点击事件
next.onclick = function() {
	next_pic();
}
prev.onclick = function() {
	prev_pic();
}

//左右轮播
function next_pic() {
	var newTop = parseInt(wrap.style.top) - 13;
	wrap.style.top = newTop + "rem";
}

function prev_pic() {
	var newTop = parseInt(wrap.style.top) + 13;
	wrap.style.top = newTop + "rem";
}

function next_pic() {
	index++;
	if(index > 4) {
		index = 0;
	}
	showCurrentDot();
	var newTop;
	if(wrap.style.top === "-78rem") {
		newTop = -26;
	} else {
		newTop = parseInt(wrap.style.top) - 13;
	}
	wrap.style.top = newTop + "rem";
}

//无缝轮播
function prev_pic() {
	index--;
	if(index < 0) {
		index = 4;
	}
	showCurrentDot();
	var newTop;
	if(wrap.style.top === "0rem") {
		newTop = -52;
	} else {
		newTop = parseInt(wrap.style.top) + 13;
	}
	wrap.style.top = newTop + "rem";
}

//自动轮播
var timer = null;

function autoPlay() {
	timer = setInterval(function() {
		next_pic();
	}, 4000);
}
autoPlay();

//鼠标经过停止自动轮播,移开便开始自动轮播
var container = document.querySelector(".container");
container.onmouseenter = function() {
	clearInterval(timer);
}
container.onmouseleave = function() {
	autoPlay();
}
//圆点轮播
var index = 0;
var dots = document.getElementsByTagName("span");

function showCurrentDot() {
	for(var i = 0, len = dots.length; i < len; i++) {
		dots[i].className = "";
	}
	dots[index].className = "on";
}

for(var i = 0, len = dots.length; i < len; i++) {
	(function(i) {
		dots[i].onclick = function() {
			var dis = index - i;
			if(index == 4 && parseInt(wrap.style.top) !== -65) {
				dis = dis - 5;
			}
			//和使用prev和next相同，在最开始的照片5和最终的照片1在使用时会出现问题，导致符号和位数的出错，做相应地处理即可
			if(index == 0 && parseInt(wrap.style.top) !== -13) {
				dis = 5 + dis;
			}
			wrap.style.top = (parseInt(wrap.style.top) + dis * 13) + "rem";
			index = i;
			showCurrentDot();
		}
	})(i);
}

$(function() {
	// 页数
	var page = 0;
	// 每页展示10个
	var size = 10;
	// dropload
	$('.content').dropload({
		scrollArea: window,
		domUp: {
			domClass: 'dropload-up',
			domRefresh: '<div class="dropload-refresh">↓下拉刷新-自定义内容</div>',
			domUpdate: '<div class="dropload-update">↑释放更新-自定义内容</div>',
			domLoad: '<div class="dropload-load"><span class="loading"></span>加载中-自定义内容...</div>'
		},
		domDown: {
			domClass: 'dropload-down',
			domRefresh: '<div class="dropload-refresh">↑上拉加载更多-自定义内容</div>',
			domLoad: '<div class="dropload-load"><span class="loading"></span>加载中-自定义内容...</div>',
			domNoData: '<div class="dropload-noData">暂无数据-自定义内容</div>'
		},
		loadUpFn: function(me) {
			$.ajax({
				type: 'GET',
				url: 'json/update.json',
				dataType: 'json',
				success: function(data) {
					var result = '';
					for(var i = 0; i < data.lists.length; i++) {
						result += '<a class="item opacity" href="' + data.lists[i].link + '">' +
							'<img src="' + data.lists[i].pic + '" alt="">' +
							'<h3>' + data.lists[i].title + '</h3>' +
							'<span class="date">' + data.lists[i].date + '</span>' +
							'</a>';
					}
					// 为了测试，延迟1秒加载
					setTimeout(function() {
						$('.lists').html(result);
						// 每次数据加载完，必须重置
						me.resetload();
						// 重置页数，重新获取loadDownFn的数据
						page = 0;
						// 解锁loadDownFn里锁定的情况
						me.unlock();
						me.noData(false);
					}, 1000);
				},
				error: function(xhr, type) {
					alert('Ajax error!');
					// 即使加载出错，也得重置
					me.resetload();
				}
			});
		},
		loadDownFn: function(me) {
			page++;
			// 拼接HTML
			var result = '';
			$.ajax({
				type: 'GET',
				url: 'http://ons.me/tools/dropload/json.php?page=' + page + '&size=' + size,
				dataType: 'json',
				success: function(data) {
					var arrLen = data.length;
					if(arrLen > 0) {
						for(var i = 0; i < arrLen; i++) {
							result += '<a class="item opacity" href="' + data[i].link + '">' +
								'<img src="' + data[i].pic + '" alt="">' +
								'<h3>' + data[i].title + '</h3>' +
								'<span class="date">' + data[i].date + '</span>' +
								'</a>';
						}
						// 如果没有数据
					} else {
						// 锁定
						me.lock();
						// 无数据
						me.noData();
					}
					// 为了测试，延迟1秒加载
					setTimeout(function() {
						// 插入数据到页面，放到最后面
						$('.lists').append(result);
						// 每次数据插入，必须重置
						me.resetload();
					}, 1000);
				},
				error: function(xhr, type) {
					alert('Ajax error!');
					// 即使加载出错，也得重置
					me.resetload();
				}
			});
		},
		threshold: 50
	});
});