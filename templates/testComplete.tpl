<div id="content" data-location="{$location}">
    <section>
        <h1>Quiz Results</h1>
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