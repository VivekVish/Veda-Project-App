<div id="content" data-location="{$location}" data-name="Quiz Results">
    <section>
        <h1>Quiz Results</h1>   
{if $thresholdCorrectMet}
        <p class="quizExplain">Great job! You got {$percentCorrect}% correct. Feel free to continue
           to the next lesson.</p>
{else}
        <p>You got {$percentCorrect}% correct, but you should score at least 70%
           to continue. You can review the material for this quiz 
           <a href="{$lessonReviewLink}">here</a>.</p>
{/if}
{foreach from=$answerCorrect item=answer name=answerLoop}
<div class="question">
    <div class="counterContainer"><div class="counter">{assign var='counter' value=$smarty.foreach.answerLoop.index+1}{$counter}</div></div>
    <div class="questioncontent"><p></p>{$answer.question}</div>
    
    {if !$answer.correct}
    <p class="explanation">You answered:</p>
    <div class="answerfield multchoice selected">
        <ol>
            <li class="answerChoice" style="display:none"/>
            <li class="answerChoice deselected incorrectAnswer">
                {$answer.submittedAnswer}
                <img class="incorrectAnswerImage" src="img/incorrectAnswer.png" style="top: 3px;">
            </li>
        </ol>
    </div>
    <p class="explanation">The correct answer is:</p>
    {else}
    <p class="explanation">You answered correctly:</p>      
    {/if}
    <div class="answerfield multchoice deselected">
        <ol>
            <li class="answerChoice deselected correctAnswer">
                {$answer.correctAnswer}
                <img class="correctAnswerImage" src="img/correctAnswer.png" style="top: 3px;">
            </li>
        </ol>
    </div>
</div>
                    


{/foreach}
        <button id="retakequiz">Re-take Quiz</button>
    </section>
</div>