<?php

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


$api = new Api();

$uri = "/data/material/$field/$subject/$course/deletedLessons";

$result = $api->get($uri);

print_r($result);

?>
