<?php
    include "../system/load.php"; // saçma oldu....

    if(isset($_GET["komut"])){
        switch($_GET["komut"]){
            case "sayfa":
                new dBug($_GET);
                echo curl($_GET["url"], $_GET["post"]);
                break;
        }
    }

    function curl($url, $post=false){
        $user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; tr; rv:1.9.0.6) Gecko/2009011913 Firefox/3.0.6';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, $post ? true : false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post ? $post : false);
        curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);
        $icerik = curl_exec($ch);
        curl_close($ch);
        return $icerik;
    }

?>