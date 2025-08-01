<?php
$js=BASE_URL.'/assets/js/stock_rams.js';
$js_ver=file_exists($js)?filemtime($js):time();
$css=BASE_URL.'/assets/css/stock_items.css';
$css_ver=file_exists($css)?filemtime($css):time();


?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title></title>
        <link href="<?=BASE_URL?>assets/css/stock_items.css?v=<?=$css_ver?>" rel="stylesheet">
    </head>
    <body>
<script type="text/javascript" src="<?=BASE_URL?>assets/js/stock_rams.js?v=<?=$js_ver?>">
            
        </script>

        <h1>RAM List will show up here</h1>

            
        <div class="table_wrapper" style="position: relative;" >

        <table class="stock_list">
            <thead>
                <tr class="title_data"></tr>
            
            </thead>
            <tbody>

                
            </tbody>
            
            
        </table>
            
        </div>

        <ul id="context-menu" class="hidden">
            <li id="update_item">Update</li>
            <li id="delete_item">Delete</li>
            
        </ul>
            
            
        <div id="confirm-dialog" class="hidden">
            <p>Delete this item?</p>
            <button id="yup">Yes</button>
            <button id="nope">Nope</button>
            
        </div>
    </body>
</html>
