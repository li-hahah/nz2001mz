import h from "../headerSub.js";
import siteGotop from "../phone/phone.js";
function recommendSlider(){
    let boxW=$("#recommendSlider").innerWidth();
    let liW=$(".recommend-slider-wrap li").innerWidth();
    let liNum=$(".recommend-slider-wrap li").length;
    let total = liW*liNum
    let s = 0;
    let control ='';
    for(let i =1;i<=Math.floor(liNum/3);i++){
        control += `
            <li>
                <a href="javascript:void(0)">${i}</a>
            </li>
        `;
        
    }
    //动态生成豆豆
    $(".flex-control-nav").append(control);
    $(".flex-control-nav li a").eq(0).addClass("flex-activce");
    $("#recommendDirectionNav").find("li").click(function(){
        $("#recommendDirectionNav").find("li").find("a").removeClass(" flex-activce");
        $(this).find("a").addClass(' flex-activce')
    })
    let arr =[];
    $("#recommendDirectionNav li").each((item)=>{
        if(item==0){
            s=0
            arr.push(s)
        }
        if(total-s-boxW<liW*3){
            s+= total-s-boxW
            arr.push(s)
        }else{
            s += liW*3;
            arr.push(s)
        }
        $("#recommendDirectionNav li").eq(item).click(function(){
            $(".recommend-slider-wrap").css("transform",`translate3d(-${arr[item]}px,0,0)`)
        })
    })
   
}
//后端获取数据
function getGoods(){
    let typeId = location.search
    typeId = typeId.split("=")[1]
    $.get("./php/getGoodsList.php",{
        typeId:typeId
    },function(data){
        showGoods(data,typeId);
    },"json")
}
//渲染后端获取得数据
function showGoods(data,typeId){
    if(typeId=="001"){
        $(".title-category").html("手机")
    }else if(typeId=="002"){
        $(".title-category").html("声学")
    }else if(typeId=="003"){
        $(".title-category").html("配件")
    }
    else if(typeId=="004"){
        $(".title-category").html("生活")
    }
    let htmlStr = '';
    let sale = '';
    let slider = '';
    data.forEach(item=>{
        if(item.beiyong2==""){
            sale = ``
        }else{
            sale=`<p class="item-hot-sale red">${item.beiyong2}</p>`;
        }
        if(item.goodsId.substr(1,)!="00"){
            htmlStr += `
                <li class="gl-item">
                    <a href="./mz-phone.html?goodsId=${item.goodsId}" target="_blank" class="goods-item-link" title="${item.goodsName}">
                        <img src="${item.goodsImg}" alt="" class="item-pic lazy modProduct">
                        <ul class="item-slide">
                            <li class="item-slide-dot active" title="鲸跃蓝">
                                <img src="${item.goodsImg}" alt="${item.goodsName}"> 
                            </li>
                            <li class="item-slide-dot" title="鲸跃蓝">
                                <img src="${item.goodsImg}" alt="${item.goodsName}"> 
                                </li>
                                <li class="item-slide-dot" title="鲸跃蓝">
                                <img src="${item.goodsImg}" alt="${item.goodsName}"> 
                                </li>  
                        </ul>
                        <h3 class="item-title">${item.goodsName}</h3>
                        <p class="item-desc">${item.goodsDesc}</p>
                        <p class="item-price">
                            <em>￥</em>
                            <span class="vm-price">${item.goodsPrice}</span>
                            <del>${item.beiyong1==undefined?null:item.beiyong1}</del>
                        </p>
                        ${sale}
                    </a>
                </li>
            `;
            slider +=`
                <li class="rs-item">
                    <a href="./mz-phone.html?goodsId=${item.goodsId}" target="_blank" class="rs-item-wrap">
                        <div class="mod-pic">
                            <img src="${item.goodsImg}" alt="${item.goodsName}">
                        </div>
                        <div class="mod-desc">
                            <h4 class="vm-title">${item.goodsName}</h4>
                            <p class="vm-price">
                                <em>￥</em>
                                <span class="vm-price-text">${item.goodsPrice}</span>
                                <del>${item.beiyong1==undefined?null:item.beiyong1}</del>
                            </p>
                        </div>
                    </a>
                </li>
            `;
        }
    })
    $("#goodsListWrap").append(htmlStr);
    $("#recommendSlider ul").append(slider);
    recommendSlider();
}
$(function(){
    getGoods();
    h.headerSub();
    h.getCookie();
    
    $(window).scroll(function(){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        siteGotop(scrollTop);
    })
})