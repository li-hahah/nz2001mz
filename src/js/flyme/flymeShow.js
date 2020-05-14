import {openAndClose} from "./flyme.js";
import Slider from "../bannerShow.js";

$(function(){
    new Slider(".main-banner",{
        timeLong:4000
    });
    openAndClose()
})