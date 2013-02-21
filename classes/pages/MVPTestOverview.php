<?php

require_once("MVPFrame.php");

class MVPTestOverview extends MVPFrame
{
    protected $quizLink = null;
    protected $testTitle = null;
    
    public function __construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles)
    {
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
        
        parent::appendTemplates(array("navbar","testOverview"));
        parent::appendCssFiles(array("MVPTestOverview","MVPContentprovider","MVPNavBar"));
        parent::appendScriptFiles(array("contentProvider/test/testOverview","MVP/MVPNavbar"));
    }
    
    public function display()
    {
        $GLOBALS['smarty']->assign("testTitle",$this->testTitle);
        parent::display();
    }
    
    public function getData($uri)
    {
        parent::getData($uri);
    }
}

?>
