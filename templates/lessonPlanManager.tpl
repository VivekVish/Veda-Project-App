        <div id="content">
        	<section>            	
                <h1>Lesson Plans</h1>
				<table id="lessonplans">
                    <tr>
                        <th>Lesson Plan</th>
                        <th>Tags</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
{foreach from=$lessonplans item="lessonplan"}
                    <tr data-lessonplanid="{$lessonplan->id}">
                        <td><a href="index.php?lessonPlanId={$lessonplan->id}">{$lessonplan->name}</a></td>
                        <td>{$lessonplan->tags}</td>
                        <td>{$lessonplan->notes}</td>
                        <td>
                            <img title="Edit Lesson" class="editLessonPlanIcon" src="img/editorIcons/editLesson_icon.png" />
                            <img title="Delete Lesson" class="deleteLessonPlanIcon" src="img/editorIcons/delete_icon.png" />
                        </td>
                    </tr>
{/foreach}
                </table>
                <button id="addLessonPlan">Add Lesson Plan</button>
            </section>
            
        </div>
