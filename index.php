<?php
    include "system/load.php"; // sistem yükleniyooo

    //metuschedule();

    function metuschedule(){
        $theme = vtData("theme", "first", 0);
        include "themes/".$theme."/index.php";
    }
    
    if(isset($_GET["sayfa"])){
        switch ($_GET["sayfa"]){
            case "update":
                include "botCan/Client.php";
                break;
        }
    }

?>