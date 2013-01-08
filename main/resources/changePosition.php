<?php

# Includes
require_once("config/main.inc.php");
require_once("lib/PathArray.php");

if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()))
{
    die("Access Denied.");
}

# Retrieve and sanitize data
$oldPath = trim($_REQUEST['oldPath']);
$oldOrder = trim($_REQUEST['oldOrder']);
$newPath = trim($_REQUEST['newPath']);
$newOrder = trim($_REQUEST['newOrder']);

PathArray::urlEncodePath($newPath);
PathArray::urlEncodePath($oldPath);

# Instantiate api class
$api = new Api();

# Make request
$payload = json_encode(array("oldPath"=>$oldPath,"oldOrder"=>$oldOrder,"newPath"=>$newPath,"newOrder"=>$newOrder, "username"=>$userSession->getUsername()));

$result = $api->post("$oldPath"."position/",$payload);

print_r($result);

?>
