        <div id="content">
{foreach from=$questions key=id item=question}
            <h4>Question {$id+1}</h4>
            {$question->content|html_entity_decode}
            <ul>
{foreach from=$question->answerChoices key=answerId item=answer}
{if $answerId==($question->correctAnswer-1) && $showAnswers}
                <li>_X_ &nbsp;{$answer}</li>
{else}
                <li>___ &nbsp;{$answer}</li>
{/if}
{/foreach}
            </ul>
{/foreach}
        </div>