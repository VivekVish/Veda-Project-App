<?php

require_once("Video.php");

class EditVideo extends Video
{
    public function __construct()
    {
        parent::__construct();
        
        $this->appendScriptFiles(array("contentProvider/content/video"));
    }
}


?>
