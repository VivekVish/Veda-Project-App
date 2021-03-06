<?php

require_once("config/main.inc.php");

if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()&&!$userSession->isTeacher()))
{
    die("Access Denied.");
}

$lessonPlanId = trim($_REQUEST['lessonPlanId']);
$section = preg_replace('/ /','_',trim($_REQUEST['section']));
$lessonName = preg_replace('/ /','_',trim($_REQUEST['lessonName']));
$additionType = preg_replace('/ /','_',trim($_REQUEST['type']));

$api = new Api();

$uri = "/data/lessonplan/$lessonPlanId/$section/$lessonName/$additionType/";
$result = $api->delete($uri);

print_r($result);