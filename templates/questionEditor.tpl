        <div id="content" data-location="{$location}" data-name="{$name}" contenteditable="true">
        	<section>            	
                <h1>Question Editor</h1>
				<select>
{foreach from=$questionTypes item=questionCategory}
					<optgroup label="{$questionCategory.optgroup}">
{foreach from=$questionCategory.group item=questionItem}
						<option value={$questionItem.value}>{$questionItem.text}</option>
{/foreach}
					</optgroup>
{/foreach}
				</select>
                <div class="question" id="{$question_id}">
                    <div class="questioncontent">
                        <p>{$content}</p>
                    </div>
                </div>
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
				<div class="submitdiv">
                    <button type="button" class="editQuestion" id="editQuestion">EDIT</button>
                </div>
            </section>
        </div>