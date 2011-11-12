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

if (isset($_REQUEST['content']) && !empty($_REQUEST['content']))
{
	$discussionContent = htmlentities(trim($_REQUEST['content']));
}
if (isset($_REQUEST['ilos']) && !empty($_REQUEST['ilos']))
{
	$ilos = json_encode($_REQUEST['ilos']);
}
else
{
	$ilos = json_encode(array());
}

if (isset($_REQUEST['citations']) && !empty($_REQUEST['citations']))
{
	$citations = json_encode($_REQUEST['citations']);
}
else
{
	$citations = json_encode(array());
}

// Only set on rename
if (isset($_REQUEST['name']) && !empty($_REQUEST['name']))
{
	$name = trim($_REQUEST['name']);
}

# Build payload XML

$payload = json_encode(array("content"=>$discussionContent,"ilos"=>$ilos,"active"=>"true","username"=>$userSession->getUsername(),"citations"=>$citations));

# Instantiate api class
$api = new Api();
$api->setDataType();

$uri = "/data/material/$field/$subject/$course/$section/$lesson/content/discussion/";

$result = $api->post($uri, $payload);

print_r($result);

?>
