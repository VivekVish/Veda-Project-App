<?php

# Includes
require_once("config/main.inc.php");
require_once("lib/PathArray.php");
require_once("lib/HelperFunctions.php");

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

if(!PathArray::isNameValid($section)||!PathArray::isNameValid($lesson))
{
    die("Section or lesson contains invalid characters");
}

if (isset($_REQUEST['content']) && !empty($_REQUEST['content']))
{
	$lessonContent = htmlentities(trim(HelperFunctions::removeCurlyQuotes($_REQUEST['content'])));
}
if (isset($_REQUEST['new_lesson']) && !empty($_REQUEST['new_lesson']))
{
	$newLesson = trim($_REQUEST['new_lesson']) == "true" ? true : false;
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
    
    if(!PathArray::isNameValid($name))
    {
        die("Rename lesson is invalid");
    }
}

# Build payload XML
//$payload = "<lesson><name>$lesson</name><description>$lesson</description><active>true</active><content>$lessonContent</content><ilos>$ilos</ilos></lesson>";
if(isset($newLesson)&&$newLesson)
{
    $payload = json_encode(array("name"=>urldecode($lesson),"description"=>urldecode($lesson),"ilos"=>$ilos,"active"=>"true","username"=>$userSession->getUsername(),"newLesson"=>true,"citations"=>$citations));
}
else if(isset($lessonContent))
{
	$payload = json_encode(array("name"=>urldecode($lesson),"description"=>urldecode($lesson),"content"=>$lessonContent,"ilos"=>$ilos,"active"=>"true","username"=>$userSession->getUsername(),"newLesson"=>false,"citations"=>$citations));
}
else
{
	$payload = json_encode(array("name"=>$name,"username"=>$userSession->getUsername(),"newLesson"=>false));
}

# Instantiate api class
$api = new Api();
$api->setDataType();

$uri = "/data/material/$field/$subject/$course/$section/$lesson/content";

$result = $api->post($uri, $payload);

print_r($result);

?>
