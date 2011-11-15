LessonDiscussionProvider.prototype = new ContentProvider();
LessonDiscussionProvider.prototype.constructor = LessonDiscussionProvider;
LessonDiscussionProvider.prototype.parent = new ContentProvider();

// DESC: Submits the content to the database through the API using an AJAX call
// RETURNS: void
LessonDiscussionProvider.prototype.submitContent = function()
{
    // Perform some cleanup
    $('p>br').remove();
    var lessonPayload = this.getPayload();

    $.ajax({url : this.submitLocation, type: 'POST', data: lessonPayload, success:function(data)
    {
        new Message(data);
    }});

    this.justSubmitted = lessonPayload;
    $('#autosaveLink').remove();
}

// DESC: Autosaves the content to the database through the API usning an AJAX call
// RETURNS: void
LessonDiscussionProvider.prototype.autosave = function()
{
    var lessonPayload = this.getPayload();

    if(!compareArrays(lessonPayload.ilos,this.justSubmitted.ilos)||lessonPayload.content!=this.justSubmitted.content)
    {
        $.ajax({url : this.autosaveLocation, type: 'POST', data: lessonPayload, success:function()
        {

        }});

        this.justSubmitted = lessonPayload;
        $('#autosaveLink').remove();
    }
}

// DESC: Calls the parent construct function and sets event handlers
// RETURNS: void
LessonDiscussionProvider.prototype.construct = function()
{
    this.parent.construct();
    var thisObject = this;

    this.justSubmitted = this.parent.getPayload();
    
    // Submit Content
	$('#submitContent').click(function()
	{
		thisObject.submitContent();
	});
    
    // Periodically autosave
    setInterval(function(){thisObject.autosave()},60000);
}

// DESC: Sets the submit and autosave files
// PARAMETER: submitLocation is the resource file to which the content will be sent upon save
// PARAMETER: autosaveLocation is the resource file to which the content will be sent upon autosave
// RETURNS: void
function LessonDiscussionProvider(submitLocation,autosaveLocation)
{
    this.submitLocation = submitLocation;
    this.autosaveLocation = autosaveLocation;
}