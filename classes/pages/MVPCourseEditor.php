<?php

require_once("MVPCourseParent.php");

class MVPCourseEditor extends MVPCourseParent
{
    public function __construct()
    {
        $bodyTemplates = array("courseEditor");
        $cssFiles = array();
        $scriptFiles = array("contentProvider/course/CourseEditor");
        $ieScriptFiles = array();
        $fullnameScriptFiles = array();
        
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
    }
}