<?php
	
	$title = "The Veda Project";
	$cssfiles = array("reset","main","default","flexcrollstyles-default","jquery-ui","message","landing");
	$iejavascriptfiles = array("http://html5shiv.googlecode.com/svn/trunk/html5.js","http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js");
	$javascriptfiles = array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/Message","flexcroll/flexcroll","general/navbar");
	
	if($contentprovider)
	{
		array_push($cssfiles,"contentprovider","equationEditor");
	}
	
	### Body Templates ###
    $bodytemplates = array("usernav","navbar","notebar","landing");
?>
