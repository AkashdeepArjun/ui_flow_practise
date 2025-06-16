<?<?php

$path=$_GET['dest'];

require_once PROJECT_ROOT.'/controllers/NonSapController.php';

switch($path) {
    case 'new_build':
    getNewBuildPage();

    break;
    
    default:
        exit("no such request found");
        break;
}




?>

