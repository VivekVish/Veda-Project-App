<?php

require_once('MVPFrame.php');

class MVPLanding extends MVPFrame
{
    protected $destination = null;
    
    public function __construct()
    {
        $bodyTemplates = array("MVPLanding",);
        $cssFiles = array("MVPLanding");
        $scriptFiles = array();
        $ieScriptFiles = array();
        $fullnameScriptFiles = array();
        
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
        
        $this->destination = urlencode(preg_replace('/\?$/','',preg_replace('/&/','AMPERSANDCODE',preg_replace('/(\&login=true)|(login=true\&)|(login=true)/',"",$this->curPageURL()))));
    }
    
    private function curPageURL()
    {
        $pageURL = 'http';

        $pageURL .= "://";

        if ($_SERVER["SERVER_PORT"] != "80") {$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];}
        else {$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];}
        return $pageURL;
    }
    
    public function display()
    {
        $GLOBALS['smarty']->assign("destination",$this->destination);
        
        parent::display();
    }
    
    public function getData($uri)
    {
        
    }
    
    public function setNavPosition($navPosition)
    {
        
    }
}

?>
