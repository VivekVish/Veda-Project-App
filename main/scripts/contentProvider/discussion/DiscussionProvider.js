$(document).ready(function()
{
    materialProvider = new LessonDiscussionProvider("resources/submitDiscussion.php","resources/autosaveDiscussion.php");
    materialProvider.construct();
});