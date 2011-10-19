<?php

class PathArray
{
	private static $indexArray = array("data","materials","field","subject","course","section","lesson","type");
	
	public static function pathToArray($path)
	{
		$uriArr= explode("/",trim($path,"/"));
		$returnArray = array();
		
		foreach($uriArr as $indexVal => $value)
		{
			if($indexVal>1)
			{
				$returnArray[self::$indexArray[$indexVal]] = $value;
			}
		}
		
		return $returnArray;
	}
	
	public static function pathToLink($path)
	{
		$pathArray = self::pathToArray($path);
		
		$returnString = "index.php?";
		
		foreach($pathArray as $key => $value)
		{
            if($key=="type")
            {
                if($value=="lesson")
                {
                    $returnString.="$key=lesson";
                }
                else if($value=="discussion")
                {
                    $returnString.="$key=lessonDiscussion";
                }
            }
            else
            {
                $returnString.="$key=$value&";
            }
		}
		
		$returnString = rtrim($returnString,"&");
		
		return $returnString;
	}
    
    public static function getPathFromRequest(&$field,&$subject,&$course,&$section,&$lesson)
    {
        if (isset($_REQUEST['field']) && !empty($_REQUEST['field']))
        {
            $field = urlencode(trim($_REQUEST['field']));
        }
        if (isset($_REQUEST['subject']) && !empty($_REQUEST['subject']))
        {
            $subject = urlencode(trim($_REQUEST['subject']));
        }
        if (isset($_REQUEST['course']) && !empty($_REQUEST['course']))
        {
            $course = urlencode(trim($_REQUEST['course']));
        }
        if (isset($_REQUEST['section']) && !empty($_REQUEST['section']))
        {
            $section = urlencode(trim($_REQUEST['section']));
        }
        if (isset($_REQUEST['lesson']) && !empty($_REQUEST['lesson']))
        {
            $lesson = urlencode(trim($_REQUEST['lesson']));
        }
    }
    
    public static function isNameValid($name)
    {
        return preg_match('/\//',$name)==0;
    }
    
    public static function isCharNum($string)
    {
        return preg_match('/^[a-zA-Z0-9_ ]+/',$name)==0;
    }
}
	
?>