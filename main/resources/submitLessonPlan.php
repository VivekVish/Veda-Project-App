<?php

# Includes
require_once("config/main.inc.php");
require_once("lib/PathArray.php");
require_once("lib/HelperFunctions.php");

if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()))
{
    die("Access Denied.");
}

if (isset($_REQUEST['id']) && !empty($_REQUEST['id']))
{
	$id = trim($_REQUEST['id']);
}
else
{
    $id = "";
}

if (isset($_REQUEST['lessonPlanName']) && !empty($_REQUEST['lessonPlanName']))
{
	$lessonPlanName = trim($_REQUEST['lessonPlanName']);
}

if (isset($_REQUEST['tags']) && !empty($_REQUEST['tags']))
{
    $tags = $_REQUEST['tags'];
}

if (isset($_REQUEST['notes']) && !empty($_REQUEST['notes']))
{
    $notes = trim($_REQUEST['notes']);
}

$api = new Api();
$api->setDataType();

$uri = "/user/lessonplanmanager/{$userSession->getUserName()}/";

$payload = json_encode(array("id"=>$id,"name"=>$lessonPlanName,"tags"=>$tags,"notes"=>$notes));

$result = $api->post($uri, $payload);

print_r($result);