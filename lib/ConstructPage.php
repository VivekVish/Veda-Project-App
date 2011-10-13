<?php

###########################################################################
### The class ConstructPage contains helper functions used to process  	###
### XML and get various data from the API.								###
###########################################################################

class ConstructPage
{
	private $api = NULL;
	
	# The constructor merely ensures that main.inc.php is included and that 
	# $this->api is initialized.
	public function __construct() 
	{
		# Includes
		require_once("config/main.inc.php");
		
		# Instantiate api class
		$this->api = new Api();
	}
	
	function processNavXML($navXML)
	{
		
	}
	
	function getCourseNav($field=NULL,$subject=NULL,$course=NULL,$section=NULL)
	{
		if (isset($field) && !empty($field))
		{
			$fieldName = trim($field);
			
			if (isset($subject) && !empty($subject))
			{
				$subjectName = trim($subject);
				
				if (isset($course) && !empty($course))
				{
					$courseName = trim($course);
					
					if (isset($section) && !empty($section))
					{
						$sectionName = trim($section);

						$result = $this->api->get("/data/$field/$subject/$course/$section/");
					}
					else
					{
						$result = $this->api->get("/data/$field/$subject/$course/");
					}
				}
				else
				{
					$result = $this->api->get("/data/$field/$subject/");
				}
			}
			else
			{
				$result = $this->api->get("/data/$field/");	
			}
		}
		else
		{
			$result = $this->api->get("/data/");
		}
		
		return $result;
	}
	
	function getNavStructure($navPosition)
	{
		var_dump($navPosition);
		$navXML = new SimpleXMLElement($navPosition);
		$navLevel = $navXML->getName();
		$navBarContents = Array();
		
		switch($navLevel)
		{
			case "fields":
				$navBarTitle="Fields";
				$navCurrPosition="/data/";
				break;
			default:
				$navBarTitle=(string)$navXML->name;
				$navCurrPosition=(string)$navXML->path;
				break;
		}
		
		$childTagName = array_pop($navXML->xpath('/*/*[last()]/*'))->getName();
	
		if($navLevel=="course")
		{
			foreach(array_pop($navXML->xpath('/*/*[last()]'))->$childTagName as $childTag)
			{
				array_push($navBarContents,array("link"=>(string)$childTag->path,"name"=>(string)$childTag->name,"img"=>str_replace(" ","_",(string)$childTag->name)));
			}
		}
		else
		{
			foreach(array_pop($navXML->xpath('/*/*[last()]'))->$childTagName as $childTag)
			{
				array_push($navBarContents,array("link"=>(string)$childTag->path,"name"=>(string)$childTag->name,"img"=>str_replace(" ","_",(string)$childTag->name)));
			}
		}
		
		return array("navBarContents"=>$navBarContents,"navLevel"=>$navLevel,"navBarTitle"=>$navBarTitle,"navCurrPosition"=>$navCurrPosition);
	}
}

?>