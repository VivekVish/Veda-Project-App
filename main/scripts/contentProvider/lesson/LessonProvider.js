$(document).ready(function()
{
    materialProvider = new LessonDiscussionProvider("resources/submitLesson.php","resources/autosaveLesson.php");
    materialProvider.construct();
});