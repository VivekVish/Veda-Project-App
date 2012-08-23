<?php
    require_once("lib/PathArray.php");
    
    $title = "The Veda Project";
	$cssfiles = array("reset","main","default","flexcrollstyles-default","jquery-ui","message","testComplete");
	$iejavascriptfiles = array("http://html5shiv.googlecode.com/svn/trunk/html5.js","http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js");
	$javascriptfiles = array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/Message","flexcroll/flexcroll","general/main","general/navbar","general/lightbox","test/testComplete");
	
	$bodytemplates = array("usernav","navbar","testComplete","footer");
    
    $numCorrect = 0;
    
    foreach($answerCorrect as $isCorrect)
    {
        if($isCorrect)
        {
            $numCorrect++;
        }
    }
    
    $percentCorrect = round(100*$numCorrect/count($answerCorrect));
    $thresholdCorrectMet = $percentCorrect>=70;
    
    $smarty->assign("percentCorrect",$percentCorrect);
    $smarty->assign("thresholdCorrectMet",$thresholdCorrectMet);
    $smarty->assign("location",$location);
    $smarty->assign("answerCorrect",$answerCorrect);
    $smarty->assign("lessonReviewLink",PathArray::pathToLink($location));
    
    // HACK - FIGURE OUT A WAY TO REMOVE LATER
	$contentprovider = false;