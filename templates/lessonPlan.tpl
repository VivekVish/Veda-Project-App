<div id="content">
        	<section>            	
                <h1>{$lessonPlanName}</h1>
				<div id="listEditorHeader" data-lessonplanid="{$lessonPlanId}">
					<span></span>
					<span></span>
					<span>
                        <img title="Add Section" id="addSectionIcon" src="img/editorIcons/addSection_icon.png" />
                    </span>
				</div>
				<ul class="sectionList listEditor">
{foreach from=$sectionArray item="section"}
					<li>
						<span data-sectionpath={$section->path} data-sectionorder={$section->order}>
							<span class="expandedList"></span>
							<span title="Click to Edit Name" class="sectionName">{$section->name}</span>
							<span>
                                <img title="Delete Section" class="deleteSectionIcon" src="img/editorIcons/delete_icon.png" />
                            </span>
						</span>
						<ul class="lessonList">
{foreach from=$section->lessons item="lesson"}
							<li class="lessonPlanLesson">
								<span data-lessonpath={$lesson->path} data-lessonorder={$lesson->order}>
									<span></span>
									<span title="Click to Edit Name" class="lessonName">{$lesson->name}</span>
									<span>
                                        <img title="Delete Lesson" class="deleteLessonIcon" src="img/editorIcons/delete_icon.png" />
                                        <a href="{$lesson->link}"><img title="Edit Lesson" class="editLessonIcon" src="img/editorIcons/editLesson_icon.png" /></a>
{foreach from=$lesson->additions item="addition"}
{if $addition eq 'quiz'}
                                        <a href="{$lesson->quizLink}"><img title="Take Quiz" class="quizIcon" src="img/editorIcons/quiz_icon.png" /></a>
{elseif $addition eq 'roleplay'}
                                        <a href="{$lesson->genericLink}&type={$addition}"><img title="Edit Roleplaying Manual" class="roleplayIcon" src="img/editorIcons/roleplay.png" /></a>
{elseif $addition eq 'trainingmanual'}
                                        <a href="{$lesson->genericLink}&type={$addition}"><img title="Edit Training Manual" class="trainingManualIcon" src="img/editorIcons/trainingmanual.png" /></a>
{elseif $addition eq 'video'}
                                        <a href="{$lesson->genericLink}&type={$addition}"><img title="Edit Video" class="videoIcon" src="img/editorIcons/video.png" /></a>
{/if}
{/foreach}
                                    </span>
								</span>
							</li>
{/foreach}
						</ul>
					</li>
					
{/foreach}
				</ul>
                <div id="lessonRepository" data-navposition="/data/material/">
                    <p id="repositoryBackLinks"></p>
                    <div></div>
                </div>
            </section>
            
        </div>