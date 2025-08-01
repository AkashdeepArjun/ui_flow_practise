<?php
    
$css=BASE_URL.'/assets/css/inventory.css';
$css_ver = file_exists($css)?filemtime($css):time();
$js = BASE_URL.'/assets/js/inventory.js';
$js_ver = file_exists($js)?filemtime($js):time();


?>


<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title></title>
        <link href="<?=BASE_URL?>assets/css/inventory.css?v=<?=$css_ver?>" rel="stylesheet">
    </head> 
    <body>
<script type="text/javascript" src="<?=BASE_URL?>assets/js/inventory.js?v=<?=$js_ver?>" defer>
            
        </script>
            
        <div class="cont">
            
            <div class="item" id="motherboards">

                <h1 style="text-align:center;">MOTHERBOARDS</h1>
                <h1 class=" item_skeleton skeleton_text motherboards" style="text-align: center;">LOADING...</h1>

                
            </div>

            <div class="item" id="rams">


                <h1 style="text-align:center;">RAMS</h1>
                <h1 class=" item_skeleton skeleton_text rams" style="text-align: center;">LOADING...</h1>




            </div>

            <div class="item" id="gpus">

                       <h1 style="text-align:center;">GPUS</h1>
                <h1 class=" item_skeleton skeleton_text gpus" style="text-align: center;">LOADING...</h1>
                    





            </div>
            <div class="item" id="cpus">
                    
                   <h1 style="text-align:center;">CPUS</h1>
                <h1 class=" item_skeleton skeleton_text cpus" style="text-align: center;">LOADING...</h1>


            </div>
            <div class="item" id="ssds">

                <h1 style="text-align:center;">SSDS</h1>

                <h1 class=" item_skeleton skeleton_text ssds" style="text-align: center;">LOADING...</h1>


            </div>
            <div class="item" id="psus">

                <h1 style="text-align:center;">PSU</h1>

                <h1 class=" item_skeleton skeleton_text psus" style="text-align: center;">LOADING..</h1>


            </div>
            <div class="item" id="cases">


                <h1 style="text-align:center;">CASE</h1>

                <h1 class=" item_skeleton skeleton_text cases" style="text-align: center;">LOADING...</h1>







            </div>
            <div class="item" id="coolants">

                

                <h1 style="text-align:center;">COOLANT</h1>

                <h1 class=" item_skeleton skeleton_text motherboard coolants" style="text-align:center;">LOADING....</h1>






            </div>


            
        </div>


    
    </body>
</html>




