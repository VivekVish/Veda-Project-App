<?php

require_once('Frame.php');

class Landing extends Frame
{
    public function __construct()
    {
        $bodyTemplates = array("landing");
        $cssFiles = array("landing");
        $scriptFiles = array();
        $ieScriptFiles = array();
        $fullnameScriptFiles = array();
        
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
    }
    
    public function getData($uri)
    {
        
    }
}

?>
