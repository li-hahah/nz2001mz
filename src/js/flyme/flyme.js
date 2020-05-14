export let openAndClose = function(){
    $(".iconcha").click(function () {
        $(this).css("display", "none");
        $(".iconsan").css("display", "block");
        $('.header-con_mobile').removeClass(" header-con_mobile--activce");
        $(".main-nav_mobile").css("display","none");
        $(".main-nav_mobile").removeClass(" main-nav_mobile--activce");
    })
    $(".iconsan").click(function () {
        $(this).css("display", "none");
        $(".iconcha").css("display","block");
        $('.header-con_mobile').addClass(" header-con_mobile--activce");
        $(".main-nav_mobile").css("display", "block");
        setTimeout(function(){
            $(".main-nav_mobile").addClass(" main-nav_mobile--activce");
        },100)   
    })
}
