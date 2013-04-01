<?php

require_once('Frame.php');

class Content extends Frame
{
    protected $path = null;
    protected $name = null;
    protected $ILOs = array("graph","equation","chemicalEquation","staticimage","youtube");
    
    public function __construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles)
    {
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
        
        $this->appendTemplates(array("lesson","footer"));
        $this->appendScriptFiles(array("general/addAllTrigFunctions", "content/ILOContents","flot/jquery.flot.min","flot/jquery.flot.dashes",
                             "content/Content","content/citations"));
        $this->appendFullnameScriptFiles(array("MathJax/MathJax.js?config=default"));
        
        foreach($this->ILOs as $ilo)
        {
            $this->appendScriptFiles(array("ILO/".$ilo."ILO"));
            $this->appendCssFiles(array("ILO/".$ilo));
        }
    }
    
    public function display()
    {
        $GLOBALS['smarty']->assign("content", html_entity_decode($this->pageContent->content));
        $GLOBALS['smarty']->assign("location", $this->path);
        $GLOBALS['smarty']->assign("name", $this->name);
        
        parent::display();
    }
    
    public function getData($uri)
    {
        $this->path = $uri;
        
        parent::getData($uri);
        
        $this->name = preg_replace('/_/',' ',$this->pageContent->name);
    }
}

?>