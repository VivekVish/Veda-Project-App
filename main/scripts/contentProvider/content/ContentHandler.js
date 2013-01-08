////////////////////////////////////////////////////////////////
// The ContentHandler object extends the baseHandler object    //
// and handles events specifically for lessons (but not       //
// quizzes). 												  //
////////////////////////////////////////////////////////////////

// Chain the lessonHandler and baseHandler constructors
ContentHandler.prototype = new BaseHandler();
ContentHandler.prototype.constructor = ContentHandler;
ContentHandler.prototype.parent = new BaseHandler();


// DESC: handles events that occur when the cursor is within a table or a an event's target is a table, inherits functionality from baseHandler
// PARAMETER: e is an object of type Event
// RETURNS: void	
ContentHandler.prototype.handleTableEvent=function(e)
{
    this.parent.handleTableEvent(e);	
}

// DESC: handles events that occur when the cursor is within a list or a an event's target is a list, inherits functionality from baseHandler
// PARAMETER: e is an object of type Event
// RETURNS: void	
ContentHandler.prototype.handleListEvent=function(e)
{
    this.parent.handleListEvent(e);	
}

// DESC: handles events that occur when the cursor is within a paragraph or a an event's target is a paragraph, inherits functionality from baseHandler
// PARAMETER: e is an object of type Event
// RETURNS: void
ContentHandler.prototype.handleParagraphEvent=function(e)
{
    this.parent.handleParagraphEvent(e);	
}

// DESC: handles events that occur when the cursor is within a header or a an event's target is a header, inherits functionality from baseHandler
// PARAMETER: e is an object of type Event
// RETURNS: void
ContentHandler.prototype.handleHeaderEvent=function(e)
{
    this.parent.handleHeaderEvent(e);

    switch(e.keyCode)
    {
        // Backspace
        case 8:
            break;
    }
}

// DESC: handles general events within lessons, inherits functionality from baseHandler
// PARAMETER: e is an object of type Event
// RETURNS: void
ContentHandler.prototype.handleGeneralEvent=function(e)
{
    var thisObject = this;
    this.parent.handleGeneralEvent(e);
    materialProvider.toggleExitInfoBoxButton();

    switch(e.type)
    {
        case 'keydown':
            switch(e.keyCode)
            {
                // Backspace
                case 8:
                    var rangeParent = rangeTraverse.parents(':header,blockquote,table,list,p').last();
                    // Accounting for case where the cursor is in div#content
                    if(rangeParent.size()>0)
                    {
                        var rangeToBeginning = rangeTraverse.getCurrentRange().cloneRange();
                        rangeToBeginning.setStartBefore(rangeParent[0]);
                        if(rangeTraverse.parents(':header,blockquote,table,list,p').last().prev('h1').size()==1&&rangeToBeginning.toString()==""&&rangeTraverse.getCurrentRange().collapsed)
                        {
                            e.preventDefault();
                        }
                    }
                    break;
                // Enter, Page up and down, end, home, arrow keys, Delete
                case 13: case 33: case 34: case 35: case 36: case 37: case 38: case 39: case 40: case 46:
                    break;
                // 1
                case 49:
                    if(thisObject.keyPressed['shift']&&thisObject.keyPressed['ctrl'])
                    {
                        materialProvider.insertSection(1);
                    }
                    break;
                // 2
                case 50:
                    if(thisObject.keyPressed['shift']&&thisObject.keyPressed['ctrl'])
                    {
                        materialProvider.insertSection(2);
                    }
                    break;
                // 3
                case 51:
                    if(thisObject.keyPressed['shift']&&thisObject.keyPressed['ctrl'])
                    {
                        materialProvider.insertSection(3);
                    }
                    break;
                // 4
                case 52:
                    if(thisObject.keyPressed['shift']&&thisObject.keyPressed['ctrl'])
                    {
                        materialProvider.insertSection(4);
                    }
                    break;
                // 5
                case 53:
                    if(thisObject.keyPressed['shift']&&thisObject.keyPressed['ctrl'])
                    {
                        materialProvider.insertSection(5);
                    }
                    break;
                // 6
                case 54:
                    if(thisObject.keyPressed['shift']&&thisObject.keyPressed['ctrl'])
                    {
                        materialProvider.insertSection(6);
                    }
                    break;
                // B
                case 66:
                    if(thisObject.keyPressed['shift']&&thisObject.keyPressed['ctrl'])
                    {
                        e.preventDefault();
                        materialProvider.openInfoBoxLightbox();
                    }
                    break;
                // S
                case 83:
                    if(thisObject.keyPressed['ctrl'])
                    {
                        e.preventDefault();
                        materialProvider.submitContent();
                    }
                    break;
                // X
                case 88:
                    if(thisObject.keyPressed['shift']&&thisObject.keyPressed['ctrl'])
                    {
                        e.preventDefault();
                        materialProvider.exitInfoBox();
                    }
                    break;
                // Z
                case 90:
                    if(thisObject.keyPressed['ctrl']&&thisObject.keyPressed['shift'])
                    {
                        e.preventDefault();
                        materialProvider.exitInfoBox();
                    }
                    break;
            }
            break;
    }
}

function ContentHandler()
{
    
}

var currentHandler = new ContentHandler();