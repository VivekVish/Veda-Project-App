<?php
$iejavascriptfiles = array("http://html5shiv.googlecode.com/svn/trunk/html5.js","http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js");
$cssfiles = array("printQuiz");
$ILOs = array("graph","equation","chemicalEquation","staticimage");
$javascriptfiles = array("jquery/jquery","jquery/jquery-ui","jquery/jquery.tools","general/main","content/Content","general/addAllTrigFunctions",
                         "content/ILOContents","flot/jquery.flot.min","flot/jquery.flot.dashes","content/citations");
$fullnamejavascriptfiles = array("MathJax/MathJax.js?config=default");

foreach($ILOs as $ilo)
{
    array_push($javascriptfiles,"ILO/".$ilo."ILO");
    array_push($cssfiles,"ILO/".$ilo);
}

$bodytemplates = array("printQuiz");

$smarty->assign("questions",$responseArray);
$smarty->assign("showAnswers",$showAnswers);