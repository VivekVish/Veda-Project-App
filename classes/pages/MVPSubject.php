<?php

require_once("MVPMaterialList.php");

class MVPSubject extends MVPMaterialList
{
    public function __construct()
    {
        parent::__construct();
        
        $this->appendScriptFiles(array("MVP/MVPHome"));
        $this->appendCssFiles(array("MVPModules"));
        
        $this->materialHeader = "Modules";
    }
}

?>
