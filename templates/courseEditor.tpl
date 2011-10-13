        <div id="content">
        	<section>            	
                <h1>{$course}</h1>
				<div id="listEditorHeader" data-coursepath="{$classPath}">
					<span></span>
					<span></span>
					<span>
                        <img title="Add Section" id="addSectionIcon" src="img/editorIcons/addSection_icon.png" />
                    </span>
				</div>
				<ul class="sectionList listEditor">
{foreach from=$sectionArray item="section"}
					<li>
						<span data-sectionpath={$section.path} data-sectionorder={$section.order}>
							<span class="expandedList"><img src="img/editorIcons/minus_icon.png"></span>
							<span title="Click to Edit Name" class="sectionName">{$section.name}</span>
							<span>
                                <img title="Add Lesson" class="addLessonIcon" src="img/editorIcons/addLesson_icon.png" />
                                <img title="Delete Section" class="deleteSectionIcon" src="img/editorIcons/delete_icon.png" />
                            </span>
						</span>
						<ul class="lessonList">
{foreach from=$section.lessons item="lesson"}
							<li>
								<span data-lessonpath={$lesson.path} data-lessonorder={$lesson.order}>
									<span></span>
									<span title="Click to Edit Name" class="lessonName">{$lesson.name}</span>
									<span>
                                        <img title="Delete Lesson" class="deleteLessonIcon" src="img/editorIcons/delete_icon.png" />
                                    </span>
								</span>
							</li>
{/foreach}
						</ul>
					</li>
					
{/foreach}
				</ul>
                <div id="recoverLessonsHolder">
                    <button id="recoverDeletedLessons">Recover Deleted Lessons</button>
                </div>
            </section>
            
        </div>
