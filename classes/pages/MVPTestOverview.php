<?php

require_once("MVPFrame.php");

class MVPTestOverview extends MVPFrame
{
    protected $quizLink = null;
    
    public function __construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles)
    {
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
        
        parent::appendTemplates(array("testOverview","footer"));
        parent::appendCssFiles(array("testOverview","contentprovider"));
        parent::appendScriptFiles(array("contentProvider/test/testOverview"));
    }
    
    public function getData($uri)
    {
        parent::getData($uri);
    }
}

?>
