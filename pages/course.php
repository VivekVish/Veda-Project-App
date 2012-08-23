<?php
	require_once("lib/PathArray.php");
	
	$quiz_id="5";
	$title = "The Veda Project";
	
	$cssfiles = array("reset","main","default","flexcrollstyles-default","jquery-ui","message","contentprovider","listEditor","course");
	$iejavascriptfiles = array("http://html5shiv.googlecode.com/svn/trunk/html5.js","http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js");
	$javascriptfiles = array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/Message","general/main","flexcroll/flexcroll","general/navbar","general/lightbox");
	
	$bodytemplates = array("usernav","navbar","course");
	
	# Get Lessons
	$sectionOutput = array();
	$response=$api->get("/data/material/$field/$subject/$course/");
    $courseArray = json_decode($response);

	$sectionArray = $courseArray->children;
    
	foreach($sectionArray as $sectionKey => $sectionElement)
	{
		$sectionInfo = array();
		$sectionInfo["name"] = (string)$sectionElement->name;
		$sectionInfo["path"] = (string)$sectionElement->path;
		$sectionInfo["order"] = (string)$sectionElement->order;
		
		$responseArray = json_decode($api->get($sectionInfo['path']));

		$lessonJSONArray = $responseArray->children;
        
		$lessonArray = array();
        
        if(isset($responseArray->children))
        {
            foreach($lessonJSONArray as $lessonKey => $lessonElement)
            {
                array_push($lessonArray,array("name"=>(string)$lessonElement->name,
                                              "link"=>PathArray::pathToLink((string)$lessonElement->path)."&type=lesson",
                                              "quizLink"=>PathArray::pathToLink((string)$lessonElement->path)."&type=quiz",
                                              "genericLink"=>PathArray::pathToLink((string)$lessonElement->path),
                                              "path"=>(string)$lessonElement->path,
                                              "order"=>(string)$lessonElement->order,
                                              "additions"=>$lessonElement->lessonAdditions));

            }
        }
        
		$sectionInfo["lessons"]=$lessonArray;

		array_push($sectionOutput,$sectionInfo);		
	}

	# Course Information
	$smarty->assign("classPath","/data/material/$field/$subject/$course/");
	$smarty->assign("sectionArray",$sectionOutput);
	$smarty->assign("course", preg_replace('/_/'," ",$course));
	$smarty->assign("quiz_id", $quiz_id);
	$smarty->assign("questions", $questions);
?>
