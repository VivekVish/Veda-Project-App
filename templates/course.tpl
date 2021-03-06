        <div id="content">
            <section>            	
                <h1>{$course}</h1>
                <div id="listEditorHeader" data-coursepath="{$classPath}">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul class="sectionList listEditor userCourse">
{foreach from=$sectionArray item="section"}
                    <li>
                        <span data-sectionpath="{$section.path}" data-sectionorder="{$section.order}">
                                <span class="expandedList"></span>
                                <span class="sectionName">{$section.name}</span>
                                <span></span>
                        </span>
                        <ul class="lessonList">
{foreach from=$section.lessons item="lesson"}
                            <li>
                                <span data-lessonpath={$lesson.path} data-lessonorder={$lesson.order}>
                                    <a href="{$lesson.link}">
                                        <span></span>
                                        <span class="lessonName">{$lesson.name}</span>
                                    </a>
                                    <span class="userCourseButtons">
                                        <a href="{$lesson.link}"><img title="Read Lesson" class="readLessonIcon" src="img/editorIcons/editLesson_icon.png" /></a>
                                        <a href="{$lesson.quizLink}"><img title="Take Quiz" class="quizIcon" src="img/editorIcons/quiz_icon.png" /></a>
{foreach from=$lesson.additions item="addition"}
{if $addition eq 'roleplay'}
                                        <a href="{$lesson.genericLink}&type={$addition}"><img title="Edit Roleplaying Manual" class="roleplayIcon" src="img/editorIcons/roleplay.png" /></a>
{elseif $addition eq 'trainingmanual'}
                                        <a href="{$lesson.genericLink}&type={$addition}"><img title="Edit Training Manual" class="trainingManualIcon" src="img/editorIcons/trainingmanual.png" /></a>
{elseif $addition eq 'video'}
                                        <a href="{$lesson.genericLink}&type={$addition}"><img title="Edit Video" class="videoIcon" src="img/editorIcons/video.png" /></a>
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
            </section>
            
        </div>
