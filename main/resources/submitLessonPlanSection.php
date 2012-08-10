<?php

# Includes
require_once("config/main.inc.php");
require_once("lib/PathArray.php");
require_once("lib/HelperFunctions.php");

if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()))
{
    die("Access Denied.");
}

$section = urlencode($_REQUEST['section']);
$lessonPlanId = $_REQUEST['lessonPlanId'];

if(!PathArray::isNameValid($section))
{
    die("Section name is invalid");
}

if (isset($_REQUEST['name']) && !empty($_REQUEST['name']))
{
    $name = $_REQUEST['name'];
    if(!PathArray::isNameValid($name))
    {
        die("Section rename is invalid");
    }
}

$api = new Api();
$api->setDataType();

if(isset($_REQUEST['name']))
{
    $payload = json_encode(array("name"=>$name,"username"=>$userSession->getUsername()));
}
else
{
    $payload = json_encode(array("username"=>$userSession->getUsername()));
}

$uri = "/data/lessonplan/$lessonPlanId/$section/";

$result = $api->post($uri,$payload);

print_r($result);