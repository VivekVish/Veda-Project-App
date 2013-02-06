<?php

require_once("MVPLessonPlanTrainingManual.php");

class MVPTeacherTrainingManual extends MVPLessonPlanTrainingManual
{
    public function __construct()
    {
        parent::__construct();
        
        $this->appendCssFiles(array("MVPTeacherTrainingManual"));
        $this->appendScriptFiles(array("teacher/teacher"));
        $this->appendTemplates(array("trainingmanualteacher"));
    }
}