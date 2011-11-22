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
    else
    {
        die("You must enter an image name.");
    }
    if(isset($_REQUEST['imageCitation']) && !empty($_REQUEST['imageCitation']))
    {
        $imageCitation = trim($_REQUEST['imageCitation']);
    }
    else
    {
        die("You must enter an image citation.");
    }
    if(isset($_REQUEST['imageLicense']) && !empty($_REQUEST['imageLicense']))
    {
        $imageLicense = $_REQUEST['imageLicense'];
    }
    else
    {
        die("You must enter an image license.");
    }
    
    if(!PathArray::isCharNum($imageName))
    {
        die("Image Names must include only letters, numbers, and underscores.");
    }
    
    $payload = json_encode(array("imageName"=>$imageName,"imageLicense"=>$imageLicense,"imageCitation"=>$imageCitation,"coursePath"=>$coursePath,"username"=>$userId,"imageType"=>$file_ext));

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
            if(preg_match('/Error\!/',$imgPath)==0)
            {
                $imgPathArray = explode('/',$imgPath);
                die(json_encode(array(end($imgPathArray))));
            }
            else
            {
                $uri = "/data/material/uploads/image/{$resultArray->imageId}/";
                $result = $api->delete($uri);
                if($result=="Success.")
                {
                    var_dump($imgPath);die();
                    die("Fatal Error.  Unable to upload file.");
                }
                else
                {
                    die("Fatal Error.  Please contact veda@vedaproject.org with Image Error Code $imageFilename.");
                }
            }
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
