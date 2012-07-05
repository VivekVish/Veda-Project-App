<?php

    $title = "The Veda Project: The Free Online Educational Platform";
	$cssfiles = array("reset","main","default","flexcrollstyles-default","jquery-ui","message","landing");
	$iejavascriptfiles = array("http://html5shiv.googlecode.com/svn/trunk/html5.js","http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js");
	$javascriptfiles = array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/main","general/Message","flexcroll/flexcroll","general/navbar");
	
	### Body Templates ###
    $bodytemplates = array("usernav","navbar","video");
    
    if($contentprovider)
	{
		array_push($javascriptfiles,"contentProvider/content/video");
	}
    
    $location = "/data/material/{$_REQUEST['field']}/{$_REQUEST['subject']}/{$_REQUEST['course']}/{$_REQUEST['section']}/{$_REQUEST['lesson']}/";
    
    $smarty->assign("location",$location);
    $smarty->assign("video",$responseArray->content);
    $smarty->assign("name",preg_replace('/_/',' ',$_REQUEST['lesson'])." Video");