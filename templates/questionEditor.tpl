        <div id="content">
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
                    <div class="answerfield {$answerfieldtype}">
{if $answerfieldtype=='multchoice'}
                        <ol>
{foreach from=$answers key=id item=answer}
                            <li class="answerChoice" id="question{$question_id}-{$id}">{$answer}</li>
{/foreach}
                        </ol>
{elseif $answerfieldtype=='fillintheblank'}
                        <input type="text" />
{elseif $answerfieldtype=='equation'}
						
{/if}
                    </div>
                </div>
				<div class="submitdiv">
                    <button type="button" class="editQuestion" id="editQuestion">EDIT</button>
                </div>
            </section>
        </div>
