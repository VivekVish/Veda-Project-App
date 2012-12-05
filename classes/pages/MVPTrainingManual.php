<?php

require_once('MVPContent.php');

class MVPTrainingManual extends MVPContent
{
    public function __construct()
    {
        $bodyTemplates = array();
        $cssFiles = array();
        $scriptFiles = array();
        $ieScriptFiles = array();
        $fullnameScriptFiles = array();
        
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
    }
    
    public function display()
    {
        parent::display();
    }
    
    public function getData($uri)
    {
        parent::getData($uri);
        $uriArr = explode("/",trim($uri,"/"));
        $this->location = $uri;
        $this->name = preg_replace('/_/',' ',$uriArr[6])." Training Manual";   
    }
}

?>
