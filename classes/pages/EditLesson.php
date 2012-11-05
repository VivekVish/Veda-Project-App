<?php

require_once('EditContent.php');

class EditLesson extends EditContent
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
        
        $this->appendScriptFiles(array("contentProvider/lesson/LessonProvider"));
    }
    
    public function display()
    {
        if($this->autosaveTime[0])
        {
            $GLOBALS['smarty']->assign("lastSavedAt",$this->autosaveTime);
            $GLOBALS['smarty']->assign("autosaveLink",$this->autosaveLink);
        }
        $GLOBALS['smarty']->assign("type","lesson");
        $GLOBALS['smarty']->assign("historyLink",$this->historyLink);
        $GLOBALS['smarty']->assign("discussionLink",$this->discussionLink);
        parent::display();
    }
    
    public function getData($uri)
    {
        parent::getData($uri);
        
        $this->autosaveTime=json_decode($GLOBALS['api']->get("{$uri}autosave/{$GLOBALS['userSession']->getUsername()}/exists/"));
        $this->autosaveLink = PathArray::pathToLink($this->path)."&type=lessonAutosave";
        $this->historyLink = PathArray::pathToLink($this->path)."&type=lessonHistory";
        $this->discussionLink = PathArray::pathToLink($this->path)."&type=lessonDiscussion";
    }
}