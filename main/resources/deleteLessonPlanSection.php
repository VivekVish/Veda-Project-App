<?php
require_once("config/main.inc.php");

if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()&&!$userSession->isTeacher()))
{
    die("Access Denied.");
}

$lessonPlanId = trim($_REQUEST['lessonPlanId']);
$section = preg_replace('/ /','_',trim($_REQUEST['section']));

$api = new Api();

$uri = "/data/lessonplan/{$lessonPlanId}/{$section}/";
$result = $api->delete($uri);

print_r($result);