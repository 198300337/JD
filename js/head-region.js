import {
    area
} from "./heade-region-module.js";

$(function () {
    var arr = area;
    var $area = $(".nav .left li .dd .area");
    var str = "";
    for (let i = 0; i < arr.length; i++) {
        str += `<div class="item"><a href="#">${arr[i]}</a></div>`;
    }
    $area.html(str);

    let $span = $("#destination");
    let $Aitem = $(".nav ul.left li .dd .area .item>a");

    $Aitem.on("click", function () {
        $span.text($(this).text());
        $(this).css({
            backgroundColor: "#f10215",
            color: "#fff"
        })
        $(this).parent().addClass("index").siblings().removeClass("index");
        var att = $(this).parent().index()
        $.cookie("anniu", att);
        location.reload()
    });
    var all = $.cookie("anniu");
    var $li = $(".nav ul.left li .dd .area .item").eq(all).children("a")
    $li.css({
        backgroundColor: "#f10215",
        color: "#fff"
    });
    $span.text($li.text());
});

