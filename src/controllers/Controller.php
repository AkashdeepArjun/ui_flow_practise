<?php

function getNewBuildPage(){
  

  require_once PROJECT_ROOT .'/views/new_build.php';



}



function getHome(){

    error_log("PATH IS ".PROJECT_ROOT.'/views/home.php');
    require_once PROJECT_ROOT.'/views/home.php';

}

function getPopularBuilds(){

    
    require_once PROJECT_ROOT. '/views/popular_builds.php';

}


function getParts(){
    require_once PROJECT_ROOT.'/views/parts.php';
}


function getMyBuilds(){
    
    require_once PROJECT_ROOT.'/views/my_builds.php';

}


function getNearByDealers(){

    require_once PROJECT_ROOT.'/views/dealers_nearby.php';

}




?>


