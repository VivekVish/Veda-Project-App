<?php

# Includes
require_once("config/main.inc.php");
require_once("lib/PathArray.php");
require_once("lib/HelperFunctions.php");

if(!$userSession->isLoggedIn()||(!$userSession->isContentProvider()&&!$userSession->isAdmin()&&!$userSession->isTeacher()))
{
    die("Access Denied.");
}

if (isset($_REQUEST['id']) && !empty($_REQUEST['id']))
{
	$id = trim($_REQUEST['id']);
}
else
{
    $id = "";
}

$lessonPlanName = trim($_REQUEST['lessonPlanName']);
$tags = $_REQUEST['tags'];
$notes = trim($_REQUEST['notes']);
$age = trim($_REQUEST['age']);
$gender = trim($_REQUEST['gender']);
$literacy = trim($_REQUEST['literacy']);
$location = trim($_REQUEST['location']);
$image = trim($_REQUEST['image']);
$additions = $_REQUEST['additions'];

$api = new Api();
$api->setDataType();

$uri = "/user/lessonplanmanager/{$userSession->getUserName()}/";

$payload = json_encode(array("id"=>$id,"name"=>$lessonPlanName,"tags"=>$tags,"notes"=>$notes,"age"=>$age,"gender"=>$gender,"literacy"=>$literacy,"location"=>$location,"image"=>$image));

$result = $api->post($uri, $payload);
$resultArray = json_decode($result);

if($id=="")
{
    $payload = json_encode(array("username"=>$userSession->getUsername()));
    $uri = "/data/lessonplan/{$resultArray->id}/$image/";

    $api->post($uri,$payload);

    $payload = json_encode(array("path"=>"/data/material/CHW_Training/CHW_Training/$image/$image/$image/","order"=>1));
    $uri = "/data/lessonplan/{$resultArray->id}/$image/newLesson/";

    $api->post($uri,$payload);
    
    $id = $resultArray->id;
}

foreach($additions as $value=>$key)
{
    $uri = "/data/lessonplan/$id/$image/$image/$value/inclusion/";

    if($key=="true")
    {
        $checkThis = $api->post($uri,$value);
    }
    else
    {
        $checkThis = $api->delete($uri);
    }
}

print_r($result);