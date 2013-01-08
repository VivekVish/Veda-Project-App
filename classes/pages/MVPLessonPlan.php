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
            $sectionPathArray = split("/",preg_replace('/^\/data\/lessonplan\/|\/$/','',$section->path));
            foreach($section->lessons as $lessonKey=>$lesson)
            {
                $lessonPathArray = split("/",preg_replace('/^\/data\/material\/|\/$/','',$lesson->path));
                $this->pageContent->children[$sectionKey]->lessons[$lessonKey]->quizLink = "index.php?type=lessonPlanQuiz&id=".$sectionPathArray[0]."&section=".$sectionPathArray[1]."&lesson=".$lessonPathArray[4];
                $this->pageContent->children[$sectionKey]->lessons[$lessonKey]->link = "index.php?type=lessonPlan&id=".$sectionPathArray[0]."&section=".$sectionPathArray[1]."&lesson=".$lessonPathArray[4];
                $this->pageContent->children[$sectionKey]->lessons[$lessonKey]->genericLink = "index.php?id=".$sectionPathArray[0]."&section=".$sectionPathArray[1]."&lesson=".$lessonPathArray[4]."&type=lessonPlan";
            }
        }

        $this->owner = $this->pageContent->username;
        if($GLOBALS['userSession']->getUsername()==$this->owner)
        {
            $this->isOwner=true;
        }
    }
}