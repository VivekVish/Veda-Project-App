        <div id="content" data-name="Quiz" data-location="{$quizPath}">
            <section>
                <h1>Quiz</h1>
{foreach from=$questions key=id item=question}
	{include file="quizQuestion.tpl" content=$question.content answers=$question.answers answerfieldtype=$question.answerfieldtype question_id=$question.id}
{/foreach}
                <div class="submitdiv">
                    <form id="answerForm" name="answerForm" method="POST" action="submitQuizQuestion.php">
                        <input type="hidden" id="quiz_id" name="quiz_id" value="{$quiz_id}" />
                        <input type="hidden" id="question_id" name="question_id" value="{$question_id}" />
                        <input type="hidden" id="selectedAnswer" name="selectedAnswer" value="none" />
                    </form>
                </div>
                <div id="questionButtons">
{if $teacher}
                    <button id="viewFullQuiz" onClick="parent.location='index.php?field={$field}&subject={$subject}&course={$course}&section={$section}&lesson={$lesson}&type=printableQuiz'">View Full Quiz</button>
                    <button id="viewQuizAnswers" onClick="parent.location='index.php?field={$field}&subject={$subject}&course={$course}&section={$section}&lesson={$lesson}&type=printableQuizAnswers'">View Quiz Answers</button>
{/if}
                </div>
            </section>
        </div>
