<?php

# Includes
require_once("config/main.inc.php");
require_once("lib/PathArray.php");
require_once("lib/HelperFunctions.php");

if(!$userSession->isLoggedIn())
{
    die("Please log back in.");
}

if (isset($_REQUEST['questionId']) && !empty($_REQUEST['questionId']))
{
	$questionId = $_REQUEST['questionId'];
}

if (isset($_REQUEST['answerId']) && !empty($_REQUEST['answerId']))
{
	$answerId = $_REQUEST['answerId'];
}

$api = new Api();
$api->setDataType();

$payload = json_encode(array("answerId"=>$_REQUEST['answerId'],"username"=>$userSession->getUsername()));

$uri = "/user/question/$questionId/";

$result = $api->post($uri, $payload);

print_r($result);