<div id="content" data-location="{$location}">
    <section>
        <h1>Quiz Results</h1>   
{if $thresholdCorrectMet}
        <p>Great job! You got {$percentCorrect}% correct. Feel free to continue
           to the next lesson.</p>
{else}
        <p>You got {$percentCorrect}% correct, but you should score at least 70%
           to continue. You can review the material for this quiz 
           <a href="$lessonReviewLink">here</a>.</p>
{/if}
        <table id="quizComplete">
            <tr>
                <th>Question</th>
                <th>Score</th>
            </tr>
{foreach from=$answerCorrect item=answer name=answerLoop}
{assign var='counter' value=$smarty.foreach.answerLoop.index+1}
            <tr>
                <td>{$counter}</td>
                <td>
{if $answer}
                        Correct
{else}
                        Incorrect
{/if}
                </td>
            </tr>
{/foreach}
        </table>
        <button id="retakequiz">Re-take Quiz</button>
    </section>
</div>