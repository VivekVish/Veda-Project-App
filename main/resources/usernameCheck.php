<?php
	
# Includes
require_once("config/main.inc.php");

if (isset($_REQUEST['username']) && !empty($_REQUEST['username']))
{
	$username = trim($_REQUEST['username']);
}
else
{
	die("Failed at application.");
}
	
# Instantiate api class
$api = new Api();

# Make request
$result = $api->get("/user/username/$username");

echo $result;


?>