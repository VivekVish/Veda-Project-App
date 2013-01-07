
                <div class="question" id="{$question_id}">
                    <div class="questioncontent">
                        <p>{$content}</p>
                    </div>
                    <div class="answerfield {$answerfieldtype}">
{if $answerfieldtype=='multchoice'}
                        <ol>
{foreach from=$answers key=id item=answer name=answerLoop}
{assign var='counter' value=$id+1}
                            <li class="answerChoice" id="{$question_id}-{$counter}">{$answer}</li>
{/foreach}
                        </ol>
{elseif $answerfieldtype=='fillintheblank'}
                        <input type="text" />
{elseif $answerfieldtype=='equation'}
						
{/if}
                    </div>
                </div>