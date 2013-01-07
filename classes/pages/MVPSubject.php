<?php

require_once("MVPMaterialList.php");

class MVPSubject extends MVPMaterialList
{
    public function __construct()
    {
        parent::__construct();
        
        $this->appendScriptFiles(array("MVP/MVPHome"));
        
        $this->materialHeader = "Modules";
    }
}

?>
