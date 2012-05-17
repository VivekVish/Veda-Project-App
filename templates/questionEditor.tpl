        <div id="content" data-location="{$location}" data-questionid="{$questionId}" data-name="{$name}">
        	<section>            	
                <h1>Question Editor</h1>
                <label>Question Type</label>
				<select>
{foreach from=$questionTypes item=questionCategory}
					<optgroup label="{$questionCategory.optgroup}">
{foreach from=$questionCategory.group item=questionItem}
						<option value={$questionItem.value}>{$questionItem.text}</option>
{/foreach}
					</optgroup>
{/foreach}
				</select>
                <label>Answer</label>
                <select class="correctAnswer">
{section name=foo loop=9}
{if $smarty.section.foo.iteration==$correctAnswer}
                    <option value={$smarty.section.foo.iteration} selected="selected">{$smarty.section.foo.iteration}</option>
{else}
                    <option value={$smarty.section.foo.iteration}>{$smarty.section.foo.iteration}</option>
{/if}
{/section}
                </select>
                <label for="questionName">Question Name</label>
                <input id="questionName" value="{$questionName}"/>
                <div class="question" id="{$question_id}">
                    <div class="questionContent">
{$questionContent}

{if count($answers)>0}
                        <ul>
{foreach from=$answers item=answer}
                            <li>{$answer}</li>
{/foreach}
                        </ul>
{/if}
                    </div>
                </div>
                {*
                <div class="samplequestion">
                    <h4>Sample Question</h4>
                    <p>Evaluate the following expression:</p>
                    <div class="questioncontent">
                    </div>
                    <div class="answerfield">
                        <ol></ol>
                    </div>
                    <button type="button">Generate</button>
                </div>
                *}
            </section>
        </div>