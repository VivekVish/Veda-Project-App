<?php
	require_once("lib/PathArray.php");
	
	$quiz_id="5";
	$title = "The Veda Project";
	
	$cssfiles = array("reset","main","default","flexcrollstyles-default","jquery-ui","message","contentprovider","listEditor","course");
	$iejavascriptfiles = array("http://html5shiv.googlecode.com/svn/trunk/html5.js","http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js");
	$javascriptfiles = array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/Message","general/main","flexcroll/flexcroll","general/navbar","general/lightbox");
	
	$bodytemplates = array("usernav","navbar","course");
	
	# Get Lessons
	$sectionArray = array();
	$response=$api->get("/data/material/$field/$subject/$course/");

	$courseXML = new SimpleXMLElement("<parent>".$response."</parent>");
	$sectionXMLArray = $courseXML->xpath('/parent/course/sections/section');
	foreach($sectionXMLArray as $sectionKey => $sectionXMLElement)
	{
		$sectionInfo = array();
		$sectionInfo["name"] = (string)$sectionXMLElement->name;
		$sectionInfo["path"] = (string)$sectionXMLElement->path;
		$sectionInfo["order"] = (string)$sectionXMLElement->order;
		
		$sectionPath = (string)$sectionXMLElement->path;		
		$response = $api->get($sectionPath);
	
		$sectionXML = new SimpleXMLElement("<parent>".$response."</parent>");
		
		$lessonXMLArray = $sectionXML->xpath('/parent/section/lessons/lesson');
		
		$lessonArray = array();
		
		foreach($lessonXMLArray as $lessonKey => $lessonXMLElement)
		{
			array_push($lessonArray,array("name"=>(string)$lessonXMLElement->name,
									      "link"=>PathArray::pathToLink((string)$lessonXMLElement->path),
										  "path"=>(string)$lessonXMLElement->path,
										  "order"=>(string)$lessonXMLElement->order));
			
		}
		
		$sectionInfo["lessons"]=$lessonArray;
		array_push($sectionArray,$sectionInfo);		
	}

	
	# Course Information
	$smarty->assign("classPath","/data/material/$field/$subject/$course/");
	$smarty->assign("sectionArray",$sectionArray);
	$smarty->assign("course", preg_replace('/_/'," ",$course));
	$smarty->assign("quiz_id", $quiz_id);
	$smarty->assign("questions", $questions);
?>
