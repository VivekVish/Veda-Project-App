<?php

require_once("MVPFrame.php");

class MVPLessonHistory extends MVPFrame
{
    protected $location = null;
    protected $name = null;
    
    public function __construct()
    {
        $bodyTemplates = array("history");
        $cssFiles = array("MVPContent","MVPContentprovider","revisionHistory");
        $scriptFiles = array("contentProvider/content/history");
        $ieScriptFiles = array();
        $fullnameScriptFiles = array();
        
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
    }
    
    public function display()
    {
        $GLOBALS['smarty']->assign("history",$this->pageContent);
        $GLOBALS['smarty']->assign("location",$this->location);
        $GLOBALS['smarty']->assign("header",  preg_replace('/_/',' ', $_REQUEST['lesson']));
        parent::display();
    }
    
    public function getData($uri)
    {
        parent::getData($uri);
        $uriArr = explode("/",trim($uri,"/"));
        array_pop($uriArr);
        array_pop($uriArr);
        $this->location = "/".implode("/",$uriArr)."/";
        $this->name = preg_replace('/_/',' ', $uriArr[6]);

        foreach($this->pageContent as $key=>$row)
        {
            $this->pageContent[$key]->revision_date = date("G:i, d F Y",strtotime($row->revision_date));
            $this->pageContent[$key]->name = preg_replace('/_/',' ',$row->name);
            $this->pageContent[$key]->link = PathArray::pathToLink($this->location)."&type=lessonRevision&id={$row->revision_id}";
        }
    }
}

?>
