<?php

require_once('MVPFrame.php');

class MVPContent extends MVPFrame
{
    protected $path = null;
    protected $name = null;
    protected $ILOs = array("graph","equation","chemicalEquation","staticimage");
    
    public function __construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles)
    {
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
        
        $this->appendCssFiles(array("MVPContent","MVPNavBar"));
        $this->appendTemplates(array("navbar","lesson"));
        $this->appendScriptFiles(array("general/navbar","general/addAllTrigFunctions", "content/ILOContents","flot/jquery.flot.min","flot/jquery.flot.dashes",
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