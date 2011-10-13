<?php
    require_once("lib/PathArray.php");
    
    $title = "The Veda Project";
    $cssfiles = array("reset","main","default","flexcrollstyles-default","jquery-ui","message","contentprovider","revisionHistory");
    $iejavascriptfiles = array("http://html5shiv.googlecode.com/svn/trunk/html5.js","http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js");
    $javascriptfiles = array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/Message","flexcroll/flexcroll","general/navbar","general/lightbox","contentProvider/content/history");
    
    $bodytemplates = array("usernav","navbar","footer","history");
    
    $lessonHistory = json_decode($response);
    $location = "/data/material/{$_REQUEST['field']}/{$_REQUEST['subject']}/{$_REQUEST['course']}/{$_REQUEST['section']}/{$_REQUEST['lesson']}/";
    
    foreach($lessonHistory as $key=>$row)
    {
        $lessonHistory[$key]->revision_date = date("G:i, d F Y",strtotime($row->revision_date));
        $lessonHistory[$key]->name = preg_replace('/_/',' ',$row->name);
        $lessonHistory[$key]->link = PathArray::pathToLink($location)."&type=lessonHistory&revisionId={$row->revision_id}";
    }

    $smarty->assign("history",$lessonHistory);
    $smarty->assign("location",$location);
    $smarty->assign("header",  preg_replace('/_/',' ', $_REQUEST['lesson']));
?>
