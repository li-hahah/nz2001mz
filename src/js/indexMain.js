import * as jquery from './jquery.js';
import h from "./headerSub.js";
import Slider from "./bannerShow.js";

$(function(){
    new Slider("#banner",{
        timeLong:4000
    });
    h.headerSub();
})
function show() {
    
}

export default {
    show
}