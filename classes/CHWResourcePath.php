<?php

class ResourcePath
{
    private $currentPath = null;
    private $navPosition = null;
    private $pageClass = null;
    
    private $requiresLogin = false;
    private $studentAccessible = true;
    private $teacherAccessible = true;
    private $CPAccessible = true;
    private $adminAccessible = true;
            
    public function __construct($field,$subject,$course,$section,$lesson,$type,$id,$username,$userType)
    {
        if(is_null($field)||is_null($subject)||is_null($course))
        {
            $this->navPosition="/data/";
            
            if(is_null($type))
            {
                if(!is_null($subject))
                {
                    $this->pageClass="MVPSubject";
                    $this->currentPath ="/data/material/$field/$subject/";
                }
                elseif($userType=="guest")
                {
                    $this->pageClass = "MVPLanding";
                }
                else
                {
                    $this->pageClass = "MVPHome";
                    $this->currentPath = "/data/material/CHW_Training/";
                }
            }
            else
            {
                switch($type)
                {
                    case "newuser":
                        $this->pageClass = "MVPRequestUsername";
                        break;
                    case "home":
                        $this->pageClass = "MVPHome";
                        $this->currentPath = "/data/material/CHW_Training/";
                        break;
                    case "lessonPlan":
                        if(is_null($section)||is_null($lesson))
                        {
                            $this->currentPath = "/data/lessonplan/$id/";
                            $this->pageClass = "MVPLessonPlan";
                        }
                        else
                        {
                            $this->navPosition = "/data/lessonplan/$id/";
                            $this->currentPath = "/data/lessonplan/$id/$section/$lesson/";
                            $this->pageClass = "MVPLessonPlanLesson";
                        }
                        break;
                    case "lessonPlanManager":
                        $this->currentPath = "/user/lessonplanmanager/$username/";
                        $this->pageClass = "LessonPlanManager";
                        $this->studentAccessible = false;
                        $this->requiresLogin = true;
                        break;
                    case "lessonPlantrainingmanual":
                        $this->navPosition = "/data/lessonplan/$id/";
                        $this->currentPath = "/data/lessonplan/$id/$section/$lesson/trainingmanual/";
                        if($userType=="teacher")
                        {
                            $this->pageClass = "MVPTeacherTrainingManual";
                        }
                        else
                        {
                            $this->pageClass = "MVPLessonPlanTrainingManual";
                        }
                        break;
                    case "lessonPlanroleplay":
                        $this->navPosition = "/data/lessonplan/$id/";
                        $this->currentPath = "/data/lessonplan/$id/$section/$lesson/roleplay/";
                        $this->pageClass = "MVPLessonPlanRoleplay";
                        break;
                    case "lessonPlanvideo":
                        $this->navPosition = "/data/lessonplan/$id/";
                        $this->currentPath = "/data/lessonplan/$id/$section/$lesson/video/";
                        $this->pageClass = "MVPLessonPlanVideo";
                        break;
                    case "lessonPlanQuiz":
                        $this->requiresLogin = true;
                        $this->navPosition = "/data/lessonplan/$id/";
                        $this->currentPath = "/data/lessonplan/$id/$section/$lesson/quiz/$username/";
                        $this->pageClass = "MVPLessonPlanQuestion";
                        break;
                }
            }
        }
        else
        {
            if(is_null($section)||is_null($lesson))
            {
                $this->navPosition = "/data/material/$field/$subject/";
                if(is_null($type))
                {
                    $this->currentPath = "/data/material/$field/$subject/$course/";
                    
                    if($userType=="contentProvider"||$userType=="admin")
                    {
                        $this->pageClass = "MVPCourseEditor";
                    }
                    else
                    {
                        $this->pageClass = "MVPCourse";
                    }
                }
                else if($type=="exam")
                {
                    $this->pageClass = "MVPTest";
                }
            }
            else
            {
                $this->navPosition = "/data/material/$field/$subject/$course/";

                if(is_null($type))
                {
                    $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/content/";
                    if($userType=="contentProvider"||$userType=="admin")
                    {
                        $this->pageClass = "MVPEditLesson";
                    }
                    else
                    {
                        $this->pageClass = "MVPLesson";
                    }
                }
                else
                {
                    switch($type)
                    {
                        case "lesson":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/content/";
                            if($userType=="contentProvider"||$userType=="admin")
                            {
                                $this->pageClass = "MVPEditLesson";
                            }
                            else
                            {
                                $this->pageClass = "MVPLesson";
                            }
                            break;
                        case "questionBlueprint":
                            $this->currentPath = "/data/material/questionBlueprint/$id/";
                            $this->pageClass = "MVPQuestionEditor";
                            $this->studentAccessible = false;
                            $this->trainerAccessible = false;
                            break;
                        case "quiz":
                            $this->requiresLogin = true;
                            if($userType=="admin"||$userType=="contentProvider")
                            {
                                $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/quiz/";
                                $this->studentAccessible = false;
                                $this->trainerAccessible = false;
                                $this->pageClass="MVPQuizOverview";
                            }
                            else
                            {
                                $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/quiz/$username/";
                                $this->pageClass="MVPQuestion";
                            }
                            break;
                        case "printableQuiz":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/quiz/";
                            $this->studentAccessible = false;
                            $this->pageClass = "PrintQuiz";
                            break;
                        case "printableQuizAnswers":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/quiz/";
                            $this->studentAccessible = false;
                            $this->pageClass = "PrintQuizAnswers";
                            break;
                        case "video":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/lessonAdditions/video/";
                            if($userType=="contentProvider"||$userType=="admin")
                            {
                                $this->pageClass = "MVPEditVideo";
                            }
                            else
                            {
                                $this->pageClass = "MVPVideo";
                            }
                            break;
                        case "trainingmanual":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/lessonAdditions/trainingmanual/";
                            if($userType=="contentProvider"||$userType=="admin")
                            {
                                $this->pageClass = "MVPEditTrainingManual";
                            }
                            else
                            {
                                $this->pageClass = "MVPTrainingManual";
                            }
                            break;
                        case "roleplay":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/lessonAdditions/roleplay/";
                            $this->pageClass = "Roleplay";
                            if($userType=="contentProvider"||$userType=="admin")
                            {
                                $this->pageClass = "MVPEditRoleplay";
                            }
                            else
                            {
                                $this->pageClass = "MVPRoleplay";
                            }
                            break;
                        case "lessonHistory":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/content/history/";
                            $this->pageClass = "MVPLessonHistory";
                            $this->studentAccessible = false;
                            $this->trainerAccessible = false;
                            break;
                        case "lessonDiscussionHistory":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/content/discussion/history/";
                            $this->pageClass = "MVPLessonDiscussionHistory";
                            $this->studentAccessible = false;
                            $this->trainerAccessible = false;
                            break;
                        case "lessonRevision":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/content/history/$id/";
                            $this->pageClass = "MVPEditLessonRevision";
                            $this->studentAccessible = false;
                            $this->trainerAccessible = false;
                            break;
                        case "lessonDiscussionRevision":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/content/discussion/history/$id/";
                            $this->pageClass = "MVPEditLessonDiscussionRevision";
                            $this->studentAccessible = false;
                            $this->trainerAccessible = false;
                            break;
                        case "lessonDiscussion":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/content/discussion/";
                            $this->pageClass = "MVPEditLessonDiscussion";
                            $this->studentAccessible = false;
                            $this->trainerAccessible = false;
                            break;
                        case "lessonAutosave":
                            $this->requiresLogin = true;
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/content/autosave/$username/";
                            $this->pageClass = "MVPEditLessonAutosave";
                            $this->studentAccessible = false;
                            $this->trainerAccessible = false;
                            break;
                        case "lessonDiscussionAutosave":
                            $this->requiresLogin = true;
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/content/discussion/autosave/$username/";
                            $this->pageClass = "MVPEditDiscussionAutosave";
                            $this->studentAccessible = false;
                            $this->trainerAccessible = false;
                            break;
                    }
                }
            }
        }
    }
    
    public function getCurrentPath()
    {
        return $this->currentPath;
    }
    
    public function getNavPosition()
    {
        return $this->navPosition;
    }
    
    public function getPageClass()
    {
        return $this->pageClass;
    }
    
    public function isAccessible($userType)
    {
        switch($userType)
        {
            case "student":
                return $this->studentAccessible;
                break;
            case "teacher":
                return $this->teacherAccessible;
                break;
            case "contentProvider":
                return $this->CPAccessible;
                break;
            case "admin":
                return $this->adminAccessible;
                break;
            case "guest":
                return !$this->requiresLogin;
                break;
            default:
                break;
        }
    }
    
    public function requiresLogin()
    {
        return $this->requiresLogin;
    }
}

?>
