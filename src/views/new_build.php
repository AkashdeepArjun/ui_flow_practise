<?php

$css=BASE_URL.'/assets/css/new_build.css';
$css_ver=file_exists($css)?filemtime($css):time();
?>



<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title></title>
        <link href="<?=BASE_URL?>assets/css/new_build.css?v=<?=$css_ver?>" rel="stylesheet">
    </head>
<body>

    <div class="cont">

        <div class="case">

            <h1>CASE</h1>
            
        </div>

        <div class="ssd">
        
            <h1>SSD</h1>

        </div>

        <div class="ram">
            <h1>RAM</h1>


        </div>
       
       
       
        <div class="motherboard">

            <h1>MOTHERBOARD</h1>

        </div>

        <div class="psu">
           <h1>POWER SUPPLY</h1> 
        </div>

        <div class="cpu">
           <h1>CPU</h1> 
        </div>


        <div class="gpu">
           <h1>GPU</h1> 
        </div>




    </div>
    




     
    </body>
</html>
