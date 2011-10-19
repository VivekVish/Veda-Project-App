		<div id="CPtoolbar">
        	<ul>
            	<span class="CPsublist">
                    <li title="Bold (Ctrl+B)" id="bold">{html_image file='img/contenticons/bold.gif'}</li>
                    <li title="Italics (Ctrl+I)" id="italic">{html_image file='img/contenticons/italic.gif'}</li>
                    <li title="Underline (Ctrl+U)" id="underline" class="CPendseparator">{html_image file='img/contenticons/underline.gif'}</li>
                </span>
                <span class="CPsublist">
                    <li id="insertSection">{html_image file='img/contenticons/insertSection.gif'}
                    	<ul>
                        	{section name=level start=1 loop=7 step=1}
									{assign var='level' value=$smarty.section.level.index}
                                	<li title="Insert Header Level {$smarty.section.level.index} (Ctrl+Shift+{$smarty.section.level.index})" data-level={$smarty.section.level.index}>{html_image file="img/contenticons/level$level.gif"}</li>
                            {/section}
                        </ul>
                    </li>
                    <!--<li title="Delete Section (Ctrl+Shift+D)" id="deleteSection">{html_image file='img/contenticons/deleteSection.gif'}</li>-->
                </span>
                <span class="CPsublist">
					<li title="Insert Blockquote (Ctrl+Shift+Q)" id="insertBlockquote">{html_image file='img/contenticons/insertBlockquote.gif'}</li>
                	<li title="Insert Ordered List (Ctrl+Shift+O)" id="insertOrderedList">{html_image file='img/contenticons/insertOrderedList.gif'}</li>
                    <li title="Insert Unordered List (Ctrl+Shift+L)" id="insertUnorderedList">{html_image file='img/contenticons/insertUnorderedList.gif'}</li>
                    <li title="Insert Table (Ctrl+Shift+U)" id="insertTable">{html_image file='img/contenticons/insertTable.gif'}</li>
                    <li title="Delete Table (Ctrl+Shift+Y)" id="deleteTable">{html_image file='img/contenticons/deleteTable.gif'}</li>
                </span>
                <span class="CPsublist">
                	<li title="Insert Equation (Ctrl+Shift+E)" id="insertEquation">{html_image file='img/contenticons/insertEquation.gif'}</li>
                    <li title="Insert Graph (Ctrl+Shift+G)" id="insertGraph">{html_image file='img/contenticons/insertGraph.gif'}</li>
                    <li title="Insert Image (Ctrl+Shift+I)" id="insertImage">{html_image file='img/contenticons/insertImage.gif'}</li>
                </span>
{if isset($type)}
                <span class="CPfunctions">
{if isset($lastSavedAt)}
                    <li id="autosaveLink"><a href={$autosaveLink}>Recover Autosave</a></li>
{/if}
                    <li id="viewHistory"><a href="{$historyLink}">History</a></li>
{if $type=="lesson"}
                    <li id="discussLink"><a href="{$discussionLink}">Discuss</a></li>
{elseif $type=="lessonDiscussion"}
                    <li id="lessonLink"><a href="{$lessonLink}">Lesson</a></li>
{/if}
                </span>
{/if}
            </ul>
        </div>