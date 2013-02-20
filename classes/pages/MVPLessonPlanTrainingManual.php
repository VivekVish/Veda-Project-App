<?php

require_once('MVPTrainingManual.php');

class MVPLessonPlanTrainingManual extends MVPTrainingManual
{
    public function __construct()
    {       
        parent::__construct();
        
        $this->appendCssFiles(array("MVPTeacherTrainingManual"));
        //$this->appendTemplates(array("trainingmanualteacher"));
        $this->appendScriptFiles(array("teacher/teacher","lessonPlan/LessonPlanTrainingManual"));
    }
    
    public function getData($uri)
    {
        parent::getData($uri);
        
    }
}

?>