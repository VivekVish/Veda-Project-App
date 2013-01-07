<?php

# Includes
require_once("config/main.inc.php");

$api = new Api();

if (isset($_REQUEST['iloID']) && !empty($_REQUEST['iloID']))
{
	$iloID = $_REQUEST['iloID'];
}

$result = $api->get("/data/ilo/$iloID");
		

# Interpert response
if ($result <= 200)
{
	if($result=="")
	{
		echo "no";
	}
	else
	{
		echo "yes";
	}
}
else
{
	echo "failure";
}


?>
