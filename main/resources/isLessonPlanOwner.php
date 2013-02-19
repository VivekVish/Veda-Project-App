<?php

require_once("config/main.inc.php");
require_once("lib/PathArray.php");
require_once("lib/HelperFunctions.php");

if(!$userSession->isLoggedIn())
{
    die("Access Denied.");
}

$api = new Api();
$api->setDataType();

$uri = $_REQUEST['uri'];

$result = $api->get($uri);
$resultArray = json_decode($result);

print_r(json_encode(array("isMyLessonPlan"=>$resultArray->username==$userSession->getUsername())));