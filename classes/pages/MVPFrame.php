<?php

require_once('AbstractFrame.php');
require_once('lib/PathArray.php');

class MVPFrame extends AbstractFrame
{
    protected $pageContent = null;
    protected $navPosition = null;

    public function __construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles)
    {
        parent::__construct("The Veda Project: The Free Online Educational Platform", $bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
        
        $this->prependTemplates(array("MVPHeader"));
        $this->appendTemplates(array("MVPFooter"));
        $this->prependCssFiles(array("reset","MVPMain","jquery-ui","message","lightbox","MVPHeader","MVPFooter"));
        $this->prependScriptFiles(array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/Message","general/main","general/lightbox"));
        $this->prependIeScriptFiles(array("http://html5shiv.googlecode.com/svn/trunk/html5.js","http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js"));
    }
    
    public function display()
    {
        $GLOBALS['smarty']->assign("title",$this->title);
        $GLOBALS['smarty']->assign("navPosition",$this->navPosition);
        $GLOBALS['smarty']->assign("loggedIn",$GLOBALS['userSession']->isLoggedIn());
        $GLOBALS['smarty']->assign("loginURL",$GLOBALS['url']=="index.php" ? "index.php?login=true" : $GLOBALS['url']."&login=true");
        
        $GLOBALS['smarty']->assign("contentprovider",$GLOBALS['userSession']->isContentProvider());
        $GLOBALS['smarty']->assign("admin",$GLOBALS['userSession']->isAdmin());
        $GLOBALS['smarty']->assign("teacher",$GLOBALS['userSession']->isTeacher());
        $GLOBALS['smarty']->assign("userStatus",$GLOBALS['userSession']->getUserStatus());
        
        $GLOBALS['smarty']->assign("bodytemplates",$this->bodyTemplates);
        $GLOBALS['smarty']->assign("cssfiles", $this->cssFiles);
        $GLOBALS['smarty']->assign("iejavascriptfiles", $this->ieScriptFiles);
        $GLOBALS['smarty']->assign("javascriptfiles", $this->scriptFiles);
        $GLOBALS['smarty']->assign("fullnamejavascriptfiles", $this->fullnameScriptFiles);

        $GLOBALS['smarty']->display("main.tpl");
    }
    
    public function getData($uri)
    {
        $response = $GLOBALS['api']->get($uri);

 	if($response=="Not Found")
	{

	}
	else
	{
	    $this->pageContent = json_decode($response);
	} 
    }
    
    public function setNavPosition($navPosition)
    {
        $this->navPosition = $navPosition;
    }
}
