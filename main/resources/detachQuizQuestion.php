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
	$questionBlueprintId = trim($_REQUEST['questionBlueprintId']);
}

# Instantiate api class
$api = new Api();

# Make request
//$result = $api->delete("/data/material/$fieldName/$subjectName/$courseName/$lessonName/content/");
$result = 200;

# Interpert response
if ($result <= 200)
{
	echo $result;
}
else
{
	echo "failure";
}


?>
