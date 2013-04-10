<?php

require_once("config/main.inc.php");
require_once("lib/PathArray.php");
require_once("lib/HelperFunctions.php");

if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()&&!$userSession->isTeacher()))
{
    die("Access Denied.");
}

$api = new Api();
$api->setDataType();

$uriArr = explode("/",trim($_REQUEST['path'],"/"));
$lessonPlan = json_decode($api->get(sprintf("/%s/%s/%s/",$uriArr[0],$uriArr[1],$uriArr[2])));
$payloadArray = $_REQUEST;
unset($payloadArray['path']);
$payload = json_encode($payloadArray);

if($lessonPlan->username==$userSession->getUsername())
{
    $uri = $_REQUEST['path'];
    $result = $api->post($uri,$payload);

    print_r($result);
}
else
{
    die("Access Denied.");
}

