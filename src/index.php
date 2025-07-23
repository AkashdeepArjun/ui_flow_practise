<?php
require __DIR__.'/config.php';
/* require_once PROJECT_ROOT . '/routes/index.php'; */
$css_path=BASE_URL.'assets/css/home.css';
$css_ver=file_exists($css_path)?filemtime($css_path):time();
$js_path=BASE_URL.'assets/js/router.js';
$js_ver=file_exists($js_path)?filemtime($js_path):time();

$view = $_GET['dest']??'popular_buids';





$partial = isset($_GET['partial']);
if($view==='new_build' && !$partial){

    require_once PROJECT_ROOT.'/views/new_build.php';
    exit;

}
if($view==='add_product' && !$partial){

    require_once PROJECT_ROOT.'/views/add_product.php';
    exit;

}

if($view === 'save' && !$partial){

    $selection = $_GET['part']??null;
    if(!$selection){
        echo json_encode([ 'error'=>'Missing part type' ]);
        exit;
    }

    $raw_json = json_decode(file_get_contents("php://input"),true);

    if(!$raw_json || !isset($raw_json['name']) || trim($raw_json['name'])==='' ){
        echo json_encode(['error'=>'invalid input']);
        exit;
    }

    $file = __DIR__."/assets/data/{$selection}.json";

    $existing=[];

    if(file_exists($file)){
        
        $existing = json_decode(file_get_contents($file),true);
        if(!is_array($existing)) $existing=[];


    } 
    $existing[]=$raw_json;

    if(file_put_contents($file,json_encode($existing,JSON_PRETTY_PRINT))){

            
        echo json_encode(['success'=>true]);
        exit;
        

    }else{

        echo json_encode(['error'=>'could not save file']);
        exit; 


    }




}




if($partial){

    require_once PROJECT_ROOT.'/routes/index.php';
    exit;

}
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title></title>
        <link href="<?=BASE_URL?>assets/css/home.css?v=<?=$css_ver?>" rel="stylesheet">
        <script type="text/javascript" src="<?=BASE_URL?>assets/js/router.js?v=<?=$js_ver?>" defer>
        
       </script> 
    </head>
    <body>
        <div class="head_nav">
            <nav >
                

                <ul class="menu">
            
            <li><a href="index.php?dest=popular_builds" data-lol> POPULAR BUILDS</a> </li>
            <li> <a href="index.php?dest=parts" data-lol>PARTS</a></li>
            <li> <a href="index.php?dest=my_builds" data-lol>MY BUILDS</a></li>
            <li> <a href="index.php?dest=dealers_nearby" data-lol>DEALERS NEARBY</a></li>

                </ul>

                <input type="text" name="" value="" class="search_bar" placeholder="search build id....">



                
            </nav> 
                
            <a href="index.php?dest=new_build" style="text-decoration: none;" target="_blank"><button type="" class="build_button">BUILD NEW</button></a>
            
        </div>
        
        <div id="loader">
            
        </div>
        <main class="main-content">

           <?php
             
                require_once PROJECT_ROOT.'/routes/index.php';
           ?>
             
            

        </main>



        
    </body>
</html>
