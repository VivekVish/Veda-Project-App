<?php

# Includes
require_once("config/main.inc.php");
require_once("lib/PathArray.php");
require_once("lib/HelperFunctions.php");

if(!$userSession->isLoggedIn())
{
    die("Access Denied.");
}

$id = $_REQUEST['id'];

$api = new Api();
$api->setDataType();

$uri = "/user/lessonplan/{$userSession->getUserName()}/$id/";

$result = $api->delete($uri);

print_r($result);