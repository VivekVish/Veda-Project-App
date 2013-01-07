<?php

require_once('Content.php');

class EditContent extends Content
{
    public function __construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles)
    {
        parent::__construct($bodyTemplates, $cssFiles, $scriptFiles, $ieScriptFiles, $fullnameScriptFiles);
        
        parent::appendTemplates(array("contentprovider"));
        parent::appendCssFiles(array("contentprovider","equationEditor"));
        parent::appendScriptFiles(array("jquery/jquery.form","contentProvider/content/BaseProvider","contentProvider/content/rangeTraverse","general/equationEditor","contentProvider/content/BaseHandler","contentProvider/content/ilo",
                            "contentProvider/ILO/formValidator","contentProvider/content/ContentProvider","contentProvider/content/ContentHandler","general/lightbox","contentProvider/content/ContentState","contentProvider/content/LessonDiscussionProvider"));
        
        foreach($this->ILOs as $ilo)
        {
           parent::appendScriptFiles(array("contentProvider/ILO/".$ilo));
        }
        
    }
}