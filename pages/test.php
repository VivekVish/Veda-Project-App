<?php
	$title = "The Veda Project";
    $cssfiles = array("reset","main","default","flexcrollstyles-default","jquery-ui","message","question");
	$iejavascriptfiles = array("http://html5shiv.googlecode.com/svn/trunk/html5.js","http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js");
	$ILOs = array("graph","equation","chemicalEquation","staticimage");
	$javascriptfiles = array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/Message","flexcroll/flexcroll","general/main","general/navbar", "content/ILOContents","content/Content","flot/jquery.flot.min","flot/jquery.flot.dashes","test/test","content/citations");
    $fullnamejavascriptfiles = array("MathJax/MathJax.js?config=default");
	foreach($ILOs as $ilo)
	{
		array_push($javascriptfiles,"ILO/".$ilo."ILO");
		array_push($cssfiles,"ILO/".$ilo);
	}
	
	$bodytemplates = array("usernav","navbar","quiz","footer");
	
	$questions = array();
    $questions[0]['content'] = html_entity_decode($responseArray->content);
    $questions[0]['answerfieldtype'] = "multchoice";
    $questions[0]['answers'] = $responseArray->answerChoices;
    $questions[0]['id'] = $questionId;

	#Question Information
    if(isset($lastQuestion)&&isset($lastCorrectAnswer))
    {
        $smarty->assign("lastQuestion",$lastQuestion);
        $smarty->assign("lastCorrectAnswer",$lastCorrectAnswer);
    }
	$smarty->assign("questions", $questions);
    $smarty->assign("lastAnswer", $lastAnswer);
	$smarty->assign("contentprovider", $contentprovider);