<?php

require_once("config/main.inc.php");

if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()&&!$userSession->isTeacher()))
{
    die("Access Denied.");
}

if (isset($_REQUEST['lessonPlanId']) && !empty($_REQUEST['lessonPlanId']))
{
    $lessonPlanId = trim($_REQUEST['lessonPlanId']);
}

$img = trim($_REQUEST['image']);

$api = new Api();

$uri = "/data/lessonplan/{$lessonPlanId}/$img/$img/";
$api->delete($uri);

$uri = "/data/lessonplan/{$lessonPlanId}/$img/";
$api->delete($uri);

$uri = "/data/lessonplan/{$lessonPlanId}/";
$result = $api->delete($uri);

print_r($result);