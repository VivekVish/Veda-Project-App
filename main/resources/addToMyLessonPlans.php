<?php

# Includes
require_once("config/main.inc.php");
require_once("lib/PathArray.php");
require_once("lib/HelperFunctions.php");

if(!$userSession->isLoggedIn())
{
    die("Access Denied.");
}

$path = $_REQUEST['path'];

$api = new Api();
$api->setDataType();

$uri = "/user/lessonplan/{$userSession->getUserName()}/";

$payload = json_encode(array("lessonplanpath"=>$path));

$result = $api->post($uri, $payload);

print_r($result);