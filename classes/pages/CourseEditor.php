<?php

require_once("CourseParent.php");

class CourseEditor extends CourseParent
{
    public function __construct()
    {
        $bodyTemplates = array("courseEditor");
        $cssFiles = array("contentprovider","listEditor");
        $scriptFiles = array("contentProvider/course/CourseEditor");
        $ieScriptFiles = array();
        $fullnameScriptFiles = array();
        
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
    }
}