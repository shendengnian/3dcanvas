$(document).ready(function() {
    animate();
});

function animate() {
    $('div>div>div>div').each(function() {
        $(this).css({
            position: 'relative',
            top: '-400px',
            opacity: 0
        });
        var wait = Math.floor((Math.random() * 3000) + 1);
        $(this).delay(wait).animate({
            top: '0px',
            opacity: 1
        }, 2000, function() {
            $(this).delay(wait).animate({
                top: '50px',
                opacity: 0
            }, 1000, function() {
                $(this).delay(wait).animate({
                    top: '0px',
                    opacity: 1
                }, 500);


            });
        });
    });
    $('span').each(function() {
        $(this).css({
            position: 'relative',
            top: '-200px',
            opacity: 0
        });
        var wait = Math.floor((Math.random() * 3000) + 1);
        $(this).delay(wait).animate({
            top: '0px',
            opacity: 1
        }, 2000, function() {
            $(this).delay(wait).animate({
                top: '50px',
                opacity: 0
            }, 1000, function() {
                $(this).delay(wait).animate({
                    top: '0px',
                    opacity: 1
                }, 500);
            });
        });
    });
}

setTimeout(function() {
    $("a").css({
        position: 'relative',
        left: '-400px',
        opacity: 0
    });
    $("a").animate({
        left: '0px',
        opacity: 1
    }, 2000);
}, 5000)
$("#bofang").click(function() {
    animate();
});



$("#audio_btn").click(function() {
    var music = document.getElementById("music");
    if (music.paused) {
        music.play();
        $("#audio_btn").html("点击关闭背景音乐");
    } else {
        music.pause();
        $("#audio_btn").html("点击播放背景音乐");
    }
});