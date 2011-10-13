<?php
    # Includes
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
    
    if (isset($_REQUEST['imageName']) && !empty($_REQUEST['imageName']))
    {
        $imageName = trim($_REQUEST['imageName']);
    }

    $userId = $_SESSION['id'];
    $coursePath = "/data/material/$field/$subject/$course/";
    $file_ext = strtolower(substr($_FILES["filename"]['name'],strripos($_FILES["filename"]['name'],".")+1));
    
    if (isset($_REQUEST['imageName']) && !empty($_REQUEST['imageName']))
    {
        $imageName = trim($_REQUEST['imageName']);
    }
    
    $payload = json_encode(array("imageName"=>$imageName,"coursePath"=>$coursePath,"username"=>$userId,"imageType"=>$file_ext));

    $api = new Api();
    
    $uri = "/data/material/uploads/image/";

    $result = $api->post($uri, $payload);
    
    // Success
    if($result)
    {
        $resultArray = json_decode($result);
        if($resultArray->status=="Success.")
        {
            $imageFilename = $resultArray->imageId;
            $imgPath = saveImage($imageFilename);
            $imgPathArray = explode('/',$imgPath);
            echo end($imgPathArray);
        }
        else
        {
            die("Fatal Error.  Unable to save image on application server.");
        }
    }
    // Failure
    else
    {
        echo "Fatal Error.  Unable to post image to database.";
    }

	
?>
