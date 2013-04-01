<?php

require_once("Frame.php");

class QuestionEditor extends Frame
{
    protected $questionContent = null;
    protected $questionName = null;
    protected $correctAnswer = null;
    protected $answers = array();
    protected $questionId = null;
    protected $questionTypes = array(array("optgroup"=>"Math Question","group"=>array(
                                                    array("value"=>"multChoiceNumber","text"=>"Multiple Choice with Number Answers"),
                                                    array("value"=>"multChoiceNonNumber","text"=>"Multiple Choice with Non-Number Answers"),
                                                    array("value"=>"fillInTheBlankNumber","text"=>"Fill-in-the-blank with Number Answers"),
                                                    array("value"=>"fillInTheBlankEquation","text"=>"Fill-in-the-blank with Equation Answers"))),
                                            array("optgroup"=>"Word Question","group"=>array(
                                                    array("value"=>"wordMultChoice","text"=>"Multiple Choice"),
                                                    array("value"=>"wordFillInTheBlank","text"=>"Fill-in-the-blank"))),
                                            array("optgroup"=>"Chemistry Equation","group"=>array(
                                                    array("value"=>"wordMultChoice","text"=>"Multiple Choice"),
                                                    array("value"=>"wordFillInTheBlank","text"=>"Fill-in-the-blank"))));
    protected $ILOs = array("graph","equation","chemicalEquation","staticimage","youtube");
    protected $section = null;
    protected $lesson = null;
    
    public function __construct()
    {
        $bodyTemplates = array("contentprovider","questionEditor","footer");
        $cssFiles = array("contentprovider","question","contentprovider","equationEditor","questionEditor");
        $scriptFiles = array("content/ILOContents","flot/jquery.flot.min","flot/jquery.flot.dashes","contentProvider/content/BaseProvider","contentProvider/content/rangeTraverse",
                                    "general/equationEditor","contentProvider/content/BaseHandler","contentProvider/content/ilo","contentProvider/ILO/formValidator","content/Content","contentProvider/content/ContentProvider","contentProvider/test/questionBlueprints","contentProvider/test/QuestionProvider","general/lightbox",
                                    "contentProvider/test/QuestionHandler","test/test","contentProvider/test/QuestionContent","contentProvider/test/CorrectAnswer","contentProvider/test/QuestionEditor",
                                    "contentProvider/test/AnswerField","contentProvider/test/QuestionParameters","contentProvider/content/ContentState", "content/citations");
        $ieScriptFiles = array();
        $fullnameScriptFiles = array("MathJax/MathJax.js?config=default");
        
        foreach($this->ILOs as $ilo)
	{
            array_push($scriptFiles,"ILO/".$ilo."ILO");
            array_push($scriptFiles,"contentProvider/ILO/".$ilo);
            array_push($cssFiles,"ILO/".$ilo);
	}
        
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
        
        
    }
    
    public function display()
    {
        $GLOBALS['smarty']->assign("questionContent",$this->questionContent);
        $GLOBALS['smarty']->assign("location",$this->navPosition.$this->section."/".$this->lesson."/quiz/".$this->questionId);
        $GLOBALS['smarty']->assign("name","Question Editor");
        $GLOBALS['smarty']->assign("questionName",$this->questionName);
        $GLOBALS['smarty']->assign("correctAnswer",$this->correctAnswer);
        $GLOBALS['smarty']->assign("answerfieldtype","multchoice");
        $GLOBALS['smarty']->assign("answers", $this->answers);
	$GLOBALS['smarty']->assign("questionId", $this->questionId);
	$GLOBALS['smarty']->assign("questionTypes", $this->questionTypes);
        
        parent::display();
    }
    
    public function getData($uri)
    {
        $uriArr = explode("/",trim($uri,"/"));
        $this->questionId = $uriArr[3];
        
        $this->section = substr($GLOBALS['url'],strpos($GLOBALS['url'],"section=")+8);
        $this->section = substr($this->section,0,strpos($this->section,"&"));
        $this->lesson = substr($GLOBALS['url'],strpos($GLOBALS['url'],"lesson=")+7);
        $this->lesson = substr($this->lesson,0,strpos($this->lesson,"&"));
        
        if($this->questionId=="new")
        {
            $this->questionContent = "<p></p>";
            $this->questionName = "";
            $this->correctAnswer = 1;
            $this->answers = array();
        }
        else
        {
            parent::getData($uri);
            $this->questionContent = html_entity_decode($this->pageContent->content);
            $this->questionName = $this->pageContent->name;
            $this->correctAnswer = $this->pageContent->correctAnswer;
            $this->answers = $this->pageContent->answerChoices;
        }   
    }
}

?>
