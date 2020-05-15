function register(){
    let isRight = [];
    //前端验证
    function checkUser(){
        let reg = /^[\d\w]{6,11}/;
        if(reg.test($("#userphone").val())){
            $(".username .no").addClass("hide");
            $(".txt1").addClass("visibility-hidden");
            isRight[0] = 1;
            return true;
        }else{
            $(".username .no").removeClass("hide");
            $(".username .yes").addClass("hide");
            $(".txt1").removeClass("visibility-hidden");
            $(".txt1 span").html("请输入6-11位手机号或flyme账号呀，亲！！！");
            isRight[0] = 0;
            return false;
        }
    }
    function checkPass(){
        let reg = /^[a-zA-Z0-9]{6,}/;
        if(reg.test($("#userpass").val())){
            $(".password .yes").removeClass(" hide");
            $(".password .no").addClass(" hide");
            $(".tip_box").addClass(" visibility-hidden");
            isRight[1] = 1;
        }else{
            $(".password .no").removeClass(" hide");
            $(".password .yes").addClass(" hide");
            $(".txt2").removeClass(" visibility-hidden");
            $(".txt2 span").html("请输入6位以上的数字与字符的组合");
            isRight[1] = 0;
        }
    }
    function checkPass2(){
        let reg = /^[a-zA-Z0-9]{6,}/;
        if(reg.test($("#userpass2").val())){
            $(".password2 .yes").removeClass(" hide");
            $(".password2 .no").addClass(" hide");
            $(".txt3").addClass(" visibility-hidden");
            isRight[3] = 1;
        }else{
            $(".password2 .no").removeClass(" hide");
            $(".password2 .yes").addClass(" hide");
            $(".txt3").removeClass(" visibility-hidden");
            $(".txt3 span").html("请输入6位以上的数字与字符的组合");
            isRight[3] = 0;
        }
        if($("#userpass").val()==$("#userpass2").val()){
            $(".password2 .yes").removeClass(" hide");
            $(".password2 .no").addClass(" hide");
            isRight[3] = 1;
        }else{
            $(".password2 .no").removeClass(" hide");
            $(".password2 .yes").addClass(" hide");
            $(".txt3").removeClass(" visibility-hidden");
            $(".txt3 span").html("与上面密码不一样噢亲");
            isRight[3] = 0;
        }
    }
    //后端验证
    function isUser(){
        $.ajax({
            type:"post",
            url:"php/checkUser.php",
            data:{
                "username":$("#userphone").val()
            },
            success:function(str){
                if(str == 0){
                    $(".username .yes").removeClass("hide");
                    isRight[2] = 1;
                }else{
                    $(".username .no").removeClass("hide");
                    $(".tip_box").removeClass("visibility-hidden");
                    $(".tip_font").html("这个名字已经有啦，亲，请重新起一个把");
                    isRight[2] = 0;
                }
            }
        })
    }
    $("#userphone").blur(function(){
        checkUser() && isUser();
    })
    $("#userpass").blur(function(){
        checkPass()
        $("#userpass").change(function(){
            checkPass2()
        })
    })
    $("#userpass2").blur(function(){
        checkPass2()
    })
    //注册
    $("#registerBtn").click(function(){
        let sum = 0;
        isRight.forEach(item=>{
            sum+= item;
        })
        if(sum==4&&$(".checkboxPic").hasClass("check_chk")){
            $.ajax({
                type:"post",
                url:"php/register.php",
                data:{
                    "username":$("#userphone").val(),
                    "userpass":$("#userpass").val()
                },
                success:function(str){
                    if(str==1){
                        $(".mz-mask").removeClass(" hide");
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
                        $(".tip_font").html("服务器出错，请稍后再试，谢谢");
                    }
                    
                }
            })
        }
        else if(!$(".checkboxPic").hasClass("check_chk")){
            $(".tip_box").removeClass(" visibility-hidden");
            $(".tip_font").html("请您勾选同意协议，谢谢");
        }else{
            $(".tip_box").removeClass(" visibility-hidden");
            $(".tip_font").html("您还有东西没填噢");
        }
        
    })
}
$(function(){
    $(".mzchkbox").click(function(){
        $(this).toggleClass(" check_chk");
    }) 
    $(".mz-dialog-close").click(function () {
        $(".mz-mask").addClass(' hide');
    });
    register()
    $(".close_icon").click(function(){
        $(".tip_box").addClass(" visibility-hidden");
    })
})
