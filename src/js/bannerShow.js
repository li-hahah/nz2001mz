export default class Slider{
    constructor($select,obj){
        //属性
        this.$dom = $($select);
        this.$UlImg = this.$dom.children().eq(0);
        this.$LiImg = this.$UlImg.children();
        this.$UlDou = this.$dom.children().eq(1);
        this.$LiDou = this.$UlDou.children();

        let defaultObj = {
            ord : 0,
            timeLong : 3000,
            hrefs:[],
            myTimer:null
        }
        if(obj){
            for(let key in obj){
               defaultObj[key] = obj[key]==undefined?defaultObj[key]:obj[key];
            }  
        }
        for(let key in defaultObj){
            this[key] = defaultObj[key]
        }
        this.autoPlay();
        this.addEvent();
    }
    autoPlay(){
        if(this.myTimer!=null){
            return;
        }
        this.myTimer = setInterval(()=>{
            this.goImg(this.ord+1);
        },this.timeLong)
    }
    stopPlay(){
        clearInterval(this.myTimer)
        this.myTimer = null;
    }
    goImg(transOrd,fn){
        if(transOrd==this.ord){
            return;
        }
        if(transOrd<0){
            transOrd = this.$LiImg.length-1;
        }else if(transOrd>this.$LiImg.length-1){
            transOrd = 0;
        }
       
        let Outord = this.ord;
        this.ord = transOrd;

        this.$LiImg.eq(Outord).animate({
            "left":"-100%"
        },this.timeLong/10);
        this.$LiImg.eq(this.ord).css("left","100%");
        this.$LiImg.eq(this.ord).animate({
            "left":"0"
        },this.timeLong/10)
        this.$LiDou.eq(Outord).removeClass(" active");
        this.$LiDou.eq(this.ord).addClass(" active");
        
    }
    addEvent(){
        this.$LiDou.click((ev)=>{
            this.goImg($(ev.target).index());
        })
        this.$LiDou.mouseover(()=>{
            this.stopPlay();
        })
        this.$LiDou.mouseout(()=>{
            this.autoPlay();
        })
        window.onfocus=()=>{
            this.autoPlay();
        }
        window.onblur=()=>{
            this.stopPlay();
        }
    }
}
