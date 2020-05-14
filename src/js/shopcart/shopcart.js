import cookie from "../cookie/cookie.js";
var name = getCookie();
//goTop
function layoutMagnerShow(){
    let scrollTop = $(window).scrollTop();
    if(scrollTop>500){
        $(".layout-magnet").addClass(" layout-magnet-show");
    }else{
        $(".layout-magnet").removeClass(" layout-magnet-show");
    }
}
//购物底栏
function cartFooter(){
    if($(".cart_merchant_body").children().children().length==0){
        return;
    }
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    let cartFooterH = $("#cartFooter").innerHeight();
    let trLastH = $(".cart_merchant_body tr").last().innerHeight();
    let lastTop = $(".cart_merchant_body tr").last().offset().top;
    
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let sum = lastTop - scrollTop
    let total = sum+trLastH+cartFooterH
    if(total < clientHeight){
        $("#cartFooter").removeClass(" fixed");
    }else{
        $("#cartFooter").addClass(" fixed");
    }
    window.onscroll = function(){
        cartFooter()
        layoutMagnerShow();
    }
}

// dialogShow and Hide  S
let dialog = $('.dialog').parent()
function dialogShow() {
    dialog.removeClass(' hide');
    $(".dialog .mz-dialog-content").html("您确定要删除选中的商品吗？");
}
function dialogHide() {
    dialog.addClass(' hide');
}
let tips = $(".tips").parent();
function tipsShow() {
    tips.removeClass(' hide');
    $(".tips .mz-dialog-content").html("您还没有选中商品，亲！")
}
function tipsHide() {
    tips.addClass(' hide');
}
// dialogShow and Hide  E

// 删除选中商品弹框
function cancelChecked(){
    $(".cart_remove_selected").click(function () {
        $(".mz-dialog-close,.success").click(function () {
            dialogHide();
            tipsHide();
        });
        let allCHK = false;
        $(".cart_merchant_body #checkbox").each(function () {
            if ($(this).hasClass("checked")) {
                allCHK = true;
                return;
            }
        })
        if (!allCHK) {
            tipsShow();
        }else{
            dialogShow();
        }
        $(".cancel").click(() => {
            $(".cart_merchant_body #checkbox").each(function () {
                if ($(this).hasClass("checked")) {
                    deleteGoods(name,$(this).parent().parent().attr("goodsid"));
                    $(this).parent().parent().prev().remove();
                    $(this).parent().parent().nextUntil(".cart_more_buy").addBack().remove();
                }
            })
            checkLoginAndGoods();
            dialogHide();
        })
    })
}
//确认此删除商品
function cancelGood() {
    $(".cart_producr_remove").click(function () {
        if ($(this).hasClass("let-show")) {
            dialogShow();
            $(".cancel").click(() => {
                deleteGoods(name,$(this).parent().parent().attr("goodsid"));
                $(this).parent().parent().prev().remove();
                $(this).parent().parent().nextUntil(".cart_more_buy").addBack().remove();
                checkLoginAndGoods();
                dialogHide();
            })
        }
    })
    $(".mz-dialog-close,.success").click(function () {
        dialogHide();
    })
}
//全选商品
function checkbox() {
    $(".cart_select_all .mz-checkbox").click(function () {
        if ($(this).hasClass("checked")) {
            $(".cart_select_all .mz-checkbox").addClass(' checked');
            $(".cart_merchant_body #checkbox").addClass(' checked');
        } else {
            $(".cart_merchant_body #checkbox").removeClass(' checked');
            $(".cart_select_all .mz-checkbox").removeClass(' checked');
        }
        totalSelectedCount();
        totalMoney();
    })

    $(".cart_merchant_body #checkbox").click(function () {
        let allCHK = true;
        $(".cart_merchant_body #checkbox").each(function () {
            if (!$(this).hasClass("checked")) {
                allCHK = false;
                return;
            }
        })
        if (allCHK) {
            $(".cart_select_all .mz-checkbox").addClass(' checked');
        } else if (!allCHK) {
            $(".cart_select_all .mz-checkbox").removeClass(' checked');
        }
        totalSelectedCount();
        totalMoney();
    })
}
//已经选择商品
function totalSelectedCount() {
    let total = 0;
    $(".cart_merchant_body #checkbox").each(function () {
        if ($(this).hasClass("checked")) {
            total++;
        }
    })
    $("#totalSelectedCount").html(total);
}
//总钱数
function totalMoney() {
    let money = 0;
    $(".cart_merchant_body #checkbox").each(function () {
        if ($(this).hasClass("checked")) {
            money += parseInt($(".total").html());
        }
    })
    money = money.toFixed(2)
    $("#totalPrice").html(money)
    if (parseInt($("#totalPrice").html()) > 0) {
        $(".to-order-btn").removeAttr("disabled")
    } else {
        $(".to-order-btn").attr("disabled", "ture")
    }
}
//单个商品价钱
function calcMoney($select, count) {
    let price = $($select).parent().parent().parent().prev().find("span").html() * count;
    price = price.toFixed(2);
    $($select).parent().parent().parent().next().find("span").html(price);
}
//加或减
function addAndSubtract(){
    //减
    $(".mz-adder-subtract").click(function () {
        //数量
        if ($(this).next().find(":input").val() <= 1) {
            return;
        }
        let count = $(this).next().find(":input").val();
        count--;
        if (count == 1) {
            $(this).addClass(" disabled");
        }
        $(this).next().find(":input").val(count);
        if ($(this).next().find(":input").val() < 6) {
            $(".mz-adder-add").removeClass(" disabled")
        }
        //修改数据库数量
        updataGood(name,$(this).parent().parent().parent().parent().attr("goodsid"),count)
        //单价
        calcMoney(this, count)
        //总价钱
        totalMoney();
    })
    //加
    $(".mz-adder-add").click(function () {
        //数量
        if ($(this).prev().find(":input").val() >= 6) {
            return;
        }
        let count = $(this).prev().find(":input").val();
        count++;
        if (count >= 6) {
            $(this).addClass(" disabled");
            $(".cart-product-number-max").addClass(" show")
        }
        $(this).prev().find(":input").val(count);
        if ($(this).prev().find(":input").val() > 1) {
            $(".mz-adder-subtract").removeClass(" disabled")
        }
        //修改数据库数量
        updataGood(name,$(this).parent().parent().parent().parent().attr("goodsid"),count)
        //单价
        calcMoney(this, count)
        //总价钱
        totalMoney();
    })  
}

//getCookie
function getCookie(){
    let name = cookie.getCookie("username");
    if(name){
        $("#toBarUser").html(name);
        $(".header_member").addClass(" signin");
        $("#cartLoginTips").css("display","none");
        $(".btn").addClass(" signout");
        $(".btn").removeClass(" signin");
    }else{
        $(".btn").addClass(" signin");
    }
    $(".exit").click(function(){
        cookie.removeCookie("username");
        location.reload();
    })
    return name;
}
//判断登录 有无商品
function checkLoginAndGoods(){
    if($(".cart_merchant_body").children().children().length==0&&cookie.getCookie("username")){
        $(".hasGoods").addClass(" signout");
        $(".noGoods").removeClass(" signout");
        $(".noLogin").addClass(" signout");
        $("#cartFooter").addClass(" signout");
    }else if($(".cart_merchant_body").children().children().length==0&&!cookie.getCookie("username")){
        $(".hasGoods").addClass(" signout");
        $(".noGoods").addClass(" signout");
        $(".noLogin").removeClass(" signout");
        $("#cartLoginTips").css("display","none");
        $("#cartFooter").addClass(" signout");
    }else if($(".cart_merchant_body").children().children().length>0&&!cookie.getCookie("username")){
        $(".hasGoods").removeClass(" signout");
        $(".noGoods").addClass(" signout");
        $(".noLogin").addClass(" signout");
        $("#cartLoginTips").css("display","block");
        $("#cartFooter").removeClass(" signout");
    }else{
        $(".hasGoods").removeClass(" signout");
        $(".noGoods").addClass(" signout");
        $(".noLogin").addClass(" signout");
        $("#cartFooter").removeClass(" signout");
    }
}
//后端获取购物车数据
function getCart(name){
    $.get("./php/getShoppingCart.php",{
        vipName:name
    },function(data){
        showCart(data,name);
    },"json")
}
//渲染购物车
function showCart(data){
    let htmlStr='';
    data.forEach(item=>{
        htmlStr +=`
            <!-- 加价购 Start -->
            <tr class="cart_more_buy">
                <td class="cart_prudect_buy" colspan="5">
                    <div class="more_buy_tag">
                        <span>加价购</span>
                    </div>
                    <span class="more_buy_tips">另加29元起，即可换购超值商品</span>
                    <span class="more_buy_skip">
                        立即加购 >
                    </span>
                </td>
            </tr>
            <tr class="cart_product border_0" goodsid="${item.goodsId}">
                <td class="cart_col_select">
                    <div class="mz-checkbox" id="checkbox"></div>
                    <a href="#" class="cart_product_link" target="_blank">
                        <img src="${item.goodsImg}" alt="${item.goodsName}" class="cart_product_img">
                    </a>
                    <a href="./mz-phone.html?${item.goodsId}" class="cart_product_link cart_product_info" target="_blank">
                        <p class="cart_product_item_name">${item.goodsName}</p>
                        <p class="cart_product_package_name">碎屏保套餐</p>
                        <p class="cart_product_desc">全网通公开版 珊瑚橙 6+64GB</p>
                    </a>
                </td>
                <td class="cart_col_price">
                    <p>
                        <span class="cart_product_price">
                            ${item.goodsPrice}
                        </span>
                    </p>
                </td>
                <td class="cart_col_num">
                    <div class="cart_product_number_adder">
                        <p class="cart-product-number-max">限购6件</p>
                        <div class="mz-adder">
                            <button class="mz-adder-subtract disabled"></button>
                            <div class="mz-adder-num">
                                <input type="text" class="mz-adder-input" value="${parseInt(item.goodsCount)}">
                            </div>
                            <button class="mz-adder-add"></button>
                        </div>
                    </div>
                </td>
                <td class="cart_col_total">
                    <span class="cart_product_price total main-goods">
                        ${item.goodsPrice}
                    </span>
                </td>
                <td class="cart_col_ctrl">
                    <div class="cart_producr_remove">
                    </div>
                </td>
            </tr>
            <!-- 套餐 start -->
            <tr class="cart_product child">
                <td class="cart_col_select cart_prodect_package" colspan="5">
                    <div class="mz-checkbox" style="visibility: hidden;"></div>
                    <a href="#" target="_blank" class="cart_product_link">
                        <img src="img/cart_product_package.png" alt="" class="cart_product_img">
                    </a>
                    <a href="#" class="cart_product_link" target="_blank"> 碎屏保-1年 魅族 16Xs
                    </a>
                </td>
            </tr>
            <!-- 套餐 end -->
            <!-- 赠品 start -->
            <!-- 赠品 end --> 
        `;
    })
    $(".cart_merchant_body").append(htmlStr);
    //判断登录 有无商品
    checkLoginAndGoods();
    ////确认此删除商品
    cancelGood();
    //删除选中商品
    cancelChecked();
    //选中商品
    $(".mz-checkbox").click(function(){
        $(this).toggleClass(" checked");
    })
    //全选商品
    checkbox();
    //总共商品
    $("#cartNum").html($(".cart_merchant_body #checkbox").length);
    //加或减
    addAndSubtract();
    //购物底栏
    cartFooter();
}
//删除商品 S
function deleteGoods(name,id){
    $.ajax({
        type:"get",
        url:"./php/deleteGoods.php",
        data:{
            vipName:name,
            goodsId:id
        },
        beforeSend:()=>{
            $(".dialog").prepend("<img src='img/loading.gif' alt=''>");
        },
        success:function(data){
            deleteGood(data);
        },
        complete:()=>{
            $(".dialog img").remove();
        }
    })
}
function deleteGood(data){
    if(data==1){

    }else{
        $(".mz-dialog-close,.success").click(function () {
            dialogHide();
            tipsHide();
        });
        tipsShow();
        $(".tips .mz-dialog-content").html("删除失败，服务器出错");
    }
    
}
//删除商品 E

//修改商品数量 S
function updataGood(name,id,count){
    $.get("./php/updateGoodsCount.php",{
        vipName:name,
        goodsId:id,
        goodsCount:count
    },function(data){
        updataSuccess(data)
    })
}
function updataSuccess(data){
    if(data==1){

    }else{
        $(".mz-dialog-close,.success").click(function () {
            dialogHide();
            tipsHide();
        });
        tipsShow();
        $(".tips .mz-dialog-content").html("修改数量失败，服务器出错");
    }
}
//修改商品数量 E


$(function(){
    //getCookie
    getCart(name);
    $('#cartCtrl').click(function(){
        $('.cart_producr_remove').toggleClass(" let-show");
        $(this).toggleClass(" ctrl-show");
        if($(this).hasClass("ctrl-show")){
            $(this).text("完成");
        }else{
            $(this).text("编辑");
        }
        
    })
    $("#goBcak").click(function(){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let myTimer = setInterval(function(){
            scrollTop -=200;
            if(scrollTop<=0){
                scrollTop=0;
                clearInterval(myTimer);
            }
            window.scrollTo(0,scrollTop)
        },10)
    })
    
})
