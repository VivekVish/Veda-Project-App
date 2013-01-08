		<div id="CPtoolbar">
        	<ul>
            	<span class="CPsublist">
                    <li title="Bold (Ctrl+B)" id="bold">{html_image file='img/contenticons/bold.png'}</li>
                    <li title="Italics (Ctrl+I)" id="italic">{html_image file='img/contenticons/italic.png'}</li>
                    <li title="Underline (Ctrl+U)" id="underline" class="CPendseparator">{html_image file='img/contenticons/underline.png'}</li>
                </span>
                <span class="CPsublist">
                    <li id="insertSection">{html_image file='img/contenticons/insertSection.png'}
                    	<ul>
                        	{section name=level start=1 loop=7 step=1}
									{assign var='level' value=$smarty.section.level.index}
                                	<li title="Insert Header Level {$smarty.section.level.index} (Ctrl+Shift+{$smarty.section.level.index})" data-level={$smarty.section.level.index}>{html_image file="img/contenticons/level$level.gif"}</li>
                            {/section}
                        </ul>
                    </li>
                    <li title="Insert Info Box (Ctrl+Shift+B)" id="insertInfoBox">{html_image file='img/contenticons/insertInfoBox.png'}</li>
                    <li title="Exit Info Box (Ctrl+Shift+Z)" id="exitInfoBox" style="display:none;">{html_image file='img/contenticons/exitInfoBox.png'}</li>
                </span>
                <span class="CPsublist">
					<li title="Insert Blockquote (Ctrl+Shift+Q)" id="insertBlockquote">{html_image file='img/contenticons/insertBlockquote.png'}</li>
                	<li title="Insert Ordered List (Ctrl+Shift+O)" id="insertOrderedList">{html_image file='img/contenticons/insertOrderedList.png'}</li>
                    <li title="Insert Unordered List (Ctrl+Shift+L)" id="insertUnorderedList">{html_image file='img/contenticons/insertUnorderedList.png'}</li>
                    <li title="Insert Table (Ctrl+Shift+U)" id="insertTable">{html_image file='img/contenticons/insertTable.png'}</li>
                    <li title="Delete Table (Ctrl+Shift+Y)" id="deleteTable" style="display:none;">{html_image file='img/contenticons/deleteTable.png'}</li>
                    <li title="Insert Table Row (Ctrl+Shift+P)" id="insertTableRow" style="display:none;">{html_image file='img/contenticons/insertTableRow.png'}</li>
                    <li title="Insert Table Column (Ctrl+Shift+[)" id="insertTableColumn" style="display:none;">{html_image file='img/contenticons/insertTableColumn.png'}</li>
                    <li title="Delete Table Row (Ctrl+Shift+])" id="deleteTableRow" style="display:none;">{html_image file='img/contenticons/deleteTableRow.png'}</li>
                    <li title="Delete Table Column (Ctrl+Shift+\)" id="deleteTableColumn" style="display:none;">{html_image file='img/contenticons/deleteTableColumn.png'}</li>
                    <li title="Insert Citation (Ctrl+Shift+X)" id="insertCitation">{html_image file='img/contenticons/insertCitation.png'}</li>
                </span>
                <span class="CPsublist">
                	<li title="Insert Equation (Ctrl+Shift+E)" id="insertEquation">{html_image file='img/contenticons/insertEquation.png'}</li>
                    <li title="Insert Chemical Equation (Ctrl+Shift+C)" id="insertChemicalEquation">{html_image file='img/contenticons/insertChemicalEquation.png'}</li>
                    <li title="Insert Graph (Ctrl+Shift+G)" id="insertGraph">{html_image file='img/contenticons/insertGraph.png'}</li>
                    <li title="Insert Image (Ctrl+Shift+I)" id="insertImage">{html_image file='img/contenticons/insertImage.png'}</li>
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