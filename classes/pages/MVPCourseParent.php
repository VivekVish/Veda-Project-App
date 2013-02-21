<?php

require_once('MVPFrame.php');

class MVPCourseParent extends MVPFrame
{
    protected $classPath = null;
    protected $courseName = null;
    protected $sections = array();
    
    public function __construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles)
    {
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
        
        $this->appendCssFiles(array("MVPListEditor","MVPCourse"));
    }
    
    public function display()
    {
        $GLOBALS['smarty']->assign("classPath",$this->classPath);
	$GLOBALS['smarty']->assign("sectionArray",$this->sections);
	$GLOBALS['smarty']->assign("course", preg_replace('/_/'," ",$this->courseName));
        parent::display();
    }
    
    public function getData($uri)
    {
        parent::getData($uri);

        $sectionArray = $this->pageContent->children;

	foreach($sectionArray as $sectionKey => $sectionElement)
	{
            $sectionInfo = array();
            $sectionInfo["name"] = (string)$sectionElement->name;
            $sectionInfo["path"] = (string)$sectionElement->path;
            $sectionInfo["order"] = (string)$sectionElement->order;

            $responseArray = json_decode($GLOBALS['api']->get($sectionInfo['path']));

            $lessonJSONArray = $responseArray->children;

            $lessonArray = array();

            if(isset($responseArray->children))
            {
                foreach($lessonJSONArray as $lessonKey => $lessonElement)
                {
                    array_push($lessonArray,array("name"=>(string)$lessonElement->name,
                                                  "link"=>PathArray::pathToLink((string)$lessonElement->path)."&type=lesson",
                                                  "quizLink"=>PathArray::pathToLink((string)$lessonElement->path)."&type=quiz",
                                                  "genericLink"=>PathArray::pathToLink((string)$lessonElement->path),
                                                  "path"=>(string)$lessonElement->path,
                                                  "order"=>(string)$lessonElement->order,
                                                  "additions"=>$lessonElement->lessonAdditions));

                }
            }
            
            $sectionInfo["lessons"]=$lessonArray;
            
            array_push($this->sections,$sectionInfo);		
	}
        
        $this->classPath = $uri;
        
        $pathArray = PathArray::pathToArray($uri);
        $this->courseName = $pathArray["course"];
    }
}

?>
