<?php

# Includes
require_once('config/main.inc.php');
require_once('lib/ConstructPage.php');

$loginURL = ($_SERVER["REQUEST_URI"]=="/" || $_SERVER["REQUEST_URI"]=="/index.php") ? "index.php?login=true" : $_SERVER["REQUEST_URI"]."&login=true";
$contentprovider = false;
$admin = false;
$loggedIn = false;
$navPosition = "";
$title = "";
$content = "";
$cssfiles = array();
$iejavascriptfiles = array();
$javascriptfiles = array();
$fullnamejavascriptfiles = array();
$bodytemplates = array();

# Has the user not supplied a username but used openid to log in?
if ($userSession->getNeedUserName())
{
	require_once('pages/newUser.php');
}
# User not logged in
else if(isset($_REQUEST['login'])&&$_REQUEST['login']=="true")
{
	require_once('pages/login.php');
}
else
{
    if ($userSession->isLoggedIn())
    {
        $loggedIn=true;
        
        if($userSession->isAdmin())
        {
            $admin=true;
            $contentprovider=true;
        }
        else if ($userSession->isContentProvider())
        {
            $admin=false;
            $contentprovider = true;	
        }
        else
        {
            $admin=false;
            $contentprovider = false;	
        }
    }
    else
    {
        $loggedIn=false;
    }
	

	$constructPage = new ConstructPage();
	$api = new Api();
	
	if(isset($_REQUEST['field'])&&isset($_REQUEST['subject'])&&isset($_REQUEST['course']))
	{
		$field = urlencode(trim($_REQUEST['field']));
		$subject = urlencode(trim($_REQUEST['subject']));
		$course = urlencode(trim($_REQUEST['course']));
		
		if(isset($_REQUEST['section'])&&isset($_REQUEST['lesson']))
		{
            $navPosition = "/data/material/$field/$subject/$course/";
			$section = urlencode(trim($_REQUEST['section']));
			$lesson = urlencode(trim($_REQUEST['lesson']));
			
			if(isset($_REQUEST['type']))
			{
				if($_REQUEST['type']=='quiz'||$_REQUEST['type']=='prequiz')
				{
                    if(isset($_REQUEST['questionId']))
                    {
                        if($admin)
                        {
                            $questionId=$_REQUEST['questionId'];
                            if($questionId=="new")
                            {
                                $questionContent = "<p></p>";
                                $questionName = "";
                                $correctAnswer = 1;
                                $answers = array();
                            }
                            else
                            {
                                $response=$api->get("/data/material/questionBlueprint/$questionId/");
                                $content=json_decode($response);
                                $questionContent = html_entity_decode($content->content);
                                $questionName = $content->name;
                                $correctAnswer = $content->correctAnswer;
                                $answers = $content->answerChoices;
                            }
                            require_once('pages/questionEdit.php');
                        }
                        else
                        {
                            header("Location: ".$loginURL);
                        }
                    }
                    else
                    {
                        if($admin)
                        {
                            $response=$api->get("/data/material/$field/$subject/$course/$section/$lesson/quizOutline/");
                            $content=json_decode($response);
                            $questions=$content->childData;
                            require_once('pages/testOverview.php');
                        }
                        else if($loggedIn)
                        {
                            $response=$api->get("/data/material/$field/$subject/$course/$section/$lesson/quizOutline/");
                            $content=json_decode($response);
                            $questions=$content->childData;
                            if(count($questions)>0)
                            {
                                $response=$api->get("/data/material/$field/$subject/$course/$section/$lesson/quiz/{$userSession->getUsername()}/");
                                $quizIncomplete = false;
                                $questionId = null;
                                $responseArray = json_decode($response);
                                $answerCorrect = array();
                                $lastAnswer = array();
                                foreach($responseArray as $key=>$submittedAnswer)
                                {
                                    if($submittedAnswer->answered===false)
                                    {
                                        $quizIncomplete = true;
                                        $questionId = $submittedAnswer->id;
                                        break;
                                    }
                                    else
                                    {
                                        array_push($answerCorrect,$submittedAnswer->submittedAnswer==$submittedAnswer->correctAnswer);
                                        $lastAnswer = $submittedAnswer;
                                    }
                                }
                                
                                if($quizIncomplete)
                                {
                                    if(count($lastAnswer)>0)
                                    {
                                        $response=$api->get("/data/material/questionBlueprint/{$lastAnswer->id}/");
                                        $responseArray = json_decode($response);
                                        $lastCorrectAnswer = html_entity_decode($responseArray->answerChoices[$lastAnswer->correctAnswer-1]);
                                        $lastQuestion = html_entity_decode($responseArray->content);
                                    }
                                    $response=$api->get("/data/material/questionBlueprint/$questionId/");
                                    $responseArray = json_decode($response);
                                    require('pages/test.php');
                                }
                                else
                                {
                                    $location="/data/material/$field/$subject/$course/$section/$lesson/";
                                    require('pages/testComplete.php');
                                }
                            }
                            else
                            {
                                require_once('pages/noQuestionsAdded.php');
                            }
                        }
                        else
                        {
                            header("Location: ".$loginURL);
                        }
                    }
				}
				else if($_REQUEST['type']=='lesson')
				{
					$response=$api->get("/data/material/$field/$subject/$course/$section/$lesson/content/");
					if($response!="Not Found")
					{
                        $responseArray = json_decode($response);
                        $content = html_entity_decode($responseArray->content);
                        $name = preg_replace('/_/',' ',$responseArray->name);
                        if($contentprovider)
                        {
                            $autosaveTime=json_decode($api->get("/data/material/$field/$subject/$course/$section/$lesson/content/autosave/{$userSession->getUsername()}/exists/"));
                        }
					}
					else
					{
						die("Not Found");
					}
					require_once('pages/lesson.php');
				}
                else if($_REQUEST['type']=='lessonHistory'&&$contentprovider)
                {
                    if(isset($_REQUEST['revisionId']))
                    {
                        $response=$api->get("/data/material/$field/$subject/$course/$section/$lesson/content/history/{$_REQUEST['revisionId']}");
                        $responseArray = json_decode($response);
                        $content = html_entity_decode($responseArray->content);
                        $name = preg_replace('/_/',' ',$responseArray->name);
                        $autosaveTime=json_decode($api->get("/data/material/$field/$subject/$course/$section/$lesson/content/autosave/{$userSession->getUsername()}/exists/"));
                        
                        require_once('pages/lesson.php');
                    }
                    else
                    {
                        $response=$api->get("/data/material/$field/$subject/$course/$section/$lesson/content/history/");
                        require_once('pages/lessonHistory.php');
                    }
                }
                else if($_REQUEST['type']=='lessonDiscussion'&&$contentprovider)
                {
                    $response=$api->get("/data/material/$field/$subject/$course/$section/$lesson/content/discussion/");
                    $responseArray = json_decode($response);
                    $content = html_entity_decode($responseArray->content);
                    $name = preg_replace('/_/',' ',$responseArray->name);
                    $autosaveTime=json_decode($api->get("/data/material/$field/$subject/$course/$section/$lesson/content/discussion/autosave/{$userSession->getUsername()}/exists/"));
                    
                    require_once('pages/discussion.php');
                }
                else if($_REQUEST['type']=='lessonAutosave'&&$contentprovider)
                {
                    $response=$api->get("/data/material/$field/$subject/$course/$section/$lesson/content/autosave/{$userSession->getUsername()}/");
                    $responseArray = json_decode($response);
                    $content = html_entity_decode($responseArray->content);
                    $name = preg_replace('/_/',' ',$responseArray->name);

                    require_once('pages/lesson.php');
                }
                else if($_REQUEST['type']=='lessonDiscussionAutosave'&&$contentprovider)
                {
                    $response=$api->get("/data/material/$field/$subject/$course/$section/$lesson/content/discussion/autosave/{$userSession->getUsername()}/");
                    $responseArray = json_decode($response);
                    $content = html_entity_decode($responseArray->content);
                    $name = preg_replace('/_/',' ',$responseArray->name);
                    
                    require_once('pages/discussion.php');
                }
                else if($_REQUEST['type']=='lessonDiscussionHistory'&&$contentprovider)
                {
                    if(isset($_REQUEST['revisionId']))
                    {
                        $response=$api->get("/data/material/$field/$subject/$course/$section/$lesson/content/discussion/history/{$_REQUEST['revisionId']}");
                        $responseArray = json_decode($response);
                        $content = html_entity_decode($responseArray->content);
                        $name = preg_replace('/_/',' ',$responseArray->name);
                        
                        require_once('pages/discussion.php');
                    }
                    else
                    {
                        $response=$api->get("/data/material/$field/$subject/$course/$section/$lesson/content/discussion/history/");
                        
                        $discussionHistoryType="lesson";
                        require_once('pages/discussionHistory.php');
                    }
                }
			}
			else
			{
				$response=$api->get("/data/material/$field/$subject/$course/$section/$lesson/content/");

				if($response!="Not Found")
				{
					$responseArray = json_decode($response);
                    $content = html_entity_decode($responseArray->content);
                    $name = preg_replace('/_/',' ',$responseArray->name);
                    if($contentprovider)
                    {
                        $autosaveTime=json_decode($api->get("/data/material/$field/$subject/$course/$section/$lesson/content/autosave/{$userSession->getUsername()}/exists/"));
                    }
				}
				else
				{
					die("Not Found");
				}
				require_once('pages/lesson.php');
			}
		}
		else
		{
			if(isset($_REQUEST['type']))
			{
				if($_REQUEST['type']=='exam')
				{
					require_once('pages/test.php');
				}
			}
			else if($contentprovider)
			{
                $navPosition = "/data/material/$field/$subject/";
				require_once('pages/courseEditor.php');
			}
            else
            {
                $navPosition = "/data/material/$field/$subject/";
                require_once('pages/course.php');
            }
		}
	}
    else if(isset($_REQUEST['questionblueprintid']))
    {
        if($contentprovider)
        {
            require_once('pages/questionEdit.php');
        }
        else
        {
            header("Location: ".$loginURL);
        }
    }
    else if(isset($_REQUEST['type'])&&$_REQUEST['type']=="lessonPlans")
    {
        #$response=$api->get("/user/lessonplans/{$userSession->getUsername()}/");
        require_once('pages/lessonPlans.php');
    }
    else if(isset($_REQUEST['lessonPlanId']))
    {
        require_once('pages/lessonPlan.php');
    }
	else
	{
		require_once('pages/landing.php');
		$navPosition="/data/";
	}	
}

### Assign Smarty Variables ###
$smarty->assign("contentprovider", $contentprovider);
$smarty->assign("loggedIn", $loggedIn);
	
#Head
$smarty->assign("loginURL",$loginURL);
$smarty->assign("title", $title);
$smarty->assign("cssfiles", $cssfiles);
$smarty->assign("iejavascriptfiles", $iejavascriptfiles);
$smarty->assign("javascriptfiles", $javascriptfiles);
$smarty->assign("fullnamejavascriptfiles",$fullnamejavascriptfiles);

#Navbar
$smarty->assign("navPosition", $navPosition);
	
#Content
$smarty->assign("content", $content);
	
#Body Templates
$smarty->assign("bodytemplates",$bodytemplates);

#Display
$smarty->display("main.tpl");

?>
