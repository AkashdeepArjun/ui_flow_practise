<?php

$path=$_GET['dest']??'home';
require  PROJECT_ROOT .'/controllers/Controller.php';

switch($path){

    /* case 'new_build': */
    /*     getNewBuildPage(); */
    /*     break; */

    case 'home':
        getHome();
        break; 

    case 'popular_builds':
        getPopularBuilds(); 
        break;

    case 'parts':
        getParts();
        break;
    case 'my_builds':
        getMyBuilds();
        break;

    case 'dealers_nearby':
        getNearByDealers();
        break;
    default:
    exit ("no such path");
    break;
}


?>

