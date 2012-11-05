<?php
    require_once("lib/PathArray.php");
	
    $title = "The Veda Project";

    $cssfiles = array("reset","main","default","flexcrollstyles-default","jquery-ui","message","course","listEditor","lessonPlan");
    $iejavascriptfiles = array("http://html5shiv.googlecode.com/svn/trunk/html5.js","http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js");
    $javascriptfiles = array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/Message","general/main","flexcroll/flexcroll","general/navbar","general/lightbox","contentProvider/lessonPlan/LessonPlan");

    $bodytemplates = array("usernav","navbar","lessonPlan");
    $sectionArray = $responseArray->children;
    
    foreach($sectionArray as $sectionKey=>$section)
    {
        foreach($section->lessons as $lessonKey=>$lesson)
        {
            $sectionArray->$sectionKey->$lessonKey->quizLink = PathArray::pathToLink((string)$lesson->path)."&type=quiz";
            $sectionArray->$sectionKey->$lessonKey->link = PathArray::pathToLink((string)$lesson->path)."&type=lesson";
            $sectionArray->$sectionKey->$lessonKey->genericLink = PathArray::pathToLink((string)$lesson->path);
        }
    }
    
    $smarty->assign("lessonPlanName",$responseArray->name);
    $smarty->assign("lessonPlanId",$lessonPlanId);
    $smarty->assign("sectionArray",$responseArray->children);