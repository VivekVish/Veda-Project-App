<?php

require_once('MVPFrame.php');

class MVPMaterialList extends MVPFrame
{
    protected $materialHeader = null;
    protected $myModules = array();
    protected $myAddedModules = array();
    
    public function __construct()
    {
        $bodyTemplates = array("MVPMaterialList");
        $cssFiles = array("MVPMaterialList","lessonPlanManager");
        $scriptFiles = array("MVP/MVPModuleManager");
        $ieScriptFiles = array();
        $fullnameScriptFiles = array();
        
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
    }
    
    public function display()
    {
        $GLOBALS['smarty']->assign("title",$this->title);
        $GLOBALS['smarty']->assign("myModules",$this->myModules);
        $GLOBALS['smarty']->assign("myAddedModules",$this->myAddedModules);
        
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
            
            foreach($this->myModules as $key=>$module)
            {
                $genderText = $module->gender=="both" ? "both genders" : $module->gender;
                $literacyText = $module->literacy=="yes" ? "literacy required" : "literacy not required";
                if($module->tags=="")
                {
                    $this->myModules[$key]->tagText = sprintf("<span class='moduleLocation'>%s</span>, <span class='moduleAge'>%s</span>, <span class='moduleGender'>%s</span>, <span class='moduleLiteracy'>%s</span>",$module->location,$module->age,$genderText,$literacyText);
                }
                else
                {
                    $this->myModules[$key]->tagText = sprintf("<span class='moduleTags'>%s</span>, <span class='moduleLocation'>%s</span>, <span class='moduleAge'>%s</span>, <span class='moduleGender'>%s</span>, <span class='moduleLiteracy'>%s</span>",$module->tags,$module->location,$module->age,$genderText,$literacyText);
                }
            }
            
            $this->myAddedModules = json_decode($GLOBALS['api']->get("/user/lessonplan/{$GLOBALS['userSession']->getUsername()}/"));
            foreach($this->myAddedModules as $key=>$module)
            {
                if($module->type=="custom")
                {
                    $genderText = $module->gender=="both" ? "both genders" : $module->gender;
                    $literacyText = $module->literacy=="yes" ? "literacy required" : "literacy not required";
                    if($module->tags=="")
                    {
                        $this->myAddedModules[$key]->tagText = sprintf("<span class='moduleLocation'>%s</span>, <span class='moduleAge'>%s</span>, <span class='moduleGender'>%s</span>, <span class='moduleLiteracy'>%s</span>",$module->location,$module->age,$genderText,$literacyText);
                    }
                    else
                    {
                        $this->myAddedModules[$key]->tagText = sprintf("<span class='moduleTags'>%s</span>, <span class='moduleLocation'>%s</span>, <span class='moduleAge'>%s</span>, <span class='moduleGender'>%s</span>, <span class='moduleLiteracy'>%s</span>",$module->tags,$module->location,$module->age,$genderText,$literacyText);
                    }
                }
                else if($module->type=="standard")
                {
                    $this->myAddedModules[$key]->image = $module->name;
                    $this->myAddedModules[$key]->name = preg_replace('/_/',' ',$module->name);
                    
                    $uriArr = explode("/",trim($module->path,"/"));
                    
                    $this->myAddedModules[$key]->link = sprintf("index.php?field=%s&subject=%s&course=%s",$uriArr[2],$uriArr[3],$uriArr[4]);
                }
            }
       }
    }
    
    public function setNavPosition($navPosition)
    {
        
    }
}

?>
