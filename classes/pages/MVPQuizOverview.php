<?php

require_once("MVPTestOverview.php");

class MVPQuizOverview extends MVPTestOverview
{
    protected $questionLink = null;
    protected $id = null;
    protected $quizPath = null;


    public function __construct()
    {
        $bodyTemplates = array();
        $cssFiles = array();
        $scriptFiles = array();
        $ieScriptFiles = array();
        $fullnameScriptFiles = array();
        
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
    }
    
    public function display()
    {
        $GLOBALS['smarty']->assign("questionLink",$this->questionLink);
        $GLOBALS['smarty']->assign("questions",$this->pageContent);
        $GLOBALS['smarty']->assign("quizPath",$this->quizPath);
        parent::display();
    }
    
    public function getData($uri)
    {
        parent::getData($uri);
        
        $uriArr = explode("/",trim($uri,"/"));
        $uriArr[7] = "quizOutline";
        
        $this->quizPath = "/".implode("/",$uriArr)."/";
        $this->questionLink = preg_replace('/type=quiz/',"type=questionBlueprint",$GLOBALS['url']);
    }
}

?>
