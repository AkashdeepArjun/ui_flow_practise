<?php
$css_path=BASE_URL.'assets/css/home.css';
$css_ver=file_exists($css_path)?filemtime($css_path):time();
$js_path=BASE_URL.'assets/js/router.js';
$js_ver=file_exists($js_path)?filemtime($js_path):time();
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title></title>
        <link href="<?=BASE_URL?>assets/css/home.css?v=<?=$css_ver?>" rel="stylesheet">
        
    </head>
    <body>
        <div class="head_nav">
            <nav>
                

                <ul class="menu">
            
            <li><a href="index.php?dest=popular_builds" data-lol> POPULAR BUILDS</a> </li>
            <li> <a href="index.php?dest=parts" data-lol>PARTS</a></li>
            <li> <a href="index.php?dest=my_builds" data-lol>MY BUILDS</a></li>
            <li> <a href="index.php?dest=dealers_nearby" data-lol>DEALERS NEARBY</a></li>

                </ul>

                <input type="text" name="" value="" class="search_bar" placeholder="search build id....">



                
            </nav>

            
        </div>

        <main class="main_content" style="justify-content: center; justify-items: center; align-items: center; align-content: center;">
            
        <h1>Popular builds  will show up here</h1>
        </main>



        <script type="text/javascript" src="<?=BASE_URL?>assets/js/router.js?v=<?=$js_ver?>">
        
       </script> 
    </body>
</html>
