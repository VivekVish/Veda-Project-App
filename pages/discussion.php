<?php
	require_once("lib/PathArray.php");
    
	$title = "The Veda Project";
	$cssfiles = array("reset","main","default","flexcrollstyles-default","jquery-ui","message");
	$iejavascriptfiles = array("http://html5shiv.googlecode.com/svn/trunk/html5.js","http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js");
	$ILOs = array("graph","equation","chemicalEquation","staticimage");
	$javascriptfiles = array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/Message","flexcroll/flexcroll","general/main","general/navbar","general/addAllTrigFunctions","content/ILOContents","flot/jquery.flot.min","flot/jquery.flot.dashes","content/Content");
    $fullnamejavascriptfiles = array("MathJax/MathJax.js?config=default");
	foreach($ILOs as $ilo)
	{
		array_push($javascriptfiles,"ILO/".$ilo."ILO");
		array_push($cssfiles,"ILO/".$ilo);
	}
	
	if($contentprovider)
	{
		array_push($cssfiles,"contentprovider","equationEditor");
		array_push($javascriptfiles,"jquery/jquery.form","contentProvider/content/BaseProvider","contentProvider/content/rangeTraverse","general/equationEditor","contentProvider/content/BaseHandler","contentProvider/content/ilo",
									"contentProvider/ILO/formValidator","contentProvider/content/ContentProvider","contentProvider/content/ContentHandler","general/lightbox","contentProvider/content/ContentState",
                                    "contentProvider/discussion/DiscussionProvider");
		foreach($ILOs as $ilo)
		{
			array_push($javascriptfiles,"contentProvider/ILO/".$ilo);
		}
	}
	
	### Body Templates ###
	if($contentprovider)
	{
		$bodytemplates = array("usernav","contentprovider","navbar","lesson","footer");
	}
	else
	{
		$bodytemplates = array("usernav","navbar","notebar","lesson","footer");
	}
    
    $lessonLocation = "/data/material/{$_REQUEST['field']}/{$_REQUEST['subject']}/{$_REQUEST['course']}/{$_REQUEST['section']}/{$_REQUEST['lesson']}/";
    $location = "{$lessonLocation}discussion/";
    $historyLink = pathArray::pathToLink($lessonLocation)."&type=lessonDiscussionHistory";
    $lessonLink = pathArray::pathToLink($lessonLocation);
    
    if($autosaveTime[0]!==false)
    {
        $smarty->assign("lastSavedAt",$autosaveTime[0]);
        $autosaveLink = pathArray::pathToLink($location)."Autosave";
        $smarty->assign("autosaveLink",$autosaveLink);
    }
    
    $smarty->assign("type","lessonDiscussion");
    $smarty->assign("lessonLink",$lessonLink);
    $smarty->assign("location",$location);
    $smarty->assign("historyLink",$historyLink);
    $smarty->assign("name",$name);
?>
