<?php

# Includes
require_once("config/main.inc.php");
require_once("lib/PathArray.php");
require_once("lib/HelperFunctions.php");

if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()&&!$userSession->isTeacher()))
{
    die("Access Denied.");
}

$field = "";
$subject = "";
$course = "";
$section = "";
$lesson = "";
PathArray::getPathFromRequest($field,$subject,$course,$section,$lesson);
$order = trim($_REQUEST['order']);
$lessonPlanId = urlencode(trim($_REQUEST['lessonPlanId']));
$lessonPlanSection = urlencode(trim($_REQUEST['lessonPlanSection']));

$payload = json_encode(array("path"=>"/data/material/$field/$subject/$course/$section/$lesson/","order"=>$order));

$api = new Api();
$api->setDataType();

$uri = "/data/lessonplan/$lessonPlanId/$lessonPlanSection/newLesson/";

$result = $api->post($uri,$payload);

print_r($result);