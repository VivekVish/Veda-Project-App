<?php

require_once('config/main.inc.php');

abstract class AbstractFrame
{
    protected $title = null;
    protected $bodyTemplates = array();
    protected $cssFiles = array();
    protected $scriptFiles = array();
    protected $ieScriptFiles = array();
    protected $fullnameScriptFiles = array();
    
    public function __construct($title, $bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles)
    {
        $this->title = $title;
        $this->bodyTemplates = $bodyTemplates;
        $this->cssFiles = $cssFiles;
        $this->scriptFiles = $scriptFiles;
        $this->ieScriptFiles = $ieScriptFiles;
        $this->fullnameScriptFiles = $fullnameScriptFiles;
    }
    
    abstract public function display();
    abstract public function getData($uri);
    
    protected function appendTemplates($newTemplates)
    {
        $this->bodyTemplates = array_merge($this->bodyTemplates,$newTemplates);
    }
    
    protected function appendCssFiles($newCssFiles)
    {
        $this->cssFiles = array_merge($this->cssFiles,$newCssFiles);
    }
    
    protected function appendScriptFiles($newScriptFiles)
    {
        $this->scriptFiles = array_merge($this->scriptFiles,$newScriptFiles);
    }
    
    protected function appendIeScriptFiles($newIeScriptFiles)
    {
        $this->ieScriptFiles = array_merge($this->ieScriptFiles,$newIeScriptFiles);
    }
    
    protected function appendFullnameScriptFiles($newFullnameScriptFiles)
    {
        $this->fullnameScriptFiles = array_merge($this->fullnameScriptFiles,$newFullnameScriptFiles);
    }
    
    protected function prependTemplates($newTemplates)
    {
        $this->bodyTemplates = array_merge($newTemplates,$this->bodyTemplates);
    }
    
    protected function prependCssFiles($newCssFiles)
    {
        $this->cssFiles = array_merge($newCssFiles,$this->cssFiles);
    }
    
    protected function prependScriptFiles($newScriptFiles)
    {
        $this->scriptFiles = array_merge($newScriptFiles,$this->scriptFiles);
    }
    
    protected function prependIeScriptFiles($newIeScriptFiles)
    {
        $this->ieScriptFiles = array_merge($newIeScriptFiles,$this->ieScriptFiles);
    }
    
    protected function prependFullnameScriptFiles($newFullnameScriptFiles)
    {
        $this->fullnameScriptFiles = array_merge($newFullnameScriptFiles,$this->fullnameScriptFiles);
    }
}