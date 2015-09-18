<?php
    include "system/load.php"; // sistem yükleniyooo

    metuschedule();

    function metuschedule(){
        $theme = vtData("theme", "first", 0);
        include "themes/".$theme."/index.php";
    }

?>