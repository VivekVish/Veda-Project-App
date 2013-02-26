<?php

require_once("MVPFrame.php");

class MVPVideo extends MVPFrame
{
    protected $location = null;
    protected $name = null;
    
    public function __construct()
    {
        $bodyTemplates = array("navbar","video");
        $cssFiles = array("MVPVideo","MVPNavBar");
        $scriptFiles = array("MVP/MVPNavbar");
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
        $this->location="/data/{$uriArr[1]}/{$uriArr[2]}/{$uriArr[3]}/{$uriArr[4]}/{$uriArr[5]}/{$uriArr[6]}/";
        $this->name = preg_replace('/_/',' ',"{$uriArr[6]} Video");
    }
}

?>
