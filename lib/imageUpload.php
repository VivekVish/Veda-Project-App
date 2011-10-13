<?php

function uploadImage($saveAsName, $fileName, $maxSize, $maxW, $fullPath, $relPath, $colorR, $colorG, $colorB, $maxH = null)
{
    $folder = $relPath;
    $maxlimit = $maxSize;
    $allowed_ext = "jpg,jpeg,gif,png,bmp";
    $match = "";
    $filesize = $_FILES[$fileName]['size'];
    if($filesize > 0)
    {	
        $filename = strtolower($_FILES[$fileName]['name']);
        $filename = preg_replace('/\s/', '_', $filename);
        if($filesize < 1)
        { 
            $errorList[] = "File size is empty.";
        }
        if($filesize > $maxlimit)
        { 
            $errorList[] = "File size is too big.";
        }
        if(count($errorList)<1)
        {
            $file_ext = preg_split("/\./",$filename);
            $allowed_ext = preg_split("/\,/",$allowed_ext);
            foreach($allowed_ext as $ext)
            {
                if($ext==end($file_ext))
                {
                    $match = "1"; // File is allowed
                    $NUM = time();
                    $newfilename = $saveAsName.".".end($file_ext);
                    $filetype = end($file_ext);
                    $save = $folder.$newfilename;

                    if(!file_exists($save))
                    {
                        list($width_orig, $height_orig) = getimagesize($_FILES[$fileName]['tmp_name']);
                        if($maxH == null)
                        {
                            if($width_orig < $maxW)
                            {
                                $fwidth = $width_orig;
                            }
                            else
                            {
                                $fwidth = $maxW;
                            }
                            $ratio_orig = $width_orig/$height_orig;
                            $fheight = $fwidth/$ratio_orig;

                            $blank_height = $fheight;
                            $top_offset = 0;

                        }
                        else
                        {
                            if($width_orig <= $maxW && $height_orig <= $maxH)
                            {
                                $fheight = $height_orig;
                                $fwidth = $width_orig;
                            }
                            else
                            {
                                if($width_orig > $maxW)
                                {
                                    $ratio = ($width_orig / $maxW);
                                    $fwidth = $maxW;
                                    $fheight = ($height_orig / $ratio);
                                    if($fheight > $maxH)
                                    {
                                        $ratio = ($fheight / $maxH);
                                        $fheight = $maxH;
                                        $fwidth = ($fwidth / $ratio);
                                    }
                                }
                                if($height_orig > $maxH)
                                {
                                    $ratio = ($height_orig / $maxH);
                                    $fheight = $maxH;
                                    $fwidth = ($width_orig / $ratio);
                                    if($fwidth > $maxW)
                                    {
                                        $ratio = ($fwidth / $maxW);
                                        $fwidth = $maxW;
                                        $fheight = ($fheight / $ratio);
                                    }
                                }
                            }
                            if($fheight == 0 || $fwidth == 0 || $height_orig == 0 || $width_orig == 0)
                            {
                                die("FATAL ERROR REPORT ERROR CODE [add-pic-line-67-orig].");
                            }
                            if($fheight < 45)
                            {
                                $blank_height = 45;
                                $top_offset = round(($blank_height - $fheight)/2);
                            }
                            else
                            {
                                $blank_height = $fheight;
                            }
                        }
                        $image_p = imagecreatetruecolor($fwidth, $blank_height);
                        $white = imagecolorallocate($image_p, $colorR, $colorG, $colorB);
                        imagefill($image_p, 0, 0, $white);
                        switch($filetype)
                        {
                            case "gif":
                                $image = @imagecreatefromgif($_FILES[$fileName]['tmp_name']);
                            break;
                            case "jpg":
                                $image = @imagecreatefromjpeg($_FILES[$fileName]['tmp_name']);
                            break;
                            case "jpeg":
                                $image = @imagecreatefromjpeg($_FILES[$fileName]['tmp_name']);
                            break;
                            case "png":
                                $image = @imagecreatefrompng($_FILES[$fileName]['tmp_name']);
                            break;
                        }

                        @imagecopyresampled($image_p, $image, 0, $top_offset, 0, 0, $fwidth, $fheight, $width_orig, $height_orig);

                        switch($filetype)
                        {
                            case "gif":
                                if(!@imagegif($image, $save))
                                {
                                    $errorList[]= "PERMISSION DENIED [GIF]";
                                }
                            break;
                            case "jpg":
                                if(!@imagejpeg($image, $save, 100))
                                {
                                    $errorList[]= "PERMISSION DENIED [JPG]";
                                }
                            break;
                            case "jpeg":
                                if(!@imagejpeg($image, $save, 100))
                                {
                                    $errorList[]= "PERMISSION DENIED [JPEG]";
                                }
                            break;
                            case "png":
                                if(!@imagepng($image, $save, 0))
                                {
                                    $errorList[]= "PERMISSION DENIED [PNG]";
                                }
                            break;
                        }

                        if(!@imagedestroy($image)||!@imagedestroy($image_p))
                        {
                            $errorList[] = "UNABLE TO DESTROY IMAGE";
                        }
                    }
                    else
                    {
                        $errorList[]= "CANNOT MAKE IMAGE IT ALREADY EXISTS";
                    }	
                }
            }		
        }
    }
    else
    {
        $errorList[]= "NO FILE SELECTED";
    }
    if(!$match)
    {
        $errorList[]= "File type isn't allowed: $filename";
    }
    if(sizeof($errorList) == 0)
    {
        return $fullPath.$newfilename;
    }
    else
    {
        $eMessage = array();
        for ($x=0; $x<sizeof($errorList); $x++)
        {
            $eMessage[] = $errorList[$x];
        }
        return $eMessage;
    }
}

function saveImage($saveAsName)
{
    $filename = "filename";
    $maxSize = 10000000;
	$maxW = 800;
	$maxH = 600;
    $fullPath = "http://".SITE_ROOT.CONTENT_IMAGES_LOCATION;
	$relPath = "..".CONTENT_IMAGES_LOCATION;
	$colorR = 255;
	$colorG = 255;
	$colorB = 255;
	$filesize_image = $_FILES[$filename]['size'];
	if($filesize_image > 0)
    {
		$upload_image = uploadImage($saveAsName, $filename, $maxSize, $maxW, $fullPath, $relPath, $colorR, $colorG, $colorB, $maxH);
		if(is_array($upload_image))
        {
			foreach($upload_image as $key => $value)
            {
				if($value == "-ERROR-")
                {
					unset($upload_image[$key]);
				}
			}
			$document = array_values($upload_image);
			for ($x=0; $x<sizeof($document); $x++)
            {
				$errorList[] = $document[$x];
			}
			$imgUploaded = false;
		}
        else
        {
			$imgUploaded = true;
		}
	}
    else
    {
		$imgUploaded = false;
		$errorList[] = "File Size Empty";
	}
    
	if($imgUploaded)
    {
		return $upload_image;
	}
    else
    {
		echo "Error!";
		foreach($errorList as $value)
        {
	    		echo $value.', ';
		}
	}
}

?>
