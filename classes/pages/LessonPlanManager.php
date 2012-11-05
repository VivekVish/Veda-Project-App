<?php

require_once("Frame.php");

class LessonPlanManager extends Frame
{
    public function __construct()
    {
        $bodyTemplates = array("lessonPlanManager");
        $cssFiles = array("lessonPlanManager");
        $scriptFiles = array("contentProvider/lessonPlan/LessonPlanManager");
        $ieScriptFiles = array();
        $fullnameScriptFiles = array();
        
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
    }
    
    public function display()
    {
        $GLOBALS['smarty']->assign("lessonplans",$this->pageContent);
        
        parent::display();
    }
}

?>
