<?php

require_once("Frame.php");

class LessonPlan extends Frame
{
    protected $id = null;
    
    public function __construct()
    {
        $bodyTemplates = array("lessonPlan");
        $cssFiles = array("course","listEditor","lessonPlan");
        $scriptFiles = array("contentProvider/lessonPlan/LessonPlan");
        $ieScriptFiles = array();
        $fullnameScriptFiles = array();
        
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
    }
    
    public function display()
    {
        $GLOBALS['smarty']->assign("sectionArray",$this->pageContent->children);
        $GLOBALS['smarty']->assign("lessonPlanName",$this->pageContent->name);
        $GLOBALS['smarty']->assign("lessonPlanId",$this->id);
        
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
                $this->pageContent->children->$sectionKey->$lessonKey->quizLink = PathArray::pathToLink((string)$lesson->path)."&type=quiz";
                $this->pageContent->children->$sectionKey->$lessonKey->link = PathArray::pathToLink((string)$lesson->path)."&type=lesson";
                $this->pageContent->children->$sectionKey->$lessonKey->genericLink = PathArray::pathToLink((string)$lesson->path);
            }
        }
        
    }
}