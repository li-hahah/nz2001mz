<?php
    $name = $_POST['username'];
    $userpass = $_POST["userpass"];

    $conn = mysqli_connect("localhost","root","root","shoppingcenter");

    $result = mysqli_query($conn,"select * from vip where username='{$name}' and userpass='{$userpass}'");

    mysqli_close($conn);

    $arr = mysqli_fetch_all($result,MYSQLI_ASSOC);

    if(count($arr)==1){
        echo 1;
    }else{  
        echo 0;
    }

?>