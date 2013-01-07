<?php

require_once('MVPContent.php');

class MVPEditContent extends MVPContent
{
    public function __construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles)
    {
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
        
        parent::appendTemplates(array("contentprovider"));
        parent::appendCssFiles(array("MVPContentprovider","equationEditor"));
        parent::appendScriptFiles(array("jquery/jquery.form","contentProvider/content/BaseProvider","contentProvider/content/rangeTraverse","general/equationEditor","contentProvider/content/BaseHandler","contentProvider/content/ilo",
                            "contentProvider/ILO/formValidator","contentProvider/content/ContentProvider","contentProvider/content/ContentHandler","general/lightbox","contentProvider/content/ContentState","contentProvider/content/LessonDiscussionProvider","MVP/MVPToolbar"));
        
        foreach($this->ILOs as $ilo)
        {
           parent::appendScriptFiles(array("contentProvider/ILO/".$ilo));
        }
        
        $this->displaySubmit = true;
    }
}