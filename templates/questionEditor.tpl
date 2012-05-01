        <div id="content" data-location="{$location}" data-questionid="{$questionId}" data-name="{$name}" contenteditable="true">
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
                <select>
{section name=foo loop=9} 
                    <option value={$smarty.section.foo.iteration}>{$smarty.section.foo.iteration}</option>
{/section}
                </select>
                <div class="question" id="{$question_id}">
                    <div class="questionContent">
                        <p>{$content}</p>
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