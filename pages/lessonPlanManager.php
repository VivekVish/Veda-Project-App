<?php
	require_once("lib/PathArray.php");
	
	$title = "The Veda Project";
	
	$cssfiles = array("reset","main","default","flexcrollstyles-default","jquery-ui","message","lessonPlanManager");
	$iejavascriptfiles = array("http://html5shiv.googlecode.com/svn/trunk/html5.js","http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js");
	$javascriptfiles = array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/Message","general/main","flexcroll/flexcroll","general/navbar","general/lightbox","contentProvider/lessonPlan/LessonPlanManager");
	
	$bodytemplates = array("usernav","navbar","lessonPlanManager");

    $smarty->assign("lessonplans",json_decode($response));