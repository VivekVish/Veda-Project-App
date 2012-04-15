<div id="content">
    <table id="quizOverview" data-quizpath="{$quizPath}">
        <tbody>
{*
            <tr>
                <td>Question ID</td>
                <td>Question Type</td>
                <td>Preview</td>
                <td>Topic</td>
                <td>Recurrence</td>
                <td>Actions</td>
            </tr>
{foreach from=$questions item="question"}
            <tr>
            	<td>{$question.id}</td>
                <td>{$question.type}</td>
                <td>{$question.preview}</td>
                <td class='topicEntry'>{$question.topic}</td>
                <td>{$question.recurrence}</td>
                <td><a href="index.php?quizBlueprintId={$quizId}&questionBlueprintId={$question.id}">{html_image file="img/editorIcons/edit_icon.png"}</a>
                	<img src="img/editorIcons/reassign_icon.png" class="reassignQuizQuestion" data-quizblueprintid="{$quizId}" data-questionblueprintid="{$question.id}" data-questiontopicpath="{$question.topicPath}" />
                	<img src="img/editorIcons/detach_icon.png" class="detachQuizQuestion" data-quizblueprintid="{$quizId}" data-questionblueprintid="{$question.id}"/>
                	<img src="img/editorIcons/delete_icon.png" class="deleteQuizQuestion" data-quizblueprintid="{$quizId}" data-questionblueprintid="{$question.id}"/></td>
            </tr>
{/foreach}
*}
            <tr>
                <td>Question ID</td>
                <td>Name</td>
                <td>Actions</td>
            </tr>
{foreach from=$questions item="question"}
            <tr>
                <td>{$question.id}</td>
                <td>{$question.name}</td>
                <td>
                    <a href="index.php?quizBlueprintId={$quizId}&questionBlueprintId={$question.id}">{html_image file="img/editorIcons/edit_icon.png"}</a>
                    <img src="img/editorIcons/delete_icon.png" class="deleteQuizQuestion" data-quizblueprintid="{$quizId}" data-questionblueprintid="{$question.id}"/></td>
                </td>
            </tr>
{/foreach}
        </tbody>
    </table>
    <button id="addQuestion">Add Question</button>
    <button id="attachQuestion">Attach Question</button>
</div>