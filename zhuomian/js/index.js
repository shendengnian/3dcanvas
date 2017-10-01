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
	}, 3000);
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