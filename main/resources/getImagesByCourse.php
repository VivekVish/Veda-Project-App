<?php
    require_once("config/main.inc.php");
    require_once("lib/PathArray.php");
    require_once("lib/imageUpload.php");
    
    if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()))
    {
        die("Access Denied.");
    }
    
    # Retrieve and sanitize data
    $field = "";
    $subject = "";
    $course = "";
    $section = "";
    $lesson = "";
    PathArray::getPathFromRequest($field,$subject,$course,$section,$lesson);
    
    $uri = "/data/material/{$field}/{$subject}/{$course}/images/";
    
    $api = new Api();
    
    $result = $api->get($uri);
    
    echo $result;
?>
