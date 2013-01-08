<?php

require_once("PrintQuiz.php");

class PrintQuizAnswers extends PrintQuiz
{
    public function __construct()
    {
        $this->showAnswers = true;
        parent::__construct();
    }
}

?>
