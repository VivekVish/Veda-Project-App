<?php

require_once("config/main.inc.php");
require_once("lib/PathArray.php");
require_once("lib/HelperFunctions.php");

if(!$userSession->isLoggedIn()||!$userSession->isTeacher())
{
    die("Access Denied.");
}

$api = new Api();
$api->setDataType();

$uri = $_REQUEST['path'];
$payload = json_encode(array("showroleplay"=>$_REQUEST['showroleplay'],"showjobaide"=>$_REQUEST['showjobaide'],"showstudentparticipation"=>$_REQUEST['showstudentparticipation'],"showdiscussion"=>$_REQUEST['showdiscussion']));

$result = $api->post($uri,$payload);

print_r($result);