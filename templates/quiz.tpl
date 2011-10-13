        <div id="content">
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
                    <button type="button" class="submitanswer" id="submitAnswer">SUBMIT</button>
                </div>
            </section>
        </div>
