<?php

# Includes
require_once("../../config/main.inc.php");

# Retrieve and sanitize data
if (isset($_REQUEST['ILOIds']) && !empty($_REQUEST['ILOIds']))
{
	$ILOIds = trim(json_encode($_REQUEST['ILOIds']),"[]");
}

# Instantiate api class and make request
$api = new Api();
$api->setContentType("application/json");
$api->setAcceptType("application/json");

$response = $api->get("/data/ilo/$ILOIds");
echo $response;

?>
