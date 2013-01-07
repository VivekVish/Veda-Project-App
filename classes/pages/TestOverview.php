<?php

require_once("Frame.php");

class TestOverview extends Frame
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
