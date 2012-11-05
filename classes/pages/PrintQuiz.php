<?php

require_once("AbstractFrame.php");

class PrintQuiz extends AbstractFrame
{
    protected $ilos = array("graph","equation","chemicalEquation","staticimage");
    protected $pageContent = null;
    protected $showAnswers = false;
    
    public function __construct()
    {   
        $bodyTemplates = array("printQuiz");
        $cssFiles = array("printQuiz");
        $scriptFiles = array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/main","content/Content","general/addAllTrigFunctions",
                         "content/ILOContents","flot/jquery.flot.min","flot/jquery.flot.dashes","content/citations");
        $ieScriptFiles = array();
        $fullnameScriptFiles = array("MathJax/MathJax.js?config=default");
        
        foreach($this->ilos as $ilo)
        {
            array_push($scriptFiles,"ILO/".$ilo."ILO");
            array_push($cssFiles,"ILO/".$ilo);
        }
        
        parent::__construct("The Veda Project: The Free Online Educational Platform", $bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
    }
    
    public function display()
    {
        $GLOBALS['smarty']->assign("title",$this->title);
        $GLOBALS['smarty']->assign("questions",$this->pageContent);
        $GLOBALS['smarty']->assign("showAnswers",$this->showAnswers);

        $GLOBALS['smarty']->assign("bodytemplates",$this->bodyTemplates);
        $GLOBALS['smarty']->assign("cssfiles", $this->cssFiles);
        $GLOBALS['smarty']->assign("iejavascriptfiles", $this->ieScriptFiles);
        $GLOBALS['smarty']->assign("javascriptfiles", $this->scriptFiles);
        $GLOBALS['smarty']->assign("fullnamejavascriptfiles", $this->fullnameScriptFiles);

        $GLOBALS['smarty']->display("main.tpl");
    }
    
    public function getData($uri)
    {
        $response=$GLOBALS['api']->get($uri);
        $this->pageContent = json_decode($response);
    }
    
    public function setNavPosition($navPosition)
    {
        
    }
}

?>
