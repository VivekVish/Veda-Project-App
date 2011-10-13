<?php
    require_once("lib/PathArray.php");
    
    $title = "The Veda Project";
    $cssfiles = array("reset","main","default","flexcrollstyles-default","jquery-ui","message","contentprovider","revisionHistory");
    $iejavascriptfiles = array("http://html5shiv.googlecode.com/svn/trunk/html5.js","http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js");
    $javascriptfiles = array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/Message","flexcroll/flexcroll","general/navbar","general/lightbox","contentProvider/content/history");
    
    $bodytemplates = array("usernav","navbar","footer","history");
    
    $discussionHistory = json_decode($response);
    
    if($discussionHistoryType=="lesson")
    {
        $contentLocation = "/data/material/{$_REQUEST['field']}/{$_REQUEST['subject']}/{$_REQUEST['course']}/{$_REQUEST['section']}/{$_REQUEST['lesson']}/";
        $location = "{$contentLocation}content/discussion";
        $header = preg_replace('/_/',' ', $_REQUEST['lesson']);
    }
    else if($discussionHistoryType=="quiz")
    {
        $contentLocation = "/data/material/{$_REQUEST['field']}/{$_REQUEST['subject']}/{$_REQUEST['course']}/{$_REQUEST['section']}/{$_REQUEST['lesson']}/";
        $location = "{$contentLocation}quiz/discussion";
        $header = preg_replace('/_/',' ', $_REQUEST['lesson'])&" Quiz";
    }
    else if($discussionHistoryType=="exam")
    {
        $contentLocation = "/data/material/{$_REQUEST['field']}/{$_REQUEST['subject']}/{$_REQUEST['course']}/{$_REQUEST['section']}/";
        $location = "{$contentLocation}exam/discussion";
        $header = preg_replace('/_/',' ', $_REQUEST['course']);
    }
    
    foreach($discussionHistory as $key=>$row)
    {
        $discussionHistory[$key]->revision_date = date("G:i, d F Y",strtotime($row->revision_date));
        $discussionHistory[$key]->name = preg_replace('/_/',' ',$row->name);
        if($discussionHistoryType=="lesson")
        {
           $discussionHistory[$key]->link = PathArray::pathToLink($contentLocation)."&type=lessonDiscussionHistory&revisionId={$row->revision_id}";
        }
        else if($discussionHistoryType=="quiz")
        {
           $discussionHistory[$key]->link = PathArray::pathToLink($contentLocation)."&type=quizDiscussionHistory&revisionId={$row->revision_id}";
        }
        else if($discussionHistoryType=="exam")
        {
           $discussionHistory[$key]->link = PathArray::pathToLink($contentLocation)."&type=discussionHistory&revisionId={$row->revision_id}";
        }
    }

    $smarty->assign("history",$discussionHistory);
    $smarty->assign("location",$location);
    $smarty->assign("header",  $header." Discussion");
?>