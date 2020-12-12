$(function() {

    let stt = location.search.split("=")[1];
    let $titleH = $(".banner .title h2 i");
    let asa = 0;
    let aa = 0;


    //查询用户购物车中的商品 接口
    // 
    // 接口地址：http://jx.xuzhixiang.top/ap/api/cart-list.php
    // 接口请求方式：get
    // 接口参数：
    //      id  用户id
    //     console.log(stt);
    var str = "";
    var scc = "";
    $.get("http://jx.xuzhixiang.top/ap/api/cart-list.php", {
        id: stt
    }, date => {

        // console.log(date);
        for (let i = 0; i < date.data.length; i++) {
            // console.log(date.data[i].id, date.data[i].pid)


            str += `<div class="list-item clean" date-id="${date.data[i].pid}">
                <div class="cell chec">
                    <input type="checkbox">
                </div>
                <div class="cell list-single">
                    <div class="item-img">
                        <img alt="" src="${date.data[i].pimg}">
                    </div>
                    <div class="item-name">
                        <p>${date.data[i].pname}</p>
                    </div>

                </div>
                <div class="cell item-props"></div>
                <div class="cell item-unitPrice">
                    <p>${date.data[i].pprice}</p>
                </div>
                <div class="cell item-num">
                    <div class="item-num-val">
                        <a href="javascript:void(0);" class="jia">+</a>
                        <input type="text" value="${date.data[i].pnum}" class="vale">
                        <a href="javascript:void(0);" class="jian">-</a>
                    </div>
                </div>
                <div class="cell subtotal">
                    <strong>￥ <i>${date.data[i].pprice * date.data[i].pnum}</i></strong>
                </div>
                <div class="cell operator">
                    <a href="javascript:void(0)">删除</a>
                </div>

            </div>`
        }

        $(".cart .cart-list").html(str);
        let $money = $(".banner .cart-list .list-item strong i");
        // console.log($money);

        //全部商品共--$cartItem.length
        let $cartItem = $(".banner .cart .cart-list .list-item");
        $titleH.html($cartItem.length);

        // 全选/全不选
        let $checkAll = $(".banner .cart .cart-thead .cart-checkAll input");
        // console.log($checkAll);
        let $cartItemCheck = $(".banner .cart .cart-list .list-item .chec input");
        let num = 0;

        $checkAll.on("click", function() {
            $cartItemCheck.prop("checked", $checkAll.prop("checked"))
            fz();
            console.log(num);
        });
        $cartItemCheck.on("click", function() {
            var flag = $cartItemCheck.length;
            var checkedTrue = $(".banner .cart .cart-list .list-item .chec input:checked").length
            $checkAll.prop("checked", flag == checkedTrue);
            // console.log(flag == checkedTrue);
            // console.log(checkedTrue);

            fz();
        });

        //总价


        let $jia = $(".jia");
        let $jian = $(".jian");
        let $vale = $(".vale");
        let $subtotal = $(".cart-list .subtotal");
        let $unitPrice = $(".item-unitPrice p");
        // console.log($unitPrice);


        //加  减  按钮
        for (let j = 0; j < $jia.length; j++) {
            // console.log($($jia[j]));
            $($jia[j]).on("click", function() {
                console.log(date.data[j].id);
                asa = $vale.eq(j).val();
                asa++;
                $jian.css("backgroundColor", "#fff");
                $vale.eq(j).val(asa);
                $subtotal.eq(j).html("￥" + $vale.eq(j).val() * parseInt($unitPrice.eq(j).html()));
                fz();
                $.ajax({
                    url: "http://jx.xuzhixiang.top/ap/api/cart-update-num.php",
                    type: "GET",
                    data: {
                        uid: date.data[j].uid,
                        pid: date.data[j].pid,
                        pnum: asa
                    },
                    success: (leftss) => {
                        console.log(leftss)
                    }
                })
            });


            // $subtotal.eq(j).html("￥"+$vale.eq(j).val()*parseInt($unitPrice.eq(j).html()));
            $($jian[j]).on("click", function() {

                asa = $vale.eq(j).val();
                asa--;
                if (asa <= 1) {
                    asa = 1;
                    $(this).css("backgroundColor", "#E33333")
                }
                $vale.eq(j).val(asa);
                $subtotal.eq(j).html("￥" + $vale.eq(j).val() * parseInt($unitPrice.eq(j).html()));
                fz();
                $.ajax({
                    url: "http://jx.xuzhixiang.top/ap/api/cart-update-num.php",
                    type: "GET",
                    data: {
                        uid: date.data[j].uid,
                        pid: date.data[j].pid,
                        pnum: asa
                    },
                    success: (leftsss) => {
                        console.log(leftsss)
                    }
                })

            });
        }


        $("#dliet").on("click", function() {
            console.log("aa");
            $cartItemCheck.each((a, b) => {
                //console.log($(b).prop("checked"));
                if ($(b).prop("checked")) {
                    let idItem = $(b).parent().parent().attr("date-id");
                    let item = $(b).parent().parent();
                    console.log(idItem)
                    item.remove();
                    deletes(idItem, date.data[0].uid);
                    // location.reload();
                }
            })

        })

        // console.log(date.data[0].uid);

        let bVal = $cartItemCheck.parent().parent().find(".operator").find("a");
        console.log(bVal);
        for (let i = 0; i < bVal.length; i++) {
            $(bVal[i]).on("click", function() {
                let item = $(this).parent().parent();
                let itemId = item.attr("date-id");
                item.find(".chec input").prop("checked", false);
                deletes(itemId, stt);
                console.log(item.find(".chec input").prop("checked", ));
                item.remove();
                // location.reload();
                fz();
            });
        }

        function deletes(pids, uids) {
            $.get("http://jx.xuzhixiang.top/ap/api/cart-delete.php", {
                uid: uids,
                pid: pids
            }, cee => {
                console.log(cee);
                if ($(".banner .cart-list .list-item").length > 0) {
                    $(".banner .cart").css({ "display": "block" })
                }
            })


        }


        // if ()
        if ($(".banner .cart-list .list-item").length > 0) {
            $(".banner .cart .size").hide();
            console.log(1);
        } else {
            $(".banner .cart .size").show();
        }

        function fz() {
            let num = 0;
            let aaa = $(".banner .cart .cart-list .list-item .chec input:checked").length;
            console.log(aaa);
            $(".select-num em").html(aaa);

            $cartItemCheck.each((a, b) => {
                //console.log($(b).prop("checked"));
                if ($(b).prop("checked")) {
                    // subtotal
                    // $(".select-num em").html(num);
                    let iHtml = $(b).parent().parent().children(".subtotal").text().split("￥")[1];
                    // console.log($(b).parent().parent().find(".item-num").find("input"));
                    let bVal = $(b).parent().parent().find(".item-num").find("input").val();

                    //console.log(bVal)
                    //console.log(iHtml)
                    num += +bVal * iHtml;

                }
                $(".price-sum i").html(`￥${num}`)
            })

        }

    })
});