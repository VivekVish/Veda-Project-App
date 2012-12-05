<?php

require_once("MVPFrame.php");

class MVPQuestion extends MVPFrame
{
    protected $ILOs = array("graph","equation","chemicalEquation","staticimage");
    protected $mode = null;
    protected $lastCorrectAnswer = null;
    protected $lastQuestion = null;
    protected $location = null;
    protected $questions = array();
    protected $lastAnswer = array();
    protected $pathArray = array();
    
    protected $percentCorrect = null;
    protected $thresholdCorrectMet = null;
    protected $answerCorrect = array();
    
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
        if($this->mode=="question")
        {
            $GLOBALS['smarty']->assign("lastQuestion",$this->lastQuestion);
            $GLOBALS['smarty']->assign("lastCorrectAnswer",$this->lastCorrectAnswer);
            $GLOBALS['smarty']->assign("questions", $this->questions);
            $GLOBALS['smarty']->assign("lastAnswer", $this->lastAnswer);
            $GLOBALS['smarty']->assign("field", $this->pathArray[2]);
            $GLOBALS['smarty']->assign("subject", $this->pathArray[3]);
            $GLOBALS['smarty']->assign("course", $this->pathArray[4]);
            $GLOBALS['smarty']->assign("section", $this->pathArray[5]);
            $GLOBALS['smarty']->assign("lesson", $this->pathArray[6]);
        }
        else if($this->mode=="complete")
        {
            $GLOBALS['smarty']->assign("percentCorrect",$this->percentCorrect);
            $GLOBALS['smarty']->assign("thresholdCorrectMet",$this->thresholdCorrectMet);
            $GLOBALS['smarty']->assign("location",$this->location);
            $GLOBALS['smarty']->assign("answerCorrect",$this->answerCorrect);
            $GLOBALS['smarty']->assign("lessonReviewLink",PathArray::pathToLink($this->location));
        }
        parent::display();
    }
    
    public function getData($uri)
    {
        parent::getData($uri);
        
        $this->pathArray = explode("/",trim($uri,"/"));
        
        if(count($this->pageContent)==0)
        {
            $this->setMode("noQuestions");
        }
        else
        {
            $quizIncomplete = false;
            $questionId = null;
            
            foreach($this->pageContent as $key=>$submittedAnswer)
            {
                if($submittedAnswer->answered===false)
                {
                    $quizIncomplete = true;
                    $questionId = $submittedAnswer->id;
                    break;
                }
                else
                {
                    array_push($this->answerCorrect,$submittedAnswer->submittedAnswer==$submittedAnswer->correctAnswer);
                    $this->lastAnswer = $submittedAnswer;
                }
            }
            
            if($quizIncomplete)
            {
                if(count($this->lastAnswer)>0)
                {
                    $response=$GLOBALS['api']->get("/data/material/questionBlueprint/{$this->lastAnswer->id}/");
                    $responseArray = json_decode($response);
                    $this->lastCorrectAnswer = html_entity_decode($responseArray->answerChoices[$this->lastAnswer->correctAnswer-1]);
                    $this->lastQuestion = html_entity_decode($responseArray->content);
                }
                $response=$GLOBALS['api']->get("/data/material/questionBlueprint/$questionId/");
                $responseArray = json_decode($response);

                $this->questions[0]['content'] = html_entity_decode($responseArray->content);
                $this->questions[0]['answerfieldtype'] = "multchoice";
                $this->questions[0]['answers'] = $responseArray->answerChoices;
                $this->questions[0]['id'] = $questionId;
                
                $this->setMode("question");
            }
            else
            {
                $this->location="/data/material/{$this->pathArray[2]}/{$this->pathArray[3]}/{$this->pathArray[4]}/{$this->pathArray[5]}/{$this->pathArray[6]}/";
                $numCorrect = 0;

                foreach($this->answerCorrect as $isCorrect)
                {
                    if($isCorrect)
                    {
                        $numCorrect++;
                    }
                }

                $this->percentCorrect = round(100*$numCorrect/count($this->answerCorrect));
                $this->thresholdCorrectMet = $percentCorrect>=70;
                
                $this->setMode("complete");
            }
        }
    }
    
    private function setMode($mode)
    {
        $this->mode=$mode;
        if($mode=="question")
        {
            $bodyTemplates = array("quiz","footer");
            $cssFiles = array("question");
            $scriptFiles = array("content/ILOContents","content/Content","flot/jquery.flot.min","flot/jquery.flot.dashes","test/test","content/citations");
            $fullnameScriptFiles = array("MathJax/MathJax.js?config=default");

            foreach($this->ILOs as $ilo)
            {
                array_push($scriptFiles,"ILO/".$ilo."ILO");
                array_push($cssFiles,"ILO/".$ilo);
            }
        }
        else if($mode=="complete")
        {
            $bodyTemplates = array("testComplete","footer");
            $cssFiles = array("testComplete");
            $scriptFiles = array("test/testComplete");
            $fullnameScriptFiles = array();
        }
        else if($mode=="noQuestions")
        {
            $bodyTemplates = array("noQuestionsAdded","footer");
            $cssFiles = array();
            $scriptFiles = array();
            $fullnameScriptFiles = array();
        }
        
        $this->appendTemplates($bodyTemplates);
        $this->appendCssFiles($cssFiles);
        $this->appendScriptFiles($scriptFiles);
        $this->appendFullnameScriptFiles($fullnameScriptFiles);
    }
}