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
                $this->pageClass = "Landing";
            }
            else
            {
                switch($type)
                {
                    case "lessonPlan":
                        $this->currentPath = "/data/lessonplan/$id/";
                        $this->pageClass = "LessonPlan";
                        $this->studentAccessible = false;
                        break;
                    case "lessonPlanManager":
                        $this->currentPath = "/user/lessonplanmanager/$username/";
                        $this->pageClass = "LessonPlanManager";
                        $this->studentAccessible = false;
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
                        $this->pageClass = "CourseEditor";
                    }
                    else
                    {
                        $this->pageClass = "Course";
                    }
                }
                else if($type=="exam")
                {
                    $this->pageClass = "Test";
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
                        $this->pageClass = "EditLesson";
                    }
                    else
                    {
                        $this->pageClass = "Lesson";
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
                                $this->pageClass = "EditLesson";
                            }
                            else
                            {
                                $this->pageClass = "Lesson";
                            }
                            break;
                        case "questionBlueprint":
                            $this->currentPath = "/data/material/questionBlueprint/$id/";
                            $this->pageClass = "QuestionEditor";
                            $this->studentAccessible = false;
                            $this->trainerAccessible = false;
                            break;
                        case "quiz":
                            $this->requiresLogin = true;
                            if($userStatus=="admin"||$userStatus=="contentProvider")
                            {
                                $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/quiz/";
                                $this->studentAccessible = false;
                                $this->trainerAccessible = false;
                                $this->pageClass="QuizOverview";
                            }
                            else
                            {
                                $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/quiz/$username/";
                                $this->pageClass="Question";
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
                                $this->pageClass = "EditVideo";
                            }
                            else
                            {
                                $this->pageClass = "Video";
                            }
                            break;
                        case "trainingmanual":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/lessonAdditions/trainingmanual/";
                            if($userType=="contentProvider"||$userType=="admin")
                            {
                                $this->pageClass = "EditTrainingManual";
                            }
                            elseif($userType=="teacher")
                            {
                                $this->pageClass = "TeacherTrainingManual";
                            }
                            else
                            {
                                $this->pageClass = "TrainingManual";
                            }
                            break;
                        case "roleplay":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/lessonAdditions/roleplay/";
                            $this->pageClass = "Roleplay";
                            if($userType=="contentProvider"||$userType=="admin")
                            {
                                $this->pageClass = "EditRoleplay";
                            }
                            else
                            {
                                $this->pageClass = "Roleplay";
                            }
                            break;
                        case "lessonHistory":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/content/history/";
                            $this->pageClass = "LessonHistory";
                            $this->studentAccessible = false;
                            $this->trainerAccessible = false;
                            break;
                        case "lessonDiscussionHistory":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/content/discussion/history/";
                            $this->pageClass = "LessonDiscussionHistory";
                            $this->studentAccessible = false;
                            $this->trainerAccessible = false;
                            break;
                        case "lessonRevision":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/content/history/$id/";
                            $this->pageClass = "EditLessonRevision";
                            $this->studentAccessible = false;
                            $this->trainerAccessible = false;
                            break;
                        case "lessonDiscussionRevision":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/content/discussion/history/$id/";
                            $this->pageClass = "EditLessonDiscussionRevision";
                            $this->studentAccessible = false;
                            $this->trainerAccessible = false;
                            break;
                        case "lessonDiscussion":
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/content/discussion/";
                            $this->pageClass = "EditLessonDiscussion";
                            $this->studentAccessible = false;
                            $this->trainerAccessible = false;
                            break;
                        case "lessonAutosave":
                            $this->requiresLogin = true;
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/content/autosave/$username/";
                            $this->pageClass = "EditLessonAutosave";
                            $this->studentAccessible = false;
                            $this->trainerAccessible = false;
                            break;
                        case "lessonDiscussionAutosave":
                            $this->requiresLogin = true;
                            $this->currentPath = "/data/material/$field/$subject/$course/$section/$lesson/content/discussion/autosave/$username/";
                            $this->pageClass = "EditDiscussionAutosave";
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
            case "contentprovider":
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
