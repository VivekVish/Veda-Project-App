$(document).ready(function()
{
    ContentProvider.prototype = new BaseProvider();
    ContentProvider.prototype.constructor = ContentProvider;
    DiscussionProvider.prototype = new ContentProvider();
    DiscussionProvider.prototype.constructor = DiscussionProvider;
	materialProvider = new DiscussionProvider();
});

function DiscussionProvider()
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
        var discussionPayload = thisObject.getPayload();

        $.ajax({url : 'resources/submitDiscussion.php', type: 'POST', data: discussionPayload, success:function(data)
        {
            new Message(data);
        }});
    
        thisObject.justSubmitted = discussionPayload;
	}
    
    // DESC: Autosaves the content to the database through the API usning an AJAX call
    // RETURNS: void
    this.autosave = function()
    {
        var discussionPayload = thisObject.getPayload();

        if(!compareArrays(discussionPayload.ilos,thisObject.justSubmitted.ilos)||discussionPayload.content!=thisObject.justSubmitted.content)
        {
            $.ajax({url : 'resources/autosaveDiscussion.php', type: 'POST', data: discussionPayload, success:function()
            {

            }});

            thisObject.justSubmitted = discussionPayload;
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