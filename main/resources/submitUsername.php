<?php
	
# Includes
require_once("config/main.inc.php");

if(isset($_SESSION['authinfo']))
{
	try
	{
		$provider = strtolower($_SESSION['authinfo']['profile']['providerName']);
		$identity = urlencode(preg_replace('/\//','FORWARDSLASHCODE',$_SESSION['authinfo']['profile']['identifier']));
	}
	catch(Exception $e)
	{
		die("This session cookie is not set properly!");
	}
}
else
{
	die("Session cookie is not set!");
}

if (isset($_REQUEST['username']) && !empty($_REQUEST['username']))
{
	$username = trim($_REQUEST['username']);
}
else
{
	die("Failed at application.");
}

$payload = json_encode(array("provider"=>$provider,"identity"=>$identity,"status"=>"content_provider"));

# Instantiate api class
$api = new Api();

# Make request
$result = $api->post("/user/username/$username/",$payload);

if($result=='Success.')
{
	$providerName = strtolower($_SESSION['authinfo']['profile']['providerName']);
	$identity = urlencode(preg_replace('/\//','FORWARDSLASHCODE',$_SESSION['authinfo']['profile']['identifier']));
	$api = new Api();
	$response = $api->get("/user/{$providerName}/{$identity}/");
	$responseXML = new SimpleXMLElement("<parent>".$response."</parent>");
	$status = $responseXML->xpath('/parent/user/status');
	$id = $responseXML->xpath('/parent/user/id');
	$_SESSION['status'] = (string)$status[0];
	$_SESSION['id'] = (string)$id[0];
	$_SESSION['requestusername']=false;
}

echo $result;

?>