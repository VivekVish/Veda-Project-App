<?php

require_once("Frame.php");

class Video extends Frame
{
    protected $location = null;
    protected $name = null;
    
    public function __construct()
    {
        $bodyTemplates = array("video");
        $cssFiles = array();
        $scriptFiles = array();
        $ieScriptFiles = array();
        $fullnameScriptFiles = array();
        
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
    }
    
    public function display()
    {
        $GLOBALS['smarty']->assign("location",$this->location);
        $GLOBALS['smarty']->assign("video",$this->pageContent->content);
        $GLOBALS['smarty']->assign("name",$this->name);
        parent::display();
    }
    
    public function getData($uri)
    {
        parent::getData($uri);
        
        $uriArr = explode("/",trim($uri,"/"));
        $this->location="/data/material/{$uriArr[2]}/{$uriArr[3]}/{$uriArr[4]}/{$uriArr[5]}/{$uriArr[6]}/";
        $this->name = preg_replace('/_/',' ',"{$uriArr[6]} Video");
    }
}

?>
