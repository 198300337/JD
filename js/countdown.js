window.onload = function() {
    function js(predict) {
        let oSpan = document.querySelectorAll(".seckill span");
        let timer = new Date();
        let oSum = Math.floor((predict - timer) / 1000);
        let oHour = Math.floor(oSum / 60 / 60);
        let oMinute = Math.floor(oSum / 60 % 60);
        let oSecond = Math.floor(oSum % 60);
        oHour = oHour < 10 ? "0" + oHour : oHour;
        oMinute = oMinute < 10 ? "0" + oMinute : oMinute;
        oSecond = oSecond < 10 ? "0" + oSecond : oSecond;
        oSpan[0].innerHTML = oHour;
        oSpan[1].innerHTML = oMinute;
        oSpan[2].innerHTML = oSecond;
        if (oSum <= 0) {
            clearInterval(timers);
            location.href = "../html/login.html";
        }
    }
    var predict = new Date("2020-12-13 00:00:00");
    var timers = setInterval(function() {
        js(predict)
    }, 1000);
}