<?php

# Includes
require_once("config/main.inc.php");
require_once("lib/PathArray.php");
require_once("lib/HelperFunctions.php");

if(!$userSession->isLoggedIn())
{
    die("Please log back in.");
}

if (isset($_REQUEST['quizPath']) && !empty($_REQUEST['quizPath']))
{
    $quizPath = $_REQUEST['quizPath'];
}

$api = new Api();

$uriArr = explode("/",trim($quizPath,"/"));

if(count($uriArr)==6)
{
    $uri = $quizPath."{$userSession->getUsername()}/";
}
else
{
    $uri = $quizPath."quiz/{$userSession->getUsername()}/";
}

$result = $api->delete($uri);

print_r($result);