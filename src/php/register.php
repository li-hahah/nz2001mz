<?php
    $name = $_POST['username'];
    $pass = $_POST['userpass'];

    $conn = mysqli_connect("localhost","root","root","shoppingcenter");

    $result = mysqli_query($conn,"insert into vip(username,userpass) value('{$name}','{$pass}')");
    
    mysqli_close($conn);

    if($result){
        echo 1;
    }else{
        echo 0;
    }
?>