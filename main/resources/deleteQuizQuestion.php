<?php

# Includes
require_once("config/main.inc.php");

if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()))
{
    die("Access Denied.");
}

# Retrieve and sanitize data
if (isset($_REQUEST['quizBlueprintId']) && !empty($_REQUEST['quizBlueprintId']))
{
	$quizBlueprintId = trim($_REQUEST['quizBlueprintId']);
}
if (isset($_REQUEST['questionBlueprintId']) && !empty($_REQUEST['questionBlueprintId']))
{
	$questionId = trim($_REQUEST['questionBlueprintId']);
}

# Instantiate api class
$api = new Api();

$uri = "/data/material/questionBlueprint/$questionId/";

$result = $api->delete($uri);

print_r($result);