import h from "../headerSub.js";
import Slider from "../bannerShow.js";

//显示商品 S
function getGoodsType(){
    $.get("./php/getGoodsType.php",function(datas){
        datas.forEach(item=>{
            getPhone(item.typeId)
        })
    },"json")
}
function getPhone(typeId){
    let count =0;
    if(typeId=="001"){
        count=7;
    }else{
        count=13;
    }
    $.get("./php/getGoodsListNew.php",{
        "typeId":typeId,
        "count":count
    },function(datas){
        showPhone(datas,typeId);
    },"json")
}
function showPhone(datas,typeId){
    typeId = typeId.substr(2,)-1;
    let htmlStr ='';
    let sale = '';
    datas.forEach(goods=>{
        if(goods.beiyong2==""){
            sale = ``
        }else{
            sale=`<span class="sign red">热卖</span>`;
        }
        if(goods.goodsId.substr(1,)=="00"){
            $(".phone").eq(typeId).find(".box_adv img").attr("src",goods.goodsImg);
        }
        else if(goods.goodsId.substr(1,)!="00"){
            htmlStr += `
                <li>
                    <div class="goods_box">
                        <a href="./mz-phone.html?goodsId=${goods.goodsId}" class="box_img">
                            <img src="${goods.goodsImg}" alt="">
                            <span class="box_info">
                                <span class="goods_name">
                                    ${goods.goodsName}
                                </span>
                                <span class="goods_desc">
                                    ${goods.goodsDesc}
                                </span>
                                <span class="goods_price">
                                    <i>￥</i>
                                    ${goods.goodsPrice}
                                    <em></em>
                                    <del>${goods.beiyong1==undefined?null:goods.beiyong1}</del>
                                </span>
                            </span>
                            ${sale}
                        </a>
                    </div>
                </li>
            `;
        }
        
    })
    $(".phone").eq(typeId).find(".goods_show").append(htmlStr);
    if(typeId=="0"){
        $(".phone").eq(typeId).find("li:lt(2)").addClass("big")
        $(".phone").eq(typeId).find("li:nth-of-type(1)").addClass(" big1");
        $(".phone").eq(typeId).find("li:nth-of-type(2)").addClass(" big2");
        $(".phone").eq(typeId).find("li").last().addClass(" last");
    }else if(typeId!="0"){
        $(".phone").eq(typeId).find("li:nth-of-type(4n)").addClass(" last");
        $(".phone").eq(typeId).find("li:nth-of-type(4n-3) .box_img img").addClass(" goods_img");
        $(".phone").eq(typeId).find("li:nth-of-type(4n-3) .box_info").addClass(" box_ad_info");
    }
}
//显示商品E
// headerNav S
//  headerNav S

$(function(){
    getGoodsType();
    new Slider("#banner",{
        timeLong:4000
    });
    h.headerSub();
    let name = h.getCookie();
    h.getGood(name);
    h.cartShow()
    window.onresize = function(){
        h.cartShow();
    }
})
