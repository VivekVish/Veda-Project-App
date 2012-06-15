<?php
	$title = "The Veda Project";
	$ILOs = array("graph","equation","chemicalEquation","staticimage");
	
	$cssfiles = array("reset","main","default","flexcrollstyles-default","jquery-ui","message","question","contentprovider","equationEditor");
	$iejavascriptfiles = array("http://html5shiv.googlecode.com/svn/trunk/html5.js","http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js");
	$javascriptfiles = array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/Message","flexcroll/flexcroll","general/main","general/navbar", "content/ILOContents","flot/jquery.flot.min","flot/jquery.flot.dashes","test","contentProvider/content/BaseProvider",
							 "contentProvider/content/rangeTraverse","general/equationEditor","contentProvider/content/BaseHandler","contentProvider/content/ilo","contentProvider/ILO/formValidator","contentProvider/lesson/LessonProvider",
							 "contentProvider/test/QuestionProvider","contentProvider/test/QuestionHandler","contentProvider/questionContents","general/lightbox","contentProvider/ContentState");
    $fullnamejavascriptfiles = array("MathJax/MathJax.js?config=default");
	
	$bodytemplates = array("usernav","contentProvider","navbar","quiz","footer");
	
	foreach($ILOs as $ilo)
	{
		array_push($javascriptfiles,"ILO/".$ilo."ILO");
		array_push($javascriptfiles,"contentProvider/ILO/".$ilo);
		array_push($cssfiles,"ILO/".$ilo);
	}
	
	$questions = array();

	#Question Information
	$smarty->assign("quiz_id", $quiz_id);
	$smarty->assign("questions", $questions);