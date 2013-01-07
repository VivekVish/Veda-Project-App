<?php

# Includes
require_once("config/main.inc.php");
require_once("lib/PathArray.php");

if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()))
{
    die("Access Denied.");
}

# Retrieve and sanitize data
$field = "";
$subject = "";
$course = "";
$section = "";
$lesson = "";
PathArray::getPathFromRequest($field,$subject,$course,$section,$lesson);

if (isset($_REQUEST['lesson_ids']) && !empty($_REQUEST['lesson_ids']))
{
	$lessonIds = $_REQUEST['lesson_ids'];
}
else
{
    die("Success.");
}

$api = new Api();

$payload = json_encode(array("username"=>$userSession->getUsername(),"lessonIds"=>$lessonIds));

$uri = "/data/material/$field/$subject/$course/deletedLessons/";

$result = $api->post($uri,$payload);

print_r($result);

?>
