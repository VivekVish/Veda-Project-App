<?php

require_once('MVPFrame.php');

class MVPRequestUsername extends MVPFrame
{
    public function __construct()
    {
        if($_SESSION['requestusername']!==true)
        {
            $redirect="http://".$_SERVER['HTTP_HOST'];
            header('HTTP/1.1 303 See Other'); 
            header('X-Powered-By: PHP/5.2.2'); 
            header('Content-Type: text/html'); 
            header('Location: '.$redirect);
        }
        
        $bodyTemplates = array("newUser");
        $cssFiles = array("MVPNewUser");
        $scriptFiles = array("general/newUser");
        $ieScriptFiles = array();
        $fullnameScriptFiles = array();
        
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
    }
}

?>
