////////////////////////////////////////////////////////////////
// The ContentState class contains all the undo and redo      //
// functionality for content and ILOs. 						  //
////////////////////////////////////////////////////////////////

// this.stateArray stores the set of undo / redo content states
ContentState.prototype.stateArray = new Array();
// this.maxLength is the maximum number of states that can be stored
ContentState.prototype.maxLength = 10;
// this.statePosition is the current state position
ContentState.prototype.statePosition = -1;
// Set to true if a character is typed.  Used to determine when an undo event should take place
ContentState.prototype.charactersTyped = false;

// DESC: saveState saves the current content state to the stateArray
// RETURNS: void
ContentState.prototype.saveState = function()
{
    var currentState = this.getCurrentState();
        
    if(this.statePosition>-1)
    {
        if(this.compareStates(currentState,this.stateArray[this.statePosition]))
        {
            return;
        }
    }

    if(this.statePosition==(this.maxLength-1))
    {
        this.stateArray.shift();
    }
    else
    {
        this.statePosition++;
    }

    this.stateArray[this.statePosition] = currentState;
    this.charactersTyped = false;

    if((this.stateArray.length-1)>this.statePosition)
    {
        this.stateArray.splice(this.statePosition+1,this.stateArray.length-this.statePosition);
    }
}

// DESC: restores the content state to that of position
// PARAMETER: position is an integer indicating the position in stateArray that the content should be returned to
// RETURNS: void
ContentState.prototype.restoreState=function(position)
{
    if(position>=0&&position<this.stateArray.length)
    {
        $('#content>section').first().html(this.stateArray[position].content);
        ILOContents.ILOArray = this.stateArray[position].ILOArray;
        $('.ilo').empty();
        $('.citation').empty();
        baseContent.refreshILOs();
        baseContent.refreshCitations();
        this.statePosition = position;
        rangeTraverse.selectAfter($('#content>section').first().find('p,li').last()[0]);
        this.charactersTyped = false;
    }
}

// DESC: returns to the previous content state
// RETURNS; void
ContentState.prototype.undo=function()
{
    if(!this.compareStates(this.stateArray[this.statePosition],this.getCurrentState())&&this.charactersTyped)
    {
        this.saveState();	
        this.restoreState(this.statePosition-1);
        return;
    }
    this.restoreState(this.statePosition-1);
}

// DESC: moves to the next content state
// RETURNS: void
ContentState.prototype.redo=function()
{
    if(!this.charactersTyped)
    {
        this.restoreState(this.statePosition+1);
    }
}

// DESC: compares two states and returns true if they are the same and false otherwise
// PARAMETER: state1 is a state object literal
// PARAMETER: state2 is another state object literal
// RETURNS: boolean
ContentState.prototype.compareStates=function(state1,state2)
{
    if(state1.content==state2.content&&compareArrays(state1.ILOArray,state2.ILOArray))
    {
        return true;
    }

    return false;
}

// DESC: gets the current state
// RETURNS: object literal
ContentState.prototype.getCurrentState=function()
{
    var cloneContent = $('#content>section').first().clone();
    cloneContent.find('#lightbox,#overlay').remove();
    var contentHTML = cloneContent.remove().html();
    var ILOArray = ILOContents.ILOArray;

    return {"content":contentHTML,"ILOArray":ILOArray};
}

function ContentState()
{
}