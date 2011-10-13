<?php

# Includes
require_once("config/main.inc.php");

# Get credentials
$loginName = $_REQUEST['loginName'];
$loginPass = $_REQUEST['loginPassword'];

# Attempt login
if (!$userSession->Login($loginName, $loginPass))
{
	# Failure 
	$messages[] = array("messageType" => 'showErrorToast', "message" => "Invalid Username or Password");
	$userSession->Messages = json_encode($messages);
}	
header("Location: /index.php");
exit();

?>
