<?php

require_once("MVPSubject.php");

class MVPSubjectLoggedIn extends MVPSubject
{
    public function __construct()
    {
        parent::__construct();
        
        $this->appendScriptFiles(array("MVP/MVPModules"));
    }
}

?>
