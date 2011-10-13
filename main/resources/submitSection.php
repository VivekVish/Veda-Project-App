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

if(!PathArray::isNameValid($section))
{
    die("Section or lesson contains invalid characters");
}

if (isset($_REQUEST['name']) && !empty($_REQUEST['name']))
{
	$name = trim($_REQUEST['name']);
    
    if(!PathArray::isNameValid($name))
    {
        die("Rename section is invalid");
    }
}

# Instantiate api class
$api = new Api();

# Make request
if(isset($name))
{
	$payload = json_encode(array("name"=>$name,"username"=>$userSession->getUsername()));
}
else
{
	$payload = json_encode(array("description"=>preg_replace('/_/'," ",$section),"active"=>"true","username"=>$userSession->getUsername()));
}
$result = $api->post("/data/material/$field/$subject/$course/$section/",$payload);

# Interpert response
if ($result <= 200)
{
	echo $result;
}
else
{
	echo "failure";
}

?>
