<?php

# Includes
require_once("config/main.inc.php");

$api = new Api();

if (isset($_REQUEST['field']) && !empty($_REQUEST['field']))
{
	$field = trim($_REQUEST['field']);
	
	if (isset($_REQUEST['subject']) && !empty($_REQUEST['subject']))
	{
		$subject = trim($_REQUEST['subject']);
		
		if (isset($_REQUEST['course']) && !empty($_REQUEST['course']))
		{
			$course = trim($_REQUEST['course']);
			
			if (isset($_REQUEST['section']) && !empty($_REQUEST['section']))
			{
				$section = urlencode(trim($_REQUEST['section']));

				$result = $api->get("/data/material/$field/$subject/$course/$section/");
			}
			else
			{
				$result = $api->get("/data/material/$field/$subject/$course/");
			}
		}
		else
		{
			$result = $api->get("/data/material/$field/$subject/");
		}
	}
	else
	{
		$result = $api->get("/data/material/$field/");	
	}
}
else
{
	$result = $api->get("/data/material/");
}
		

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
