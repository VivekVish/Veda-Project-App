<?php

require_once("MVPVideo.php");

class MVPEditVideo extends MVPVideo
{
    public function __construct()
    {
        parent::__construct();
        
        $this->appendScriptFiles(array("contentProvider/content/video"));
    }
}