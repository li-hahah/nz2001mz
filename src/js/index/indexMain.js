import h from "../headerSub.js";
import Slider from "../bannerShow.js";

$(function(){
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
