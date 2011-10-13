////////////////////////////////////////////////////////////////
// The ContentState class contains all the undo and redo      //
// functionality for content and ILOs. 						  //
////////////////////////////////////////////////////////////////

function ContentState()
{
    var thisObject = this;
	// this.stateArray stores the set of undo / redo content states
	this.stateArray = new Array();
	// this.maxLength is the maximum number of states that can be stored
	this.maxLength = 10;
	// this.statePosition is the current state position
	this.statePosition = -1;
    // Set to true if a character is typed.  Used to determine when an undo event should take place
	this.charactersTyped = false;
	
	// DESC: saveState saves the current content state to the stateArray
	// RETURNS: void
	this.saveState=function()
	{
        var currentState = thisObject.getCurrentState();
        
        if(thisObject.statePosition>-1)
        {
            if(thisObject.compareStates(currentState,thisObject.stateArray[thisObject.statePosition]))
            {
                return;
            }
        }
        
        if(thisObject.statePosition==(thisObject.maxLength-1))
		{
			thisObject.stateArray.shift();
		}
		else
		{
			thisObject.statePosition++;
		}
		
		thisObject.stateArray[thisObject.statePosition] = currentState;
        thisObject.charactersTyped = false;
        
		if((thisObject.stateArray.length-1)>thisObject.statePosition)
		{
			thisObject.stateArray.splice(thisObject.statePosition+1,thisObject.stateArray.length-thisObject.statePosition);
		}
	}
	
	// DESC: restores the content state to that of position
	// PARAMETER: position is an integer indicating the position in stateArray that the content should be returned to
	// RETURNS: void
	this.restoreState=function(position)
	{
		if(position>=0&&position<thisObject.stateArray.length)
		{
			$('#content>section').first().html(thisObject.stateArray[position].content);
			ILOContents.ILOArray = thisObject.stateArray[position].ILOArray;
			baseContent.refreshILOs();
			thisObject.statePosition = position;
            rangeTraverse.selectAfter($('#content>section').first().find('p,li').last()[0]);
            thisObject.charactersTyped = false;
		}
	}
	
	// DESC: returns to the previous content state
	// RETURNS; void
	this.undo=function()
	{
		if(!thisObject.compareStates(thisObject.stateArray[thisObject.statePosition],thisObject.getCurrentState())&&thisObject.charactersTyped)
		{
			thisObject.saveState();	
            thisObject.restoreState(thisObject.statePosition-1);
            return;
		}
		thisObject.restoreState(thisObject.statePosition-1);
	}
	
	// DESC: moves to the next content state
	// RETURNS: void
	this.redo=function()
	{
        if(!this.charactersTyped)
        {
            thisObject.restoreState(thisObject.statePosition+1);
        }
	}
    
    // DESC: compares two states and returns true if they are the same and false otherwise
    // PARAMETER: state1 is a state object literal
    // PARAMETER: state2 is another state object literal
    // RETURNS: boolean
    this.compareStates=function(state1,state2)
    {
        if(state1.content==state2.content&&compareArrays(state1.ILOArray,state2.ILOArray))
        {
            return true;
        }
        
        return false;
    }
    
    // DESC: gets the current state
    // RETURNS: object literal
    this.getCurrentState=function()
    {
        var cloneContent = $('#content>section').first().clone();
        cloneContent.find('#lightbox,#overlay').remove();
        var contentHTML = cloneContent.remove().html();
        var ILOArray = ILOContents.ILOArray;
        
        return {"content":contentHTML,"ILOArray":ILOArray};
    }
}