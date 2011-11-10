////////////////////////////////////////////////////////////////
// The BaseHandler object contains functions that handle      //
// events when the cursor position is within the non-ILO 	  //
// elements that exist within the content.  These include     //
// tables, lists, paragraphs, and headers. 	The baseHandler   //
// class is general to both quizzes and lessons. 			  //
////////////////////////////////////////////////////////////////

// Stores which of the control keys are currently being pressed
BaseHandler.prototype.keyPressed = new Array();

function BaseHandler()
{
	var thisObject = this;
	
	this.keyPressed['ctrl'] = false;
	this.keyPressed['alt'] = false;
	this.keyPressed['shift'] = false;
	
	// DESC: handles all events and passes them to appropriate functions based on the placement of the cursor or the origin of the event
	// PARAMETER: e is an object of type Event
	// RETURNS: void
	this.handleContentEvent=function(e)
	{
        if((e.type=="click"||e.type=="mousedown"||e.type=="mouseup")||typeof(rangeTraverse.getCurrentRange())!='undefined')
        {
            this.handleGeneralEvent(e);
            
            if(rangeTraverse.within('.ilo')||((e.type=="click"||e.type=="mousedown"||e.type=="mouseup")&&($(e.target).parents('.ilo').size()>0||$(e.target).is('.ilo'))))
            {
                this.handleILOEvent(e);
            }
            else if(rangeTraverse.within('table'))
            {
                this.handleTableEvent(e);
            }
            else if(rangeTraverse.within('ul,ol'))
            {
                this.handleListEvent(e);	
            }
            else if(rangeTraverse.within('blockquote'))
            {
                this.handleBlockquoteEvent(e);
            }
            else if(rangeTraverse.within('p'))
            {
                this.handleParagraphEvent(e);
            }
            else if(rangeTraverse.within(':header'))
            {
                this.handleHeaderEvent(e);	
            }
            else if(rangeTraverse.within('input'))
            {
                this.handleInputEvent(e);
            }
            else
            {
                this.handleSectionEvent(e);
            }
        }
	}
	
	// DESC: Handles command key events for table events
	//		Other events execute the default action
	// PARAMETER: e is an object of type Event
	// RETURNS: void
	this.handleTableEvent=function(e)
	{
		// Switch statement handles specific keystroke behavior
		switch(e.type)
		{
			case 'keydown':
				switch(e.keyCode)
				{
					// Tab
					case 9:
						tableElementParent = $(window.getSelection().getRangeAt(0).startContainer).parents('td');
						if(tableElementParent.size()>0)
						{
							if(tableElementParent.next('td').size()>0)
							{
								rangeTraverse.selectBefore(tableElementParent.next('td')[0]);
							}
							else if(tableElementParent.parent('tr').next('tr').size()>0)
							{
								rangeTraverse.selectBefore(tableElementParent.parent('tr').next('tr').children('td')[0]);
							}
						}
						break;
					//Enter
					case 13:
						// If the parent of the selection is within a table element, then create a line break
						if(rangeTraverse.parents('td').size()>0)
						{
							e.preventDefault();
							var newLineBreak = document.createElement('br');
							rangeTraverse.getCurrentRange().insertNode(newLineBreak);
							var sel = window.getSelection();
							var range = document.createRange();
							range.setStartAfter(newLineBreak);
							range.setEndAfter(newLineBreak);
							sel.removeAllRanges();
							sel.addRange(range);
						}
				}
				
				break;
		}
	}
	
	// DESC: Handles command key events for list events
	//		Other events execute the default action
	// PARAMETER: e is an object of type Event
	// RETURNS: void
	this.handleListEvent=function(e)
	{
		// Switch statement handles specific keystroke behavior
		switch(e.type)
		{
			case 'keydown':
				switch(e.keyCode)
				{
					// Enter
					case 13:
						rangeSelection = rangeTraverse.getCurrentRange();
						startNode = rangeTraverse.getStartContainer();
                        if(thisObject.keyPressed['shift'])
                        {
                            var lineBreak = document.createElement("BR");
                            rangeSelection.insertNode(lineBreak);
                        }
						else if(startNode.tagName=="LI"&&$(startNode).parents('#content ul').size()==1&&rangeSelection.startOffset==0&&$(startNode).filter(function(){ return this.nodeType ==3}).size()==0)
						{
							e.preventDefault();
							newParagraph = $('<p></p>');
							if($(startNode).siblings().size()==0)
							{
								$(startNode).parent().replaceWith(newParagraph);
	
							}
							else if($(startNode).prev().size()==0)
							{
								$(startNode).parent().before(newParagraph);
								$(startNode).remove();
							}
							else if($(startNode).next().size()==0)
							{
								$(startNode).parent().after(newParagraph);
								$(startNode).remove();
							}
							else
							{
								listType = $(startNode).parent()[0].tagName.toLowerCase();
								$('<'+listType+'></'+listType+'>').insertAfter($(startNode).parent()).append($(startNode).nextAll());
								$(startNode).parent().after(newParagraph);
								$(startNode).remove();
							}
							rangeTraverse.selectBefore(newParagraph[0]);
						}
                        break;
				}
				
				break;
		}
	}
	
	// DESC: Handles command key events for blockquote events
	// 		Other events execute the default action
	// PARAMETER: e is an object of type Event
	// RETURNS: void
	this.handleBlockquoteEvent=function(e)
	{
		// Switch statement handles specific keystroke behavior
		switch(e.type)
		{
			case 'keydown':
				switch(e.keyCode)
				{
					// Enter
					case 13:
                        if(thisObject.keyPressed['shift'])
                        {
                            e.preventDefault();
                            materialProvider.addParagraph({sameLevelParagraph:true});
                        }
                        else
                        {
                            e.preventDefault();
                            materialProvider.addParagraph();
                        }
                        break;
				}
				
				break;
		}
	}
	
	// DESC: Handles command key events for paragraph events
	//		Other events execute the default action
	// PARAMETER: e is an object of type Event
	// RETURNS: void
	this.handleParagraphEvent=function(e)
	{
		// Switch statement handles specific keystroke behavior
		switch(e.type)
		{
			case 'keydown':
				switch(e.keyCode)
				{
					// Enter
					case 13:
						e.preventDefault();
						materialProvider.addParagraph();
				}
				
				break;
		}
	}
	
	// DESC: Handles command key events for header events
	//		Other events execute the default action
	// PARAMETER: e is an object of type Event
	// RETURNS: void
	this.handleHeaderEvent=function(e)
	{
		if(e.type=="keydown")
		{
			switch(e.keyCode)
			{
				// Enter
				case 13:					
					if(contentState.charactersTyped)
					{
						contentState.saveState();
					}
					
					var currentSelection = rangeTraverse.getCurrentRange();
					
					currentSelection.collapsed ? contentState.charactersTyped = false : contentState.charactersTyped = true;
					
					e.preventDefault();
					
                    var rangeParent = rangeTraverse.parents(':header');

                    if(rangeTraverse.parents(':header').text()=="")
                    {
                        var newParagraph = $("<p>")
                        rangeTraverse.parents(':header').replaceWith(newParagraph);
                        rangeTraverse.selectAfter(newParagraph[0]);
                    }
                    else
                    {
                        materialProvider.addParagraph();
                    }
					break;
			}
		}
	}
	
	// DESC: Handles events for input events
	// PARAMETER: e is an object of type Event
	// RETURNS: void
	this.handleInputEvent=function(e)
	{
		
	}
	
	// DESC: Handles all ILO events
	// PARAMETER: e is an object of type Event
	// RETURNS: void
	this.handleILOEvent=function(e)
	{
		if(e.type=='keyup')
		{
			var ILOTarget = rangeTraverse.parents('.ilo')[0];
		}
		else
		{
			var ILOTarget = $(e.target).is('.ilo') ? e.target :  $(e.target).parents('.ilo')[0];	
		}
		
		switch(e.type)
		{
			case 'mousedown':
				e.preventDefault();
			case 'click':
				rangeTraverse.selectBefore($('#content h1')[0]);
				ilo.selectILO(ILOTarget);
				break;
			case 'keyup':
				ilo.selectILO(ILOTarget);
				break;
			case 'keydown':
				switch(e.keyCode)
				{
					// Page Up, Page Down, Left, Up, Right, Down
					case 8: case 33: case 34: case 37: case 38: case 39: case 40:
						break;
					// Everything Else
					default:
						e.preventDefault();
						break;
				}
				break;
		}	
	}
	
	
	
	// DESC: Handles events that fall outside the standard elements.
	// PARAMETER: e is an object of type Event
	// RETURNS: void
	this.handleSectionEvent=function(e)
	{
		switch(e.type)
		{
			case 'keydown':
				switch(e.keyCode)
				{
					// Page Up, Page Down, Left, Up, Right, Down
					case 8: case 33: case 34: case 37: case 38: case 39: case 40:
						break;
					// Everything Else
					default:
						e.preventDefault();
						break;
				}
				break;	
		}
	}
	
	// DESC: Handles all events wherever in content they are executed
	// PARAMETER:  e is an object of type Event
	// RETURNS: void
	this.handleGeneralEvent=function(e)
	{
		ilo.deselectILO($('.selectedILO'));
		materialProvider.toggleStyleHighlighting();
		
		switch(e.type)
		{
			// KEYDOWN EVENTS
			case 'keydown':
				// If statements handle general keystroke behaviors				
				if(rangeTraverse.within('.ilo'))
				{
					e.preventDefault();
					return;
				}
				
				// If any character is typed, characters typed is set to true
				if(((e.keyCode>=48&&e.keyCode<=90)||(e.keyCode>=106&&e.keyCode<=111)||(e.keyCode>=186&&e.keyCode<=222))&&!thisObject.keyPressed['ctrl']&&!thisObject.keyPressed['alt'])
				{
					contentState.charactersTyped=true;
                    
					if(typeof(rangeTraverse.getStartContainer())!='undefined'&&rangeTraverse.getStartContainer().tagName=='SECTION')
					{
						var newParagraph = document.createElement('p');
						rangeTraverse.getCurrentRange().insertNode(newParagraph);
						rangeTraverse.selectBefore(newParagraph);
					}
					else if(rangeTraverse.parents('.ilo').size()>0)
					{
						var newParagraph = document.createElement('p');
						rangeTraverse.parents('.ilo').after(newParagraph);
						rangeTraverse.selectBefore(newParagraph);
					}
				}
				
				// Switch statement handles specific keystroke behavior
				switch(e.keyCode)
				{
                    // Backspace
					case 8:
                        var firstTextHoldingParent = rangeTraverse.parents('p,li,td,th,:header').first();
                        if(firstTextHoldingParent.contents()[0]==rangeTraverse.getStartContainer()&&rangeTraverse.getStartOffset()==0)
                        {
                            var previousTextHoldingElement = null;
                            $('#content>section p,li,td,th,:header').each(function(index)
                            {
                                if(firstTextHoldingParent[0]==this&&index>0)
                                {
                                    e.preventDefault();
                                    var markedInfoBoxForDeletion = null;
                                    if(firstTextHoldingParent.parent('.infoBox').size()==1&&firstTextHoldingParent.parent('.infoBox').contents().size()==1)
                                    {
                                        markedInfoBoxForDeletion = firstTextHoldingParent.parent('.infoBox');
                                    }
                                    var textContents = firstTextHoldingParent.contents();
                                    $(previousTextHoldingElement).append(textContents);
                                    rangeTraverse.selectBefore(textContents[0]);
                                    $(this).remove();
                                    if(typeof(markedInfoBoxForDeletion)!="null")
                                    {
                                        markedInfoBoxForDeletion.remove();
                                    }
                                    
                                    materialProvider.fixBackgroundColor();
                                    return false;
                                }
                                previousTextHoldingElement = this;
                            });
                            
                        }
                        
						if(contentState.charactersTyped)
						{
							contentState.saveState();
						}
						
						// If the current range has text highlighted, then we count Backspace, Enter, or Delete as an undo point
						rangeTraverse.getCurrentRange().collapsed ? contentState.charactersTyped = false : contentState.charactersTyped = true;
						
						break;
					// Enter, Delete
					case 13: case 46: 				
						if(contentState.charactersTyped)
						{
							contentState.saveState();
						}
                        
						// If the current range has text highlighted, then we count Backspace, Enter, or Delete as an undo point
						window.getSelection().getRangeAt(0).collapsed ? contentState.charactersTyped = false : contentState.charactersTyped = true;
						
						break;
					// Page up and down, end, home, arrow keys
					case 33: case 34: case 35: case 36: case 37: case 38: case 39: case 40:
						if(contentState.charactersTyped)
						{
							contentState.saveState();
						}
						contentState.charactersTyped = false;
						break;
					// Shift
					case 16:
						thisObject.keyPressed['shift'] = true;
						break;
					// Ctrl
					case 17:
						thisObject.keyPressed['ctrl'] = true;
						break;
					// Alt
					case 18:
						thisObject.keyPressed['alt'] = true;
						break;					
					// B
					case 66:
						if(!thisObject.keyPressed['shift']&&thisObject.keyPressed['ctrl'])
						{
							e.preventDefault();
							materialProvider.formatTextStyle("bold");
						}
						break;
                    // C
                    case 67:
                        if(thisObject.keyPressed['shift']&&thisObject.keyPressed['ctrl'])
						{
                            e.preventDefault();
                            chemicalEquation.editMode();
                        }
                        break;
                    // E
                    case 69:
                        if(thisObject.keyPressed['shift']&&thisObject.keyPressed['ctrl'])
						{
                            e.preventDefault();
                            equation.editMode();
                        }
                        break;
                    // G
                    case 71:
                        if(thisObject.keyPressed['shift']&&thisObject.keyPressed['ctrl'])
						{
                            e.preventDefault();
                            graph.editMode();
                        }
                        break;
					// I
					case 73:
						if(thisObject.keyPressed['ctrl'])
						{
							e.preventDefault();
							materialProvider.formatTextStyle("italic");
						}
						break;
                    // L
					case 76:
						if(thisObject.keyPressed['shift']&&thisObject.keyPressed['ctrl'])
						{
							e.preventDefault();
							materialProvider.insertList('unordered');
						}
						break;
                    // O
					case 79:
						if(thisObject.keyPressed['shift']&&thisObject.keyPressed['ctrl'])
						{
							e.preventDefault();
							materialProvider.insertList('ordered');
						}
						break;
                    // Q
                    case 81:
                        if(thisObject.keyPressed['shift']&&thisObject.keyPressed['ctrl'])
						{
                            e.preventDefault();
                            materialProvider.insertBlockquote();
                        }
                        break;
					// U
					case 85:
                        if(thisObject.keyPressed['shift']&&thisObject.keyPressed['ctrl'])
						{
                            e.preventDefault();
                            e.stopPropagation();
                            materialProvider.createInsertTableLightBox();
                        }
						else if(thisObject.keyPressed['ctrl'])
						{
							e.preventDefault();
							materialProvider.formatTextStyle("underline");
						}
						break;
					// Y
					case 89:
                        if(thisObject.keyPressed['shift']&&thisObject.keyPressed['ctrl'])
						{
                            e.preventDefault();
                            materialProvider.deleteTable();
                        }
						else if(thisObject.keyPressed['ctrl'])
						{
							e.preventDefault();
							contentState.redo();
						}
						break;
					// Z
					case 90:
						if(thisObject.keyPressed['ctrl'])
						{
							e.preventDefault();
							contentState.undo();
						}
						break;
                    // Hyphen
                    /*case 109: case 189:
                        var currentRange = rangeTraverse.getCurrentRange();

                        if(currentRange.collapsed&&currentRange.startOffset>0)
                        {
                            var newRange = currentRange.cloneRange();
                            var startNode = currentRange.startContainer;
                            if(!$(startNode).is('*'))
                            {
                                startNode = $(currentRange.startContainer).parent()[0];
                            }
                            var startOffset = currentRange.startOffset-1;
                            newRange.setStart(startNode, startOffset);
                            if(newRange.toString()=="-")
                            {
                                e.preventDefault();
                                newRange.deleteContents();
                                newRange.insertNode(document.createTextNode($('<div />').html('&mdash;').remove().text()));
                                console.log(startNode);
                                console.log(startOffset);
                                newRange.setStart(startNode,startOffset+1);
                                newRange.setEnd(startNode,startOffset+1);
                                rangeTraverse.setCurrentRange(newRange);                                
                            }
                        }
                        break;*/
				}
				break;
			case 'keyup':
				if(typeof(rangeTraverse.getStartContainer())!='undefined'&&$(rangeTraverse.getStartContainer()).parents('.ilo').size()>0)
				{
					e.preventDefault();
					return;
				}
                
				switch(e.keyCode)
				{
					// Shift
					case 16:
						thisObject.keyPressed['shift'] = false;
						break;
					// Ctrl
					case 17:
						thisObject.keyPressed['ctrl'] = false;
						break;
					// Alt
					case 18:
						thisObject.keyPressed['alt'] = false;
						break;
				}
		}
	}
}