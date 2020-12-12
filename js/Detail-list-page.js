$(function() {
    let stt = location.search.split("=")[1];
    let sec = location.hash.split("#")[1];
    // console.log(sec);
    // console.log(stt);

    //http://jx.xuzhixiang.top/ap/api/detail.php 获取商品详情

    $.get(
        "http://jx.xuzhixiang.top/ap/api/detail.php", {
            id: stt,
        },
        (date) => {
            console.log(date);
            pdesc: "米多奇";
            pid: "285322";
            pimg: "image/05.webp";
            pname: "零食饮料";
            pprice: "79.00";
            uid: "38472";
            $(".details .title").html(date.data.pdesc);
            $(".banner #midArea img").attr("src", date.data.pimg);
            $(".banner #bigArea img").attr("src", date.data.pimg);
            $(".details .money i").html(date.data.pprice);
        }
    );
    var $jia = $("#btn .num .btn-jia");
    var $jian = $("#btn .num .btn-jian");
    var $btn = $("#btn .num button");
    var $vale = $("#btn .num input");
    let a = 1;
    $jia.on("click", function() {
        a++;
        if (a >= 1) {
            $jian.css("backgroundColor", "#F1F1F1");
        }
        $vale.val(a);
    });

    $jian.on("click", function() {
        a--;
        if (a <= 1) {
            a = 1;
            $(this).css("backgroundColor", "#E33333");
            // $(this).off("click");
        }

        $vale.val(a);
    });
    //http://jx.xuzhixiang.top/ap/api/cart-list.php--查询购物车
    /*uid  用户id
      pid  商品id*/
    //http://jx.xuzhixiang.top/ap/api/add-product.php添加购物车
    /*   uid  用户id
      pid  商品id
      pnum  要添加的商品数量*/
    $btn.on("click", function() {
        $.get(
            "http://jx.xuzhixiang.top/ap/api/add-product.php", {
                uid: sec,
                pid: stt,
                pnum: $vale.val(),
            },
            (date) => {
                console.log(date);
            }
        );

        $.get(
            "http://jx.xuzhixiang.top/ap/api/cart-list.php", { id: sec },
            (datel) => {
                console.log(sec);
                console.log(datel);
            }
        );

        alert("添加成功，即将跳转跳转购物车...");
        location.href = "cart.html?id=" + sec + "";
    });
});