<?php
require __DIR__.'/config.php';
/* require_once PROJECT_ROOT . '/routes/index.php'; */
function clear_logs(){

    file_put_contents(__DIR__.'/error_log','');
    

}



$css_path=BASE_URL.'assets/css/home.css';
$css_ver=file_exists($css_path)?filemtime($css_path):time();
$js_path=BASE_URL.'assets/js/router.js';
$js_ver=file_exists($js_path)?filemtime($js_path):time();

$view = $_GET['dest']??'popular_buids';

$partial = isset($_GET['partial']);

if($view==='motherboards' && !$partial){
    
    require_once PROJECT_ROOT.'/views/motherboards.php';
    exit;
}


if($view==='gpus' && !$partial){

    require_once PROJECT_ROOT.'/views/stock_gpu.php';
    exit;



}

if($view==='coolants' && !$partial){

    require_once PROJECT_ROOT.'/views/stock_coolant.php';
    exit;
}





if($view==='rams' && !$partial){

    
    require_once PROJECT_ROOT.'/views/stock_rams.php';
    exit;



}

if($view ==='cpus' && !$partial){

    require_once PROJECT_ROOT.'/views/stock_cpu.php';
    exit;
}





if($view==='psus' && !$partial){


    require_once PROJECT_ROOT.'/views/stock_psu.php';
    exit;


}

if($view ==='cases' && !$partial){

    
    require_once PROJECT_ROOT.'/views/stock_case.php';
    exit;


}





if($view==='ssds' && !$partial){

    require_once PROJECT_ROOT.'/views/stock_ssd.php';
    exit;


}



if($view==='delete' && !$partial){
    clear_logs();
    $file=$_GET["type"];
    error_log("DELETE REQUEST TYPE WAS FOUND ".$file);
    $file_absolute_path = __DIR__ . '/assets/data/' .$file.'.json';
   error_log("PATH IS ".$file_absolute_path); 
    $target_id = $_GET['id'];

    if(!file_exists($file_absolute_path)){

        echo json_encode([ 'id'=>$target_id,'error'=>'FILE WAS NOT FOUND ','status'=>404]);
        exit;

    }

    $raw = file_get_contents($file_absolute_path);
    error_log("FILE WAS ".$raw);

    $parts = json_decode($raw,true);

    
    $s = file_put_contents(__DIR__.'/assets/data/parts.json',json_encode($parts,JSON_PRETTY_PRINT));

    if($s===false){
        error_log("DIDNT WWRITE FILE");
    }

    file_put_contents(__DIR__.'/assets/data/raw.json',json_encode($raw,JSON_PRETTY_PRINT));

    error_log("DECODED WAS ".json_encode($parts,JSON_PRETTY_PRINT));
        
    if(!is_array($parts)){
            
        echo json_encode(['id'=>$target_id,'error'=>'INVALID JSON FORMAT','status'=>409]);
        exit;

    }

    $filtered = array_filter($parts,fn($part)=>(string)$part['id']!==(string)$target_id);
    $filtered = array_values($filtered);


    file_put_contents(__DIR__.'/assets/data/filtered.json',json_encode($filtered,JSON_PRETTY_PRINT));

    error_log("FILTERED WAS ".json_encode($filtered,JSON_PRETTY_PRINT));

    $diff = array_diff($parts,$filtered);

    error_log("DIFF WAS " .json_encode($diff,JSON_PRETTY_PRINT));

    /* error_log("DIFFERENCE IS " . print_r($diff)); */


    $status = file_put_contents($file_absolute_path,json_encode($filtered,JSON_PRETTY_PRINT));
    if($status===false){
        echo json_encode(['id'=>$target_id,'error'=>'COULD NOT WROTE TO FILE']);
    exit;
    }else{
    error_log(" FFILE SAVE STATUS ".$status); 
     echo json_encode(['id'=>$target_id,'success'=>true]);   
    exit;


    }
   

}






if($view==='new_build' && !$partial){

    require_once PROJECT_ROOT.'/views/new_build.php';
    exit;

}
if($view==='add_product' && !$partial){

    require_once PROJECT_ROOT.'/views/add_product.php';
    exit;

}

if($view ==='inventory' && !$partial){

    require_once PROJECT_ROOT.'/views/inventory.php';
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
