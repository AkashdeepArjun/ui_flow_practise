<?php

$css=BASE_URL.'/assets/css/new_build.css';
$css_ver=file_exists($css)?filemtime($css):time();
$js=BASE_URL.'/assets/js/new_build.js';
$js_ver=file_exists($js)?filemtime($js):time();
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

        <div class="case part" data-part-type="CASE">

            <h1>CASE</h1>
            
            </div>
        <!---->
        <div class="coolant part" data-part-type="COOLANT">


            <h1>COOLANT</h1>

        </div>





        <div class="ssd part" data-part-type="SSD">
        
            <h1>SSD</h1>

        </div>

        <div class="ram part" data-part-type="RAM">
            <h1>RAM</h1>


        </div>
       
       
       
        <div class="motherboard part" data-part-type="MOTHERBOARD">

            <h1>MOTHERBOARD</h1>

        </div>

        <div class="psu part" data-part-type="PSU">
           <h1>POWER SUPPLY</h1> 
        </div>

        <div class="cpu part" data-part-type="CPU">
           <h1>CPU</h1> 
        </div>


        <div class="gpu part" data-part-type="GPU"> 
           <h1>GPU</h1> 
        </div>
        </div>

        <div class="log_container hidden">
            
        </div>
    
        <div class="backdrop hidden" id="backdrop">
            
            <div class="dialog">
            <p class="title" style="font-size: 5rem;"></p>
            <input type="text" name="" value="" placeholder="Search ..." id="search"/>
            <div id="item-grid" class="grid"></div>
            <button id="close_dialog">
                Close
            </button>
                
            </div>


            
        </div>
    


<script src="<?=BASE_URL?>assets/js/new_build.js?v=<?=$js_ver?>">
</script>

     
    </body>
</html>
