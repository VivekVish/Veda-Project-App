////////////////////////////////////////////////////////////////
// The quizHandler object extends the baseHandler object      //
// and handles events specifically for lessons (but not       //
// quizzes). 												  //
////////////////////////////////////////////////////////////////

// Chain the ContentHandler and baseHandler constructors
quizHandler.prototype = new BaseHandler();

function quizHandler()
{
	
	var parent = new BaseHandler();
	
	// DESC: handles events that occur when the cursor is within a table or a an event's target is a table, inherits functionality from baseHandler
	// PARAMETER: e is an object of type Event
	// RETURNS: void
	this.handleTableEvent=function(e)
	{
		parent.handleTableEvent(e);	
	}
	
	// DESC: handles events that occur when the cursor is within a list or a an event's target is a list, inherits functionality from baseHandler
	// PARAMETER: e is an object of type Event
	// RETURNS: void	
	this.handleListEvent=function(e)
	{
		parent.handleListEvent(e);	
	}
	
	// DESC: handles events that occur when the cursor is within a paragraph or a an event's target is a paragraph, inherits functionality from baseHandler
	// PARAMETER: e is an object of type Event
	// RETURNS: void
	this.handleParagraphEvent=function(e)
	{
		parent.handleParagraphEvent(e);	
	}
	
	// DESC: handles events that occur when the cursor is within a header or a an event's target is a header, inherits functionality from baseHandler
	// PARAMETER: e is an object of type Event
	// RETURNS: void
	this.handleHeaderEvent=function(e)
	{
		parent.handleHeaderEvent(e);
	}
	
	// DESC: handles events that occur when the cursor is within an input element or a an event's target is a input, inherits functionality from baseHandler
	// PARAMETER: e is an object of type Event
	// RETURNS: void
	this.handleInputEvent=function(e)
	{
		parent.handleInputEvent(e);
	}
	
	// DESC: handles general events within lessons, inherits functionality from baseHandler
	// PARAMETER: e is an object of type Event
	// RETURNS: void
	this.handleGeneralEvent=function(e)
	{
		parent.handleGeneralEvent(e);	
	}
}

var currentHandler = new quizHandler();