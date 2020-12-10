$(function () {

    let $li=$(".cw-icon").parent("li");
    $li.css({
        "height":"29px",
        "border":"1px solid transparent",
        "border-bottom":"none"
    });
    $li.on("mouseenter",function () {
        $(this).css({
            backgroundColor:"#fff",
            "border":"1px solid #ccc",
            "border-bottom-color":"#fff"
        })
        $(this).children(".dd").show()
    }).mouseleave(function () {
        $(this).css({
            "backgroundColor":"#E3E4E5",
            "border-color":"transparent",
        })
        $(this).children(".dd").hide()
    });


let $list=$(".nav .left>li").hover(function (){
    $(this).css({
        "backgroundColor":"#fff",
        "border":"1px solid #ccc",
        "border-bottom-color":"transparent",
    })
},function () {
    $(this).css({
        "backgroundColor":"#E3E4E5",
        "border-color":"transparent",
        "border-bottom":"none"
    })
});








});
