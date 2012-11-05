<?php

require_once("TrainingManual.php");

class TeacherTrainingManual extends TrainingManual
{
    public function __construct()
    {
        parent::__construct();
        
        $this->appendCssFiles(array("trainingmanualteacher"));
        $this->appendScriptFiles(array("teacher/teacher"));
        $this->appendTemplates(array("trainingmanualteacher"));
    }
}

?>
