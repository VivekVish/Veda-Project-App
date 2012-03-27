<?php
	# Setup splash screen
	$title = "The Veda Project: The Free Online Educational Platform";

	# Setup html includes
	$cssfiles = array("reset","login","default");
	$iejavascriptfiles = array();
	$javascriptfiles = array("jquery/jquery","jquery/jquery-ui"); 
	
	function curPageURL()
	{
		$pageURL = 'http';
		
		$pageURL .= "://";

		if ($_SERVER["SERVER_PORT"] != "80") {$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];}
		else {$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];}
		return $pageURL;
	}
	
	$destination = urlencode(preg_replace('/&/','AMPERSANDCODE',curPageURL()));

	### Body Templates ###
	$bodytemplates = array("login");
	
    $smarty->assign("SITE_ROOT",SITE_ROOT);
	$smarty->assign("destination",$destination);
?>
