<?php
	$title = "The Veda Project";
	$cssfiles = array("reset","main","default","flexcrollstyles-default","jquery-ui","message","contentprovider","question","contentprovider","equationEditor","questionEditor");
	$questionTypes = array(array("optgroup"=>"Math Question","group"=>array(
								 array("value"=>"multChoiceNumber","text"=>"Multiple Choice with Number Answers"),
								 array("value"=>"multChoiceNonNumber","text"=>"Multiple Choice with Non-Number Answers"),
								 array("value"=>"fillInTheBlankNumber","text"=>"Fill-in-the-blank with Number Answers"),
								 array("value"=>"fillInTheBlankEquation","text"=>"Fill-in-the-blank with Equation Answers"))),
						   array("optgroup"=>"Word Question","group"=>array(
								 array("value"=>"wordMultChoice","text"=>"Multiple Choice"),
								 array("value"=>"wordFillInTheBlank","text"=>"Fill-in-the-blank"))),
						   array("optgroup"=>"Chemistry Equation","group"=>array(
								 array("value"=>"wordMultChoice","text"=>"Multiple Choice"),
								 array("value"=>"wordFillInTheBlank","text"=>"Fill-in-the-blank"))));
	$iejavascriptfiles = array("http://html5shiv.googlecode.com/svn/trunk/html5.js","http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js");
	$ILOs = array("graph","equation","chemicalEquation","staticimage");
	$javascriptfiles = array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/Message","flexcroll/flexcroll","general/main","general/navbar", "content/ILOContents","flot/jquery.flot.min","flot/jquery.flot.dashes","contentProvider/content/BaseProvider","contentProvider/content/rangeTraverse",
							 "general/equationEditor","contentProvider/content/BaseHandler","contentProvider/content/ilo","contentProvider/ILO/formValidator","content/Content","contentProvider/content/ContentProvider","contentProvider/test/questionBlueprints","contentProvider/test/QuestionProvider","general/lightbox",
							 "contentProvider/test/QuestionHandler","test/test","contentProvider/test/QuestionContent","contentProvider/test/CorrectAnswer","contentProvider/test/QuestionEditor",
							 "contentProvider/test/AnswerField","contentProvider/test/QuestionParameters","contentProvider/content/ContentState", "content/citations", "contentProvider/test/awesomeForm", "general/JSON-js-prettyPrint","jquery/jsonform.min");
    $fullnamejavascriptfiles = array("MathJax/MathJax.js?config=default");
							 
	foreach($ILOs as $ilo)
	{
		array_push($javascriptfiles,"ILO/".$ilo."ILO");
		array_push($javascriptfiles,"contentProvider/ILO/".$ilo);
		array_push($cssfiles,"ILO/".$ilo);
	}

	$bodytemplates = array("usernav","contentprovider","navbar","questionEditor","footer");
	
	$quizId="5";
	$questionID = 1;
    
    $answers = array();
    $content = "";
    
	#Question Information
    $smarty->assign("content","");
    $smarty->assign("location","/data/material/questionBlueprints/5/");
    $smarty->assign("name","Question Editor");
    $smarty->assign("answerfieldtype","multchoice");
	$smarty->assign("quizId", $quizId);
    $smarty->assign("answers", $answers);
	$smarty->assign("questionID", $questionID);
	$smarty->assign("questionTypes", $questionTypes);
?>
