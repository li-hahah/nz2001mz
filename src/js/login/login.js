$(function () {
    $('#toVcodeLogin').click(function () {
        $("#qr-panel").removeClass(" hide");
    })
    $("#toAccountLogin").click(function () {
        $("#qr-panel").addClass(" hide");
    })
    $(".qr-pc").click(function () {
        $(".pc").addClass(" hide");
        $(".phone").removeClass(" hide")
    })
    $(".qr-phone").click(function () {
        $(".pc").removeClass(" hide");
        $(".phone").addClass(" hide")
    })
    $(".close_icon").click(function(){
        $(this).parent().addClass(" visibility-hidden")
    })
    //登录
    $("#login").click(function(){
        $.ajax({
            type:"post",
            url:"php/login.php",
            data:{
                "username":$("#userphone").val(),
                "userpass":$("#userpass").val()
            },
            success:function(str){
                if(str == 1){
                    $(".mz-mask").removeClass(" hide");
                    let d = new Date();
                    d.setHours(d.getHours()+5);
                    document.cookie = `username=${$("#userphone").val()};expires=${d.toGMTString()}`;
                    let myTimer = setInterval(function(){
                        let count = $(".mz-dialog-wrap em").html();
                        count--;
                        if(count<=1){
                            count=1;
                            clearInterval(myTimer);
                            location.href = "./mz-index.html";
                        }
                        $(".mz-dialog-wrap em").html(count)
                    },1000)
                }else{
                    $(".phone .tip_box").removeClass("visibility-hidden");
                    $(".phone .tip_box .tip_font").html("密码或者账号错误");
                }
                
            }
        })
    })
    $(".mz-dialog-close").click(function () {
        $(".mz-mask").addClass(' hide');
    });
})
