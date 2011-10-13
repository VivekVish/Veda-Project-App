////////////////////////////////////////////////////////////////
// The rangeTraverse namespace can get the current range, set //
// the current range, select an entire node, place the caret  //
// before or after a node, and get the start or end           //
// containers of the current range.                           //
////////////////////////////////////////////////////////////////

var rangeTraverse =
{
	// DESC: returns current range
	// RETURNS: Range object
	getCurrentRange: function()
	{
		if(window.getSelection().rangeCount>0)
		{
			return window.getSelection().getRangeAt(0);
		}
	},
	
	// DESC: sets current range
	// PARAMETER: newRange is the new Range to be set as the current Range
	//            newRange should be a range object if opts.type=='range'
	// 			  newRange should be an object literal variables 'startContainer' (type: node),
	//            'startOffset' (type: integer),'endContainer' (type:node), and 'endOffset'
	//            (type: integer) if opts.type=='nodeOffset'
	// PARAMETER: opts.type = 'range' is default, opts.type sets input type for newRange
	// RETURNS: void
	setCurrentRange: function(newRange, opts)
	{
		opts = typeof(opts) == 'undefined' ? {'type':'range'} : opts;
		
		if(opts.type == 'range')
		{
            window.getSelection().removeAllRanges();
			window.getSelection().addRange(newRange);
		}
		else if(opts.type == 'nodeOffset')
		{

            var sel = window.getSelection();
            var range = document.createRange();

            range.setStart(newRange.startContainer,newRange.startOffset);
            range.setEnd(newRange.endContainer,newRange.endOffset);
            sel.removeAllRanges();
            sel.addRange(range);
		}
	},
	
	// DESC: selects an entire node
	// PARAMETERS: targetNode is the node to be selected
	// RETURNS: void
	selectNode: function(targetNode)
	{
		var sel = window.getSelection();
		var range = document.createRange();
		range.selectNodeContents(targetNode);
		sel.removeAllRanges();
		sel.addRange(range);
	},
	
	// DESC: sets the caret position to the beginning of the node
	// PARAMETERS: targetNode is the node before which the cursor will be placed
	// RETURNS: void
	selectBefore: function(targetNode)
	{
		this.setCurrentRange({'startContainer':targetNode,'startOffset':0,'endContainer':targetNode,'endOffset':0},{'type':'nodeOffset'});
	},
	
	// DESC: sets the caret position at the end of a node
	// PARAMETERS: targetNode is the node after which the cursor will be placed
	// RETURNS: void
	selectAfter: function(targetNode)
	{
		var sel = window.getSelection();
		var range = document.createRange();
		range.selectNodeContents(targetNode);
		range.setStart(range.endContainer,range.endOffset);
		sel.removeAllRanges();
		sel.addRange(range);
	},
	
	// DESC: returns the startContainer of the selected range
	// RETURNS: Node object
	getStartContainer: function()
	{
		if(window.getSelection().rangeCount>0)
		{
			return this.getCurrentRange().startContainer;
		}
	},
	
	// DESC: returns the endContainer of the selected range
	// RETURNS: Node object
	getEndContainer: function()
	{
		if(window.getSelection().rangeCount>0)
		{
			return this.getCurrentRange().endContainer;
		}
	},
	
	// DESC: returns the startOffset of the selected range
	// RETURNS: integer
	getStartOffset: function()
	{
		if(window.getSelection().rangeCount>0)
		{
			return this.getCurrentRange().startOffset;
		}
	},
	
	// DESC: returns the endoffset of the selected range
	// RETURNS: integer
	getEndPosition: function()
	{
		if(window.getSelection().rangeCount>0)
		{
			return this.getCurrentRange().endOffset;
		}
	},
	
	// DESC: checks whether a node has an ancestor that matches a given selector
	// PARAMETER: node is the node whose ancestors are being checked
	// PARAMETER: selector is a string that is the selector to be matched
	// RETURNS: boolean
	hasAncestor: function(node, selector)
	{
		return $(node).parents(selector).size()>0;
	},
	
	// DESC: check whether the startContainer of the currently selected range is 
	// 		 contained within an ancestor of type selector
	// PARAMETER: selector is a string that is the selector to be matched
	// PARAMETER: inclusive is a boolean that is true if the startNode should be
	//       	  included in the search for an ancestor of type selector
	//            default value for inclusive is true
	// RETURNS: boolean
	within: function(selector,inclusive)
	{
		inclusive = typeof(inclusive) == 'undefined' ? true : inclusive;
		return (inclusive ? (this.hasAncestor(rangeTraverse.getStartContainer(),selector) || $(rangeTraverse.getStartContainer()).is(selector)) : this.hasAncestor(rangeTraverse.getStartContainer(),selector));
	},
	
	// DESC: gets all ancestors of a given type for the start of the currently
	//		 selected range
	// PARAMETER: selector is a string that is the selector to be matched
	// PARAMETER: inclusive is a boolean that is true if the startNode should be
	//       	  included in the search for an ancestor of type selector
	//            default value for inclusive is true
	// RETURNS: jQuery object
	parents: function(selector, inclusive)
	{
		inclusive = typeof(inclusive) == 'undefined' ? true : inclusive;
		startNode = rangeTraverse.getStartContainer();
		return (inclusive && $(startNode).is(selector) ? $(startNode).parents(selector).add(startNode) : $(startNode).parents(selector));
	}
}