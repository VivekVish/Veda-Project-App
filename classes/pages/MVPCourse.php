<?php

require_once("MVPCourseParent.php");

class MVPCourse extends MVPCourseParent
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