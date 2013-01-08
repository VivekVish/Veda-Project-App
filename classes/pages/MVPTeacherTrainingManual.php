<?php

require_once("MVPTrainingManual.php");

class MVPTeacherTrainingManual extends MVPTrainingManual
{
    public function __construct()
    {
        parent::__construct();
        
        $this->appendCssFiles(array("trainingmanualteacher"));
        $this->appendScriptFiles(array("teacher/teacher"));
        $this->appendTemplates(array("trainingmanualteacher"));
    }
}