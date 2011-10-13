<?php
	$title = "The Veda Project";
	
	# Setup html includes
	$cssfiles = array("reset","newUser","main","default");
	$iejavascriptfiles = array();
	$javascriptfiles = array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/Message","general/newUser","general/lightbox");
	
	// This page times out after 10 minutes
	$inactive = 600;

	if(isset($_SESSION['timeout']) ) 
	{
		$session_life = time() - $_SESSION['start'];
		if($session_life > $inactive)
		{
			session_destroy();
			header("Location: resources/logout.php");
		}
	}
	
	$_SESSION['timeout'] = time();
	
	$bodytemplates = array("newUser");
?>