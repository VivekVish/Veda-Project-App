////////////////////////////////////////////////////////////////
// The quizHandler object extends the baseHandler object      //
// and handles events specifically for lessons (but not       //
// quizzes). 												  //
////////////////////////////////////////////////////////////////

// Chain the ContentHandler and baseHandler constructors
quizHandler.prototype = new BaseHandler();
quizHandler.prototype.constructor = quizHandler;
quizHandler.prototype.parent = new BaseHandler();

// DESC: handles events that occur when the cursor is within a table or a an event's target is a table, inherits functionality from baseHandler
// PARAMETER: e is an object of type Event
// RETURNS: void
quizHandler.prototype.handleTableEvent=function(e)
{
    this.parent.handleTableEvent(e);	
}

// DESC: handles events that occur when the cursor is within a list or a an event's target is a list, inherits functionality from baseHandler
// PARAMETER: e is an object of type Event
// RETURNS: void	
quizHandler.prototype.handleListEvent=function(e)
{
    this.parent.handleListEvent(e);	
}

// DESC: handles events that occur when the cursor is within a paragraph or a an event's target is a paragraph, inherits functionality from baseHandler
// PARAMETER: e is an object of type Event
// RETURNS: void
quizHandler.prototype.handleParagraphEvent=function(e)
{
    this.parent.handleParagraphEvent(e);	

    switch(e.type)
    {
        case 'keydown':
            switch(e.keyCode)
            {
                case 8:
                    if(rangeTraverse.getStartOffset()==0&&rangeTraverse.getStartContainer()==$('.questionContent').children().first()[0])
                    {
                        e.preventDefault();
                    }
                break;
            }
            break;
    }
}

// DESC: handles events that occur when the cursor is within a header or a an event's target is a header, inherits functionality from baseHandler
// PARAMETER: e is an object of type Event
// RETURNS: void
quizHandler.prototype.handleHeaderEvent=function(e)
{
    this.parent.handleHeaderEvent(e);
}

// DESC: handles events that occur when the cursor is within an input element or a an event's target is a input, inherits functionality from baseHandler
// PARAMETER: e is an object of type Event
// RETURNS: void
quizHandler.prototype.handleInputEvent=function(e)
{
    this.parent.handleInputEvent(e);
}

// DESC: handles general events within lessons, inherits functionality from baseHandler
// PARAMETER: e is an object of type Event
// RETURNS: void
this.handleGeneralEvent=function(e)
{
    parent.handleGeneralEvent(e);	
}

function quizHandler()
{
    
}

var currentHandler = new quizHandler();