<?php
	$quiz_id="5";
	$title = "The Veda Project";
	$cssfiles = array("reset","main","default","flexcrollstyles-default","jquery-ui","message","question");
	$iejavascriptfiles = array("http://html5shiv.googlecode.com/svn/trunk/html5.js","http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js");
	$ILOs = array("graph","equation","staticimage");
	$javascriptfiles = array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/Message","flexcroll/flexcroll","general/main","general/navbar", "content/ILOContents","flot/jquery.flot.min","test");
    $fullnamejavascriptfiles = array("MathJax/MathJax.js?config=default");
	foreach($ILOs as $ilo)
	{
		array_push($javascriptfiles,"ILO/".$ilo."ILO");
		array_push($cssfiles,"ILO/".$ilo);
	}
	
	$bodytemplates = array("usernav","navbar","notebar","quiz","footer");
	
	$questions = array();

	$questions[0]['id'] = "g123";
	$questions[0]['content'] = "What is <div class='ilo' data-ilotype='equation' id='ilo100'></div>?";
	$questions[0]['answers'][0] = "Answer 1";
	$questions[0]['answers'][1] = "Answer 2";
	$questions[0]['answers'][2] = "Answer 3";
	$questions[0]['answers'][3] = "Answer 4";
	$questions[0]['answerfieldtype'] = "fillintheblank";
	
	$questions[1]['id'] = "g456";
	$questions[1]['content'] = "What is hi?";
	$questions[1]['answers'][0] = "Answer 1";
	$questions[1]['answers'][1] = "Answer 2";
	$questions[1]['answers'][2] = "Answer 3";
	$questions[1]['answers'][3] = "Answer 4";
	$questions[1]['answerfieldtype'] = "fillintheblank";

	#Question Information
	$smarty->assign("quiz_id", $quiz_id);
	$smarty->assign("questions", $questions);
	$smarty->assign("contentprovider", $contentprovider);

?>
