LessonAdditionProvider.prototype = new ContentProvider();
LessonAdditionProvider.prototype.constructor = LessonAdditionProvider;
LessonAdditionProvider.prototype.parent = new ContentProvider();

// DESC: Submits the content to the database through the API using an AJAX call
// RETURNS: void
LessonAdditionProvider.prototype.submitContent = function()
{
    // Perform some cleanup
    $('p>br').remove();
    var lessonPayload = this.getPayload();
    var locationArray = $('#content').attr('data-location').replace(/^\/data\/material\/|\/$/g,'').split('/');
    lessonPayload.name = locationArray[locationArray.length-1];

    $.ajax({url : this.submitLocation, type: 'POST', data: lessonPayload, success:function(data)
    {
        new Message(data);
    }});

    this.justSubmitted = lessonPayload;
}

// DESC: Calls the parent construct function and sets event handlers
// RETURNS: void
LessonAdditionProvider.prototype.construct = function()
{
    this.parent.construct();
    var thisObject = this;

    this.justSubmitted = this.parent.getPayload();
    
    // Submit Content
	$('#submitContent').click(function()
	{
		thisObject.submitContent();
	});
}

// DESC: Sets the submit and autosave files
// PARAMETER: submitLocation is the resource file to which the content will be sent upon save
// PARAMETER: autosaveLocation is the resource file to which the content will be sent upon autosave
// RETURNS: void
function LessonAdditionProvider(submitLocation)
{
    this.submitLocation = submitLocation;
}

$(document).ready(function()
{
    materialProvider = new LessonAdditionProvider("resources/submitLessonAddition.php");
    materialProvider.construct();
});