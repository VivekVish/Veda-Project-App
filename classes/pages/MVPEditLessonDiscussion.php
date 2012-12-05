<?php

require_once('MVPEditContent.php');

class MVPEditLessonDiscussion extends MVPEditContent
{
    protected $historyLink = null;
    protected $discussionLink = null;
    protected $autosaveTime = null;
    protected $autosaveLink = null;
    
    public function __construct()
    {
        $bodyTemplates = array();
        $cssFiles = array();
        $scriptFiles = array();
        $ieScriptFiles = array();
        $fullnameScriptFiles = array();
        
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
        
        $this->appendScriptFiles(array("contentProvider/discussion/DiscussionProvider"));
    }
    
    public function display()
    {
        if($this->autosaveTime[0])
        {
            $GLOBALS['smarty']->assign("lastSavedAt",$this->autosaveTime);
            $GLOBALS['smarty']->assign("autosaveLink",$this->autosaveLink);
        }
        $GLOBALS['smarty']->assign("type","lessonDiscussion");
        $GLOBALS['smarty']->assign("historyLink",$this->historyLink);
        $GLOBALS['smarty']->assign("lessonLink",$this->lessonLink);
        parent::display();
    }
    
    public function getData($uri)
    {
        parent::getData($uri);
        
        $uriArr = explode("/",trim($uri,"/"));
        array_pop($uriArr);
        array_pop($uriArr);
        $pathToLink = "/".implode("/",$uriArr)."/";
        
        $this->autosaveTime=json_decode($GLOBALS['api']->get("{$uri}autosave/{$GLOBALS['userSession']->getUsername()}/exists/"));
        $this->autosaveLink = PathArray::pathToLink($this->path)."&type=lessonDiscussionAutosave";
        $this->historyLink = PathArray::pathToLink($pathToLink)."&type=lessonDiscussionHistory";
        $this->lessonLink = PathArray::pathToLink($pathToLink)."&type=lesson";
    }
}