import cookie from "./cookie/cookie.js"
//cookie
function getCookie(){
    let name = cookie.getCookie("username");
    if(name){
        $("#loginUser").html(name);
        $(".lUser").addClass(" signin");
        $(".user").addClass(" signout");
    }else{
        $(".user").addClass(" signin");
    }
    $(".exit").click(function(){
        cookie.removeCookie("username");
        location.reload();
    })
    return name;
}
//nav
function headerSub(){
    $(".logo_nav>li").mouseenter(function(){
        let last = $(".logo_nav>li").length-1;
        $("header").addClass("header-bg");
        $(".mz_header_sub_show").addClass(" sub-show");
        $(".mz_header_sub").removeClass(" mz_sub_show");
        $(".mz_header_sub").eq($(this).index()).addClass(" mz_sub_show");
        $(".mz_header_sub").eq($(this).index()).mouseenter(function(){
            $(this).find("ul").addClass(" mz_header_sub_ul_on");
        })
        if($(this).index() == last){
            $(".mz_header_sub_show").addClass(" app_down");
            $(".mz_header_sub").eq(last).css("height",320);
        }else if($(".mz_header_sub").eq($(this).index()).find("li").length==0){
            remove();
        }
    })
    $(".mz_header_sub_show").mouseleave(function(){
        $(".mz_header_sub").find("ul").removeClass(" mz_header_sub_ul_on");
        remove();
    })
    $(".logo_search").mouseenter(function(){
        remove();
    })
    function remove(){
        $("header").removeClass("header-bg");
        $(".mz_header_sub_show").removeClass(" sub-show app_down");
    }  
}
//cart显示商品S
function getGood(name){
    $(".store-cart").children().remove();
    $.ajax({
        type:"get",
        url:"./php/getShoppingCart.php",
        data:{
            vipName:name
        },
        beforeSend:function(){
            $(".store-cart").append("<img src='./img/loading.gif' alt='' class='loading'>");
        },
        success:function(data){
            if(name||data.length!=0){
                showGoods(data,name);
            }else{
                $(".cart").find("em").html("0");
                let htmlStr = `
                    <div class="store-cart-tips-box">
                        <div class="store-cart-tips-content">
                            <div class="store-cart-tips-icon xixi"></div>
                            <div class="store-cart-tips-text">
                                登录后可显示<br>
                                您账号中已加入的商品哦~
                            </div>
                        </div>
                    </div>
                `;
                $(".store-cart").append(htmlStr);
            }
        },
        complete:function(){
            $(".store-cart .loading").remove();
        }
        ,
        dataType:"json"
    })   
}
function showGoods(data,name){
    $(".cart").find("em").html(data.length);
    if(data.length!=0){
        let htmlBox =`
            <p class="stroe-cart-title">最近加入的商品</p>
            <ul class="stroe-cart-list">
            </ul>
            <div class="store-cart-footer">
                <span class="stroe-cart-total">
                    共
                    <span class="store-cart-count">${data.length}</span>
                    件商品
                    <span class="stroe-cart-invalid-count">（ 0 件失效 ）</span>
                </span>
                <a href="./mz-shopcart.html" class="mz-btn success m">去购物车</a>
            </div>
        `;
        let htmlStr = '';
        data.forEach(item=>{
            htmlStr += `
                <li class="stroe-cart-item">
                    <div class="stroe-cart-item-content">
                        <a href="./mz-phone.html?${item.goodsId}" class="store-cart-link" target="_blank">
                            <img src="${item.goodsImg}" alt="" class="store-cart-pic">
                        </a>
                        <a href="#" class="store-cart-text" target="_blank">
                            <p class="stroe-cart-row">${item.goodsName}</p>
                            <p class="stroe-cart-row desc">${item.goodsDesc}</p>
                        </a>
                        <div class="store-cart-right">
                            <p class="stroe-cart-item-total">${item.goodsPrice} × ${item.goodsCount}</p>
                            <span class="stroe-cart-item-delete" data="${item.goodsId}">删除</span>
                        </div>
                    </div>
                </li>
            `;
        })
        $(".store-cart").append(htmlBox);
        $(".stroe-cart-list").append(htmlStr);
    }else{
        let htmlStr = `
            <div class="store-cart-tips-box">
                <div class="store-cart-tips-content">
                    <div class="store-cart-tips-icon xianqi"></div>
                    <div class="store-cart-tips-text">
                        您的购物车还没有商品,<br>
                        赶紧去选购吧~
                    </div>
                </div>
            </div>
        `;
        $(".store-cart").append(htmlStr);
    }
    del(name,function(name){
        getGood(name)
    })
}
//cart显示商品E
//删除商品S
function delGoods(name,id){
    $.get("./php/deleteGoods.php",{
        vipName:name,
        goodsId:id
    })
}
function del(name,fn){
    $(".stroe-cart-item-delete").click(function(){
        delGoods(name,$(this).attr("data"))
        $(this).parent().parent().parent().remove();
        fn&&fn(name);
    })
    
}
//删除商品E
//cart的显示S
function cartShow(){
    $(".cart,.store-cart").hover(
        function(){
            $(".store-cart").removeClass(" store-cart-hide");
        },
        function(){
            $(".store-cart").addClass(" store-cart-hide");
        }
    )
    //cart 的为止
    let cartLeft = $(".cart").position().left
    $(".store-cart").css("left",`${cartLeft-274}px`)
}
//cart的显示E
export default {
    headerSub,
    getCookie,
    getGood,
    cartShow
}