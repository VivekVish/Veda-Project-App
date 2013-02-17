<?php

require_once('AbstractFrame.php');

class Login extends AbstractFrame
{
    protected $destination = null;
    
    public function __construct()
    {
        $bodyTemplates = array("login");
        $cssFiles = array("reset","login","default","tooltip");
        $scriptFiles = array("jquery/jquery","jquery/jquery-ui");
        $ieScriptFiles = array();
        $fullnameScriptFiles = array();
        
        parent::__construct("The Veda Project: The Free Online Educational Platform", $bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
        
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
    
    public function getData($uri)
    {
        
    }
    
    public function display()
    {
        $GLOBALS['smarty']->assign("title",$this->title);
        $GLOBALS['smarty']->assign("bodytemplates",$this->bodyTemplates);
        $GLOBALS['smarty']->assign("cssfiles", $this->cssFiles);
        $GLOBALS['smarty']->assign("iejavascriptfiles", $this->ieScriptFiles);
        $GLOBALS['smarty']->assign("javascriptfiles", $this->scriptFiles);
        $GLOBALS['smarty']->assign("fullnamejavascriptfiles", $this->fullnameScriptFiles);
        $GLOBALS['smarty']->assign("destination",$this->destination);
        
        $GLOBALS['smarty']->display("main.tpl");
    }
}

?>
