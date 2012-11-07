<?php

require_once('AbstractFrame.php');
require_once('lib/PathArray.php');

class MVPMaterialList extends AbstractFrame
{
    protected $materialHeader = null;
    protected $myModules = array();
    
    public function __construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles)
    {
        parent::__construct("The Veda Project: The Free Online Educational Platform", $bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
        
        $this->appendTemplates(array("MVPHeader","MVPMaterialList","MVPModules"));
        $this->appendCssFiles(array("reset","message","MVPMain","MVPMaterialList"));
        $this->prependScriptFiles(array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/Message","general/lightbox"));
    }
    
    public function display()
    {
        $GLOBALS['smarty']->assign("title",$this->title);
        $GLOBALS['smarty']->assign("myModules",$this->myModules);
        
        $GLOBALS['smarty']->assign("loggedIn",$GLOBALS['userSession']->isLoggedIn());
        $GLOBALS['smarty']->assign("loginURL",$GLOBALS['url']=="index.php" ? "index.php?login=true" : $GLOBALS['url']."&login=true");
        
        $GLOBALS['smarty']->assign("contentprovider",$GLOBALS['userSession']->isContentProvider());
        $GLOBALS['smarty']->assign("admin",$GLOBALS['userSession']->isAdmin());
        $GLOBALS['smarty']->assign("teacher",$GLOBALS['userSession']->isTeacher());
        $GLOBALS['smarty']->assign("userStatus",$GLOBALS['userSession']->getUserStatus());
        
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
        $response = $GLOBALS['api']->get($uri);

 	if($response=="Not Found")
	{

	}
	else
	{
	    $this->pageContent = json_decode($response);
	}
        
        foreach($this->pageContent->children as $key=>$value)
        {
            $this->pageContent->children[$key]->img = preg_replace('/ /',"_",$value->name);
            $this->pageContent->children[$key]->link = PathArray::pathToLink($value->path);
        }
        
        if($GLOBALS['userSession']->getUsername())
        {
            $this->myModules = json_decode($GLOBALS['api']->get("/user/lessonplanmanager/{$GLOBALS['userSession']->getUsername()}/"));
        }
    }
    
    public function setNavPosition($navPosition)
    {
        
    }
}

?>
