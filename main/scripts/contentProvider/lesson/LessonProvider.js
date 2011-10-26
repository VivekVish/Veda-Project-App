$(document).ready(function()
{
    ContentProvider.prototype = new BaseProvider();
    ContentProvider.prototype.constructor = ContentProvider;
    LessonProvider.prototype = new ContentProvider();
    LessonProvider.prototype.constructor = LessonProvider;
	materialProvider = new LessonProvider();
});

function LessonProvider()
{
    var thisObject = this;
    this.justSubmitted = thisObject.getPayload();
    
    
    
    // DESC: Submits the content to the database through the API using an AJAX call
	// RETURNS: void
	this.submitContent = function()
	{
        // Perform some cleanup
        $('.Apple-style-span').remove();
        $('p>br').remove();
        var lessonPayload = thisObject.getPayload();

        $.ajax({url : 'resources/submitLesson.php', type: 'POST', data: lessonPayload, success:function(data)
        {
            new Message(data);
        }});
    
        thisObject.justSubmitted = lessonPayload;
        $('#autosaveLink').remove();
	}
    
    // DESC: Autosaves the content to the database through the API usning an AJAX call
    // RETURNS: void
    this.autosave = function()
    {
        var lessonPayload = thisObject.getPayload();

        if(!compareArrays(lessonPayload.ilos,thisObject.justSubmitted.ilos)||lessonPayload.content!=thisObject.justSubmitted.content)
        {
            $.ajax({url : 'resources/autosaveLesson.php', type: 'POST', data: lessonPayload, success:function()
            {

            }});

            thisObject.justSubmitted = lessonPayload;
            $('#autosaveLink').remove();
        }
    }
    
    // Submit Content
	$('#submitContent').click(function()
	{
		thisObject.submitContent();
	});
    
    // Periodically autosave
    setInterval(thisObject.autosave,60000);
}