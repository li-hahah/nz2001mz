<?php
    $name = $_POST['username'];

    $conn = mysqli_connect("localhost","root","root","shoppingcenter");

    $result = mysqli_query($conn,"select * from vip where username='{$name}'");

    mysqli_close(($conn));

    $arr = mysqli_fetch_all($result,MYSQLI_ASSOC);
    if(count($arr)==1){
        echo 1;
    }else{
        echo 0;
    }
?>