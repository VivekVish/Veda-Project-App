<?php

require_once("MVPFrame.php");

class MVPLessonPlan extends MVPFrame
{
    protected $id = null;
    protected $owner = null;
    protected $isOwner = null;
    
    public function __construct()
    {
        $bodyTemplates = array("lessonPlan");
        $cssFiles = array("MVPListEditor","MVPCourse","MVPLessonPlan","lessonPlanManager");
        $scriptFiles = array("MVP/MVPModuleManager","contentProvider/lessonPlan/MVPLessonPlan");
        $ieScriptFiles = array();
        $fullnameScriptFiles = array();
        
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
    }
    
    public function display()
    {
        $GLOBALS['smarty']->assign("sectionArray",$this->pageContent->children);
        $GLOBALS['smarty']->assign("lessonPlanName",$this->pageContent->name);
        $GLOBALS['smarty']->assign("lessonPlanId",$this->id);
        $GLOBALS['smarty']->assign("isOwner",$this->isOwner);
        $GLOBALS['smarty']->assign("tags",implode(",",$this->pageContent->tags));
        $GLOBALS['smarty']->assign("age",$this->pageContent->age);
        $GLOBALS['smarty']->assign("notes",$this->pageContent->notes);
        $GLOBALS['smarty']->assign("gender",$this->pageContent->gender);
        $GLOBALS['smarty']->assign("literacy",$this->pageContent->literacy ? "yes" : "no");
        $GLOBALS['smarty']->assign("location",$this->pageContent->location);
        $GLOBALS['smarty']->assign("image",$this->pageContent->image);
        
        parent::display();
    }
    
    public function getData($uri)
    {
        parent::getData($uri);
        
        $uriArr = explode("/",trim($uri,"/"));
        
        $this->id = $uriArr[2];
        
        foreach($this->pageContent->children as $sectionKey=>$section)
        {
            foreach($section->lessons as $lessonKey=>$lesson)
            {
                $this->pageContent->children[$sectionKey]->lessons[$lessonKey]->quizLink = PathArray::pathToLink((string)$lesson->path)."&type=quiz";
                $this->pageContent->children[$sectionKey]->lessons[$lessonKey]->link = PathArray::pathToLink((string)$lesson->path)."&type=lesson";
                $this->pageContent->children[$sectionKey]->lessons[$lessonKey]->genericLink = PathArray::pathToLink((string)$lesson->path);
            }
        }

        $this->owner = $this->pageContent->username;
        if($GLOBALS['userSession']->getUsername()==$this->owner)
        {
            $this->isOwner=true;
        }
    }
}