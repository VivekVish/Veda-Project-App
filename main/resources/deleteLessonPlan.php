<?php

require_once("config/main.inc.php");

if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()))
{
    die("Access Denied.");
}

if (isset($_REQUEST['lessonPlanId']) && !empty($_REQUEST['lessonPlanId']))
{
	$lessonPlanId = trim($_REQUEST['lessonPlanId']);
}

$api = new Api();
$uri = "/data/lessonplan/{$lessonPlanId}/";
$result = $api->delete($uri);

print_r($result);