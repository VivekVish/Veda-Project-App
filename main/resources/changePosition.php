<?php

# Includes
require_once("config/main.inc.php");
require_once("lib/PathArray.php");

if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()))
{
    die("Access Denied.");
}

# Retrieve and sanitize data
if (isset($_REQUEST['oldPath']) && !empty($_REQUEST['oldPath']))
{
	$oldPath = trim($_REQUEST['oldPath']);
}
if (isset($_REQUEST['oldOrder']) && !empty($_REQUEST['oldOrder']))
{
	$oldOrder = trim($_REQUEST['oldOrder']);
}
if (isset($_REQUEST['newPath']) && !empty($_REQUEST['newPath']))
{
	$newPath = trim($_REQUEST['newPath']);
}
if (isset($_REQUEST['newOrder']) && !empty($_REQUEST['newOrder']))
{
	$newOrder = trim($_REQUEST['newOrder']);
}

PathArray::urlEncodePath($newPath);
PathArray::urlEncodePath($oldPath);

# Instantiate api class
$api = new Api();

# Make request
$payload = json_encode(array("oldPath"=>$oldPath,"oldOrder"=>$oldOrder,"newPath"=>$newPath,"newOrder"=>$newOrder));
$result = $api->post("$oldPath"."position/",$payload);

print_r($result);

?>
