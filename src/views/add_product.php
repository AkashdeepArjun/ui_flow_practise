<?php
$css_file=BASE_URL.'/assets/css/add_product.css';
$css_ver=file_exists($css_file)?filemtime($css_file):time();
$js_file=BASE_URL.'/assets/js/add_product.js';
$js_ver=file_exists($js_file)?filemtime($js_file):time();

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title></title>
        <link href="<?=BASE_URL?>assets/css/add_product.css?v=<?=$css_ver?>" rel="stylesheet">
    </head>
    <body>
<script type="text/javascript" src="<?=BASE_URL?>assets/js/add_product.js?v=<?=$js_ver?>" defer>
            
</script>

    <header>
        <label for="">SELECT PART</label>

         <select class="parts_menu">
            <option value="motherboard">MOTHERBOARD</option>
            
            <option value="cpu">CPU</option>

            <option value="ram">RAM</option>

            <option value="ssd">SSD</option>

            <option value="psu">PSU</option>

            <option value="gpu">GPU</option>
            
            <option value="case">CASE</option>

            <option value="coolant"> COOLANT</option>            
            </select>

           
            
                <button type="submit" class="save_button" form="myform" >SAVE</button>  

        </header> 
        
        <div class="form_container">
            
            <form class="part_form" id="myform">
                

            </form>




        </div>
        




   
    </body>
</html>
