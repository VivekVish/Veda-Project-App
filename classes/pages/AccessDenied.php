<?php

require_once('MVPFrame.php');

class AccessDenied extends MVPFrame
{
    protected $materialHeader = null;
    protected $myModules = array();
    
    public function __construct()
    {
        $bodyTemplates = array("accessDenied");
        $cssFiles = array("accessDenied");
        $scriptFiles = array("MVP/MVPModuleManager");
        $ieScriptFiles = array();
        $fullnameScriptFiles = array();
        
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
    }
    
    public function display()
    {
        $GLOBALS['smarty']->assign("loggedIn",$GLOBALS['userSession']->isLoggedIn());
        $GLOBALS['smarty']->assign("loginURL",$GLOBALS['url']=="index.php" ? "index.php?login=true" : $GLOBALS['url']."&login=true");

        $GLOBALS['smarty']->assign("materialHeader",$this->materialHeader);
        $GLOBALS['smarty']->assign("materialList",$this->pageContent);
        $GLOBALS['smarty']->assign("bodytemplates",$this->bodyTemplates);
        $GLOBALS['smarty']->assign("cssfiles", $this->cssFiles);
        $GLOBALS['smarty']->assign("iejavascriptfiles", $this->ieScriptFiles);
        $GLOBALS['smarty']->assign("javascriptfiles", $this->scriptFiles);
        $GLOBALS['smarty']->assign("fullnamejavascriptfiles", $this->fullnameScriptFiles);
        
        $GLOBALS['smarty']->display("main.tpl");
    }
    
    public function getData($uri)
    {
        
    }
    
    public function setNavPosition($navPosition)
    {
        
    }
}

?>
