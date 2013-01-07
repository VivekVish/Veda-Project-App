<?php

# Includes
require_once("../../config/main.inc.php");

# Retrieve and sanitize data
if (isset($_REQUEST['field']) && !empty($_REQUEST['field']))
{
	$field = trim($_REQUEST['field']);
}
if (isset($_REQUEST['subject']) && !empty($_REQUEST['subject']))
{
	$subject = trim($_REQUEST['subject']);
}
if (isset($_REQUEST['course']) && !empty($_REQUEST['course']))
{
	$course = trim($_REQUEST['course']);
}
if (isset($_REQUEST['section']) && !empty($_REQUEST['section']))
{
	$section = trim($_REQUEST['section']);
}
if (isset($_REQUEST['lesson']) && !empty($_REQUEST['lesson']))
{
	$lesson = trim($_REQUEST['lesson']);
}
if (isset($_REQUEST['ilo_content']) && count($_REQUEST['ilo_content']))
{
	$iloContent = json_encode($_REQUEST['ilo_content']);
}
# Instantiate api class and make request
$api = new Api();
$api->setDataType("json");
$response = $api->put("/data/material/$field/$subject/$course/$section/$lesson/ilo/", $iloContent);
print_r($response);

?>
