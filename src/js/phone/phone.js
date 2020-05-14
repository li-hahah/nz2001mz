import h from "../headerSub.js";
export default function siteGotop(scrollTop){
    if(scrollTop>200){
        $("#siteGotop").fadeIn(1000);
        $("#siteGotop").css("display","block");
        
    }else{
        $("#siteGotop").fadeOut(1000,function(){
            $("#siteGotop").css("display","none");
        });
        
    }
}
//goTop
function fixed(scrollTop){
    if(scrollTop>=82){
        $("#fastNav").addClass(' --fixed')
    }else{
        $("#fastNav").removeClass(' --fixed')
    }
}
//连接后端添加到购物车
function addToCart(name,count,id){
    $.post("./php/addShoppingCart.php",{
        vipName:name,
        goodsId:id,
        goodsCount:count
    },function(data){
        success(data,name);
    })
}
//添加到购物车
function success(data,name){
    if(data==1){
        $(".mz-mask").removeClass(" hide");
        $(".mz-dialog-content").html("添加购物车成功");
        let time = 3;
        let myTimer = setInterval(()=>{
            time--;
            if(time<=0){
                time=0;
                clearInterval(myTimer);
                $(".mz-mask").addClass(" hide");
            }
        },1000)
        if(name){
            $('.success').html("<a href='./mz-shopcart.html'>去购物车结算\>\></a>")
        }else{
            $('.success').html("<a href='./mz-login.html'>去登录\>\> </a>")
        }
    }else{
        $(".mz-mask").removeClass(" hide");
        $(".mz-dialog-content").html("服务器错误");
        let time = 3;
        let myTimer = setInterval(()=>{
            time--;
            if(time<=0){
                time=0;
                clearInterval(myTimer);
                $(".mz-mask").addClass(" hide");
            }
        },1000)
        $('.success').html("请稍后再试")
    }
    $(".mz-dialog-close,.success").click(function () {
        $(".mz-mask").addClass(" hide");
    });
}
//增减
function addAndMinus(){
    let count = $("#J_quantity").val();
    //加
    $(".vm-plus").click(function(){
        //数量
        if ($(this).prev().val() >= 6) {
            return;
        }
        count++;
        if (count >= 6) {
            $(this).addClass(" disabled");
        }
        $(this).prev().val(count);
        if ($(this).prev().val() > 1) {
            $(".vm-minus").removeClass(" disabled")
        }
    })
    //减
    $(".vm-minus").click(function(){
        //数量
        if ($(this).next().val() <= 1) {
            return;
        }
        count--;
        if (count == 1) {
            $(this).addClass(" disabled");
        }
        $(this).next().val(count);
        if ($(this).next().val() < 6) {
            $(".vm-plus").removeClass(" disabled")
        }
    })  
}
//后端获取商品
function getGoods(cookiename){
    let goodsId = location.search;
    goodsId = goodsId.split("=")[1];
    //商品详情
    $.get("./php/getGoodsInfo.php",{
        goodsId:goodsId
    },function(data){
        showGoods(data,cookiename)
    },"json")
}
//渲染商品
function showGoods(data,cookiename){
    $(".-name").html(data.goodsName);
    let previewStr='';
    let propertyStr ='';
    previewStr=`
        <div class="preview-booth">
            <a href="javascript:;" id="imgbooth">
                <img src="${data.goodsImg}" alt="" height="560" width="560">
            </a>
        </div>
        <ul class="preview-thumb clearfix" id="previewThumb">
            <li class="current">
                <a href="#">
                    <img src="${data.goodsImg}" alt="" width="80" height="80">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="${data.goodsImg}" alt="" width="80" height="80">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="${data.goodsImg}" alt="" width="80" height="80">
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="${data.goodsImg}" alt="" width="80" height="80">
                </a>
            </li>
        </ul>
        <div class="preview-action">
            <a href="javascript:;" class="vm-favorite">
                <i class="iconfont iconshoucang"></i>
                收藏 
            </a>
            <a href="javascript:;" class="compare-btn-list">
                <i class="iconfont iconduibi"></i>
                <span>对比</span>
            </a>
        </div>
    `;
    $("#preview").append(previewStr);
    propertyStr=`
        <div class="property-hd">
            <h2>${data.goodsName}</h2>
            <p class="mod-info active">${data.goodsDesc}</p>
        </div>
        <div class="property-sell">
            <div class="property-sell-price clearfix">
                <div class="mod-price">
                    <small>￥</small>
                    <span id="J_price" class="vm-money">${data.goodsPrice}</span>
                </div>
            </div>
            <dl class="property-sell-app clearfix">
                <dt class="vm-entry" id="appTag">
                    <span>APP专享</span>
                </dt>
                <dd class="mod-app-tip" id="appTip">
                    APP下单省
                    <span id="appPrice" class="vm-money">0</span>
                    元
                </dd>
            </dl>
            <dl class="property-sell-coupon clearfix">
                <dt class="vm-entry">
                    <span>优惠券</span>
                </dt>
                <dd>
                    <p id="promoInner"></p>
                    <a href="#" class="vm-more" id="promoMore">
                        更多 > 
                    </a>
                </dd>
            </dl>
            <dl class="property-sell-morebuy clearfix">
                <dt class="vm-entry">
                    <span>加价购</span>
                </dt>
                <dd>
                    <span>
                        另加
                        <em id="moreBuyStart">29</em>
                        元起，即可换购超值商品
                    </span>
                    <a href="#" class="vm-more" id="moreBuyEnter">立即加购 ></a>
                </dd>
            </dl>
            <dl class="property-sell-gift clearfix">
                <dt class="vm-entry">
                    <span>赠品</span>
                </dt>
                <dd></dd>
            </dl>
        </div>
        <div class="property-service">
            <dl class="property-service-item clearfix">
                <dt class="vm-metatit">
                    支
                    <span class="s-space"></span>
                    <span class="s-space"></span>
                    持
                </dt>
                <dd class="mod-db" id="prodService">
                    <span>
                        <i class="iconfont icongou"></i>
                        花呗分期
                    </span>
                    <span>
                        <i class="iconfont icongou"></i>
                        顺丰发货
                    </span>
                    <span>
                        <i class="iconfont icongou"></i>
                        7天无理由退货（激活后不支持）
                    </span>
                </dd>
            </dl>
            <dl class="property-service-suda clearfix">
                <dt class="vm-metatit">配送服务</dt>
                <dd class="mod-site clearfix">
                    <div class="site-selector" id="site-selector">
                        <div class="text">
                            广东省 江门市 
                            <i class="iconfont iconarrow_down
                            "></i>
                        </div>
                        <div class="content">
                            <div class="JD-stock-con">
                            </div>
                            <span class="vm-close"></span>
                        </div>
                    </div>
                    <div class="site-status"></div>
                </dd>
            </dl>
            <div class="property-service-provider clearfix">
                <span id="installmentInfo"></span>
                本商品由 魅族 负责发货并提供售后服务
                <a href="javascript:;" class="vm-kefu" id="kefu">
                    <i class="iconfont iconkefu
                    "></i>
                    <span>商城客服</span>
                </a>
            </div>
        </div>
        <div class="property-sibling">
            <dl class="property-sibling-item clearfix">
                <dt class="vm-metatit">
                    型
                    <span class="s-space"></span>
                    <span class="s-space"></span>
                    号
                </dt>
                <dd class="clearfix">
                    <a href="javascript:;" class="prop selected">${data.goodsName}</a>
                    <a href="javascript:;" class="prop">${data.goodsName}</a>
                    <a href="javascript:;" class="prop">${data.goodsName}</a>
                    <a href="javascript:;" class="prop">${data.goodsName}</a>
                    <a href="javascript:;" class="prop">${data.goodsName}</a>
                    <a href="javascript:;" class="prop">${data.goodsName}</a>
                </dd>
            </dl>
        </div>
        <div class="property-set">
            <dl class="property-set-sale clearfix">
                <dt class="vm-metatit">网络类型</dt>
                <dd class="clear">
                    <a href="#" class="selected" title="全网通公开版">全网通公开版</a>
                </dd>
            </dl>
            <dl class="property-set-sale clearfix">
                <dt class="vm-metatit">颜色分类</dt>
                <dd class="clear">
                    <a href="#" class="vm-sale-img selected" title="鲸跃蓝">
                        <img src="${data.goodsImg}" alt="" width="32" height="32">
                        <span>鲸跃蓝</span>
                    </a>
                    <a href="#" class="vm-sale-img selected" title="湖光绿">
                        <img src="${data.goodsImg}" alt="" width="32" height="32">
                        <span>湖光绿</span>
                    </a>
                    <a href="#" class="vm-sale-img selected" title="日光橙">
                        <img src="${data.goodsImg}" alt="" width="32" height="32">
                        <span>日光橙</span>
                    </a>
                </dd>
            </dl>
            <dl class="property-set-sale clearfix">
                <dt class="vm-metatit">内存容量</dt>
                <dd class="clear">
                    <a href="#" class="selected" title="6+128GB">
                        <span>6+128GB</span>
                    </a>
                    <a href="#" title="8+128GB">
                        <span>8+128GB</span>
                    </a>
                    <a href="#" title="8+256GB">
                        <span>8+256GB</span>
                    </a>
                </dd>
            </dl>
            <dl class="property-set-package clearfix" id="propertyPackage">
                <dt class="vm-metatit">选择套餐</dt>
                <dd class="package">
                    <div class="package-tab clearfix" id="J_packageTab">
                        <a href="#" class="single selected" title="官方标配">
                            <p class="vm-text">官方标配</p>
                        </a>
                        <a href="#" class="single" title="EP3C套餐">
                            <p class="vm-text">EP3C套餐
                                <span class="vm-text-profits">
                                    省
                                    <em>30</em>
                                    元
                                </span>
                            </p>
                        </a>
                        <a href="#" class="single" title="碎屏保套餐">
                            <p class="vm-text">碎屏保套餐</p>
                        </a>
                        <a href="#" class="single" title="牙刷套餐">
                            <p class="vm-text">牙刷套餐
                                <span class="vm-text-profits">
                                    省
                                    <em>30</em>
                                    元
                                </span>
                            </p>
                        </a>
                    </div>
                    <div class="package-content hide" id="J_packageContent">
                        <span class="s-tringle" id="J_trinagle" style="display: block; left: 88.0042px;"></span>
                        <div class="mod-db" id="J_packageBody">
                            <ul class="clearfix">
                                <li>
                                    <p class="vm-pic">
                                        <img src="img/pack-vm-pic.jpg" alt="白色" width="60" height="60">
                                    </p>
                                    <p class="vm-tit">魅族防飞溅声波电动牙刷</p>
                                    <p class="vm-price">¥ 269.00</p>
                                    <div class="vm-prop">
                                        <p>
                                            <a href="javascript:;" class="vm-prop-text selected" title="白色">
                                                <span>白色</span>
                                            </a>
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </dd>
            </dl>
        </div>
        <div class="property-huabei clearfix">
            <div class="vm-metatit">
                花呗分期
                <a href="#" target="_blank" class="vm-desc">
                    <i class="iconfont iconwenhao"></i>
                </a>
            </div>
            <div class="property-huabei-bd" id="J_huabeiBody">
                <a href="#" class="prop">
                    <span class="vm-periods">¥766.33×3期</span>
                    <span class="vm-rate">免手续费</span>
                </a>
                <a href="#" class="prop">
                    <span class="vm-periods">¥400.40×6期</span>
                    <span class="vm-rate">含手续费 ￥17.24/期</span>
                </a>
                <a href="#" class="prop">
                    <span class="vm-periods">¥205.94×12期</span>
                    <span class="vm-rate">含手续费 ￥14.36/期</span>
                </a>
            </div>
        </div>
        <div class="property-buy">
            <p class="vm-message" id="J_message"></p>
            <dl class="property-buy-quantity">
                <dt class="vm-metatit">
                    数
                    <span class="s-space"></span>
                    <span class="s-space"></span>
                    量
                </dt>
                <dd class="clearfix">
                    <div class="mod-control">
                        <a href="javascript:;" title="减少" class="vm-minus diabled">-</a>
                        <input type="text" value="1" id="J_quantity">
                        <a href="javascript:;" title="增加" class="vm-plus">+</a>
                    </div>
                </dd>
            </dl>
            <div class="property-buy-action">
                <a href="javascript:void(0);" class="btn btn-primary btn-lg mr20" style="display:inline-block">立即购买</a>
                <a href="javascript:void(0);" class="btn btn-empty btn-lg hide" style="display:inline-block">加入购物车</a>
                <span class="vm-service" id="J_panicBuyingWrap"></span>
            </div>
        </div>
    `;
    $("#property").append(propertyStr);
    addAndMinus();
    
    $(".btn-empty").click(function(){
        let count = $("#J_quantity").val();
        console.log(count);
        addToCart(cookiename,count,data.goodsId)
    })
}
$(function(){
    let name = h.getCookie();
    getGoods(name);
    h.getGood(name);
    h.cartShow()
    window.onresize = function(){
        h.cartShow();
    }
    h.headerSub();
    $(window).scroll(function(){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        siteGgoTopShow(scrollTop);
        fixed(scrollTop);
    })
    $(".gotop-arrow").click(function(){
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