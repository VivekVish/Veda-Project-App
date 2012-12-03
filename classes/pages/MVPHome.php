<?php

require_once("MVPMaterialList.php");

class MVPHome extends MVPMaterialList
{
    public function __construct()
    {
        parent::__construct();
        
        $this->appendScriptFiles(array("MVP/MVPHome"));
        
        $this->materialHeader = "Courses";
    }
}

?>
