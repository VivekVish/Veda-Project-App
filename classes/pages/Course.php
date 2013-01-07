<?php

require_once("CourseParent.php");

class Course extends CourseParent
{
    public function __construct()
    {
        $bodyTemplates = array("course");
        $cssFiles = array();
        $scriptFiles = array();
        $ieScriptFiles = array();
        $fullnameScriptFiles = array();
        
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
    }
}