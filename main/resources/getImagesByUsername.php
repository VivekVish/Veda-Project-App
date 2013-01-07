<?php
    require_once("config/main.inc.php");
    require_once("lib/PathArray.php");
    require_once("lib/imageUpload.php");
    
    if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()))
    {
        die("Access Denied.");
    }
    
    $api = new Api();
    
    $uri = "/user/VivekVish/images/";

    $result = $api->get($uri);
    
    echo $result;
?>
