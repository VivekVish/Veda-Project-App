<?php

# Includes
require_once('config/main.inc.php');

if(MODE=="REG")
{
    require_once('classes/ResourcePath.php');
}
elseif(MODE=="CHW")
{
    require_once('classes/CHWResourcePath.php');
}

class App 
{
    private $loggedIn = false;
    private $contentprovider = false;
    private $teacher = false;
    private $admin = false;
    private $userStatus = "";
    private $navPosition = "";
    
    private $field = null;
    private $subject = null;
    private $course = null;
    private $section = null;
    private $lesson = null;
    private $type = null;
    private $id = null;
    private $login = null;
    private $username = null;
    
    private $path = null;
    private $pageClass = null;
    private $page = null;
    
    
    public function __construct()
    {
        $this->getStateVariables();
        
        $resourcePath = new ResourcePath($this->field,$this->subject,$this->course,$this->section,$this->lesson,$this->type,$this->id,$this->username,$this->userStatus);
        $this->path = $resourcePath->getCurrentPath();
        $this->pageClass = $resourcePath->getPageClass();
        $this->navPosition = $resourcePath->getNavPosition();
        
        
        if ($this->login==="true")
        {
            require_once("classes/pages/Login.php");
            $this->page = new Login();
        }
        elseif(($resourcePath->requiresLogin()&&!$this->loggedIn))
        {
            header("Location: ".$GLOBALS['url']."&login=true");
        }
        else
        {
            if($resourcePath->isAccessible($this->userStatus))
            {
                require_once("classes/pages/{$this->pageClass}.php");
                $this->page = new $this->pageClass();
                $this->page->setNavPosition($this->navPosition);
            }
            else
            {
                require_once("classes/pages/AccessDenied.php");
                $this->page = new AccessDenied();
            }
        }
        
        $this->page->getData($this->path);
    }
    
    private function getStateVariables()
    {
        if ($GLOBALS['userSession']->isLoggedIn())
        {
            $this->loggedIn=true;
            
            if($GLOBALS['userSession']->isAdmin())
            {
                $this->admin=true;
                $this->contentprovider=true;
                $this->teacher = false;
                $this->userStatus="admin";
            }
            else if ($GLOBALS['userSession']->isContentProvider())
            {
                $this->admin=false;
                $this->contentprovider = true;
                $this->teacher = false;
                $this->userStatus="contentProvider";
            }
            else if ($GLOBALS['userSession']->isTeacher())
            {
                $this->admin=false;
                $this->contentprovider = false;
                $this->teacher = true;
                $this->userStatus="teacher";
            }
            else
            {
                $this->admin=false;
                $this->contentprovider = false;
                $this->teacher = false;
                $this->userStatus="student";
            }
        }
        else
        {
            $this->userStatus="guest";
        }
        
        $this->getRequestVariable("field");
        $this->getRequestVariable("subject");
        $this->getRequestVariable("course");
        $this->getRequestVariable("section");
        $this->getRequestVariable("lesson");
        $this->getRequestVariable("type");
        $this->getRequestVariable("id");
        $this->getRequestVariable("login");

        $this->username = $GLOBALS['userSession']->getUsername();
    }
    
    private function getRequestVariable($requestVar)
    {
        if(isset($_REQUEST["$requestVar"]))
        {
            $this->$requestVar = urlencode(trim($_REQUEST["$requestVar"]));
        }
    }

    public function display()
    {
        $this->page->display();
    }
}