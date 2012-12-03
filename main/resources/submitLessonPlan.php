<?php

# Includes
require_once("config/main.inc.php");
require_once("lib/PathArray.php");
require_once("lib/HelperFunctions.php");

if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()&&!$userSession->isTeacher()))
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

$lessonPlanName = trim($_REQUEST['lessonPlanName']);
$tags = $_REQUEST['tags'];
$notes = trim($_REQUEST['notes']);
$age = trim($_REQUEST['age']);
$gender = trim($_REQUEST['gender']);
$literacy = trim($_REQUEST['literacy']);
$location = trim($_REQUEST['location']);
$image = trim($_REQUEST['image']);

$api = new Api();
$api->setDataType();

$uri = "/user/lessonplanmanager/{$userSession->getUserName()}/";

$payload = json_encode(array("id"=>$id,"name"=>$lessonPlanName,"tags"=>$tags,"notes"=>$notes,"age"=>$age,"gender"=>$gender,"literacy"=>$literacy,"location"=>$location,"image"=>$image));

$result = $api->post($uri, $payload);

print_r($result);