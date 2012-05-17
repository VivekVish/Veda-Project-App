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
$lessonPath = "/data/material/$field/$subject/$course/$section/$lesson/";


if(!PathArray::isNameValid($section)||!PathArray::isNameValid($lesson))
{
    die("Section or lesson contains invalid characters");
}

if (isset($_REQUEST['content']) && !empty($_REQUEST['content']))
{
	$questionContent = htmlentities(trim(HelperFunctions::removeCurlyQuotes($_REQUEST['content'])));
}

if(isset($_REQUEST['answerChoices']) && !empty($_REQUEST['answerChoices']))
{
    $answerChoices = $_REQUEST['answerChoices'];
}
else
{
    die("No answer choices included");
}

if(isset($_REQUEST['correctAnswer']) && !empty($_REQUEST['correctAnswer']))
{
    $correctAnswer = $_REQUEST['correctAnswer'];
}

if(isset($_REQUEST['questionId']) && !empty($_REQUEST['questionId']))
{
    $questionId = $_REQUEST['questionId'];
}

if(isset($_REQUEST['questionOrder']) && !empty($_REQUEST['questionOrder']))
{
    $questionOrder = $_REQUEST['questionOrder'];
}
else
{
    $questionOrder = null;
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

if (isset($_REQUEST['name']) && !empty($_REQUEST['name']))
{
	$name = trim($_REQUEST['name']);
}

# Build payload XML

$payload = json_encode(array("name"=>$name,"description"=>urldecode($lesson),"content"=>$questionContent,"ilos"=>$ilos,"active"=>"true","username"=>$userSession->getUsername(),"citations"=>$citations, "answerChoices"=>$answerChoices, "correctAnswer"=>$correctAnswer, "questionOrder"=>$questionOrder,"lessonPath"=>$lessonPath));

# Instantiate api class
$api = new Api();
$api->setDataType();

$uri = "/data/material/questionBlueprint/$questionId/";

$result = $api->post($uri, $payload);

print_r($result);