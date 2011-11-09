////////////////////////////////////////////////////////////////
// The BaseProvider object contains functions to add          //
// and manipulate standard objects (i.e. objects that aren't  //
// ILOs).													  //
////////////////////////////////////////////////////////////////

function BaseProvider()
{
    var thisObject = this;
    
    // DESC: Creates the lightbox to insert a citation
    // RETURNS: void
    this.createCitationLightbox = function()
    {
        
    }
    
    // DESC: Inserts a citation
    // RETURNS: void
    this.insertCitation = function()
    {
        
    }
    
	// DESC: Inserts a blockquote
    // RETURNS: void
	this.insertBlockquote = function()
	{
		if(rangeTraverse.within('#content'))
		{
			if(rangeTraverse.parents('p,ul,ol').size()>0&&rangeTraverse.parents('blockquote').size()==0)
			{
				contentState.saveState();
				
				var newBlockquote = $("<blockquote><p></p></blockquote>");
				
				var parent = rangeTraverse.parents('p,ul,ol').last();
				
				toEndOfStartNode = rangeTraverse.getCurrentRange();
				toEndOfStartNode.setEndAfter(parent[0]);
				parent.after(newBlockquote);
				var toEndContents = toEndOfStartNode.extractContents();
				if(toEndContents!="")
				{
					$(newBlockquote).after(toEndContents);
				}
				
				rangeTraverse.selectBefore(newBlockquote.children('p')[0]);
				
				contentState.saveState();
			}
		}
	}
	
	// DESC: Inserts a table with a certain numbe of rows and columns at a given caretPosition
	// PARAMETER: rows is the number of rows to be added to the table
	// PARAMETER: columns is the number of columns to be added to the table
	// PARAMETER: caretPositionRange is the range that contains the caret Position for the added table
	// RETURNS: void
	this.insertTable = function(rows, columns, caretPositionRange)
	{
		if($(caretPositionRange.startContainer).parents('#content').size()>0)
		{
			var properStartPosition = false;
			   
			var insertNodeLocation = $(caretPositionRange.startContainer).parents('p,ul,ol,blockquote').last();
            if(insertNodeLocation.size()==0&&$(caretPositionRange.startContainer).is('p,ul,ol,blockquote'))
            {
                insertNodeLocation = $(caretPositionRange.startContainer);
            }
			
			if(insertNodeLocation.size()>0)
			{
				properStartPosition = true;
			}
			
			if(properStartPosition)
			{
                contentState.saveState();
				var newTable = $('<table><tbody></tbody></table>');
				
				for(i=0;i<rows;i++)
				{
					newRow=$('<tr></tr>');
					for(j=0;j<columns;j++)
					{
						newRow.append('<td></td>');	
					}
					newTable.append(newRow);
				}
				
				var toEndOfStartNode = caretPositionRange;				
				toEndOfStartNode.setEndAfter(insertNodeLocation[0]);
				insertNodeLocation.after(toEndOfStartNode.extractContents());
				insertNodeLocation.after(newTable);
				
				rangeTraverse.selectBefore($(newTable).find('td,th')[0]);
                contentState.saveState();
			}
		}
	}
	
	// DESC: creates a light box that prompts the user to enter the rows and columns for the lightbox
	// RETURNS: void
	this.createInsertTableLightBox = function()
	{
		var caretPositionRange = rangeTraverse.getCurrentRange();
		var maxcolumns = 10;
		var maxrows = 30;
		var insertTableBox = $('<div id="insertTableBox"><ul></ul></div>');
		insertTableBox.children('ul').append($('<li><label for="tableRows">Rows</label><select id="tableRows"></select></li>'));
		insertTableBox.children('ul').append('<li><label for="tableColumns">Columns</label><select id="tableColumns"></select></li>');
		insertTableBox.children('ul').append('<li><button class="cancel">Cancel</button><button class="create">Create</button></li>');
	
		for(var i=1;i<=maxrows;i++)
		{
			insertTableBox.find('#tableRows').append('<option value="'+i+'">'+i+'</option>');
		}
		
		for(var i=1;i<=maxcolumns;i++)
		{
			insertTableBox.find('#tableColumns').append('<option value="'+i+'">'+i+'</option>');
		}
		
		createLightBox('#content','Create Table',insertTableBox);
		
		$('#insertTableBox button.create').click(function()
		{
			thisObject.insertTable($('#tableRows').val(),$('#tableColumns').val(),caretPositionRange);
			$('#lightbox').fadeOut('fast',function() {$(this).remove();});
			$('#overlay').fadeOut('fast',function() {$(this).remove();});
		});
		
		$('#insertTableBox button.cancel').click(function()
		{
			$('#lightbox').fadeOut('fast',function() {$(this).remove();});
			$('#overlay').fadeOut('fast',function() {$(this).remove();});
		});
	}
    
    // DESC: Deletes the table in which the current range resides
    // RETURNS: void
    this.deleteTable = function()
    {
        if(rangeTraverse.within('table'))
        {
            $(rangeTraverse.getStartContainer()).parents('table').remove();
        }
    }
	
	// DESC: Inserts an ordered or unordered list
	// PARAMETER: type is either 'ordered' for an ordered list or 'unordered' for an unordered list
	// RETURNS: void
	this.insertList = function(type)
	{
		if(rangeTraverse.within('#content'))
		{
			if(rangeTraverse.parents('p,ul,ol').size()>0)
			{
				contentState.saveState();
				
				if(type=='ordered')
				{
					listTag = 'ol';
				}
				else if(type=='unordered')
				{
					listTag = 'ul';
				}
				
				var newList = $("<"+listTag+"><li></li></"+listTag+">");
				
				var pBlockquoteParent = rangeTraverse.parents('p,blockquote').last();
				var listParent = rangeTraverse.parents('ul,ol').first();
				
				if(pBlockquoteParent.size()>0)
				{
                    if(pBlockquoteParent.children().size()==0&&pBlockquoteParent.text()=="")
                    {
                        pBlockquoteParent.replaceWith(newList);
                    }
                    else
                    {
                        toEndOfStartNode = rangeTraverse.getCurrentRange();
                        toEndOfStartNode.setEndAfter(pBlockquoteParent[0]);
                        pBlockquoteParent.after(newList);
                        var toEndContents = toEndOfStartNode.extractContents();
                        if(toEndContents!="")
                        {
                            $(newList).after(toEndContents);
                        }
                    }
				}
				else if(listParent.size()>0)
				{
					listParent.first().append(newList);
				}
				
				rangeTraverse.selectBefore(newList.children('li')[0]);
				
				contentState.saveState();
			}
		}
	}
	
	// DESC: adds a paragraph to at the current caret position
	// RETURNS: void
	this.addParagraph = function(opts)
	{
        if(typeof(opts)=='undefined')
        {
            opts = {};
            opts.sameLevelParagraph=false;
        }
        
		if(rangeTraverse.within('#content'))
		{
			var startNode = rangeTraverse.getStartContainer();
			var startSection = $(startNode).parents('section')[0];
			var startToEndElemRange = rangeTraverse.getCurrentRange();
			startToEndElemRange.deleteContents();
            
            if(opts.sameLevelParagraph&&rangeTraverse.within('p'))
            {
                paragraph = rangeTraverse.parents('p');
				startToEndElemRange.setEndAfter(paragraph[0]);
				paragraphContents = startToEndElemRange.extractContents();
	
				paragraph.after(paragraphContents);
	
				rangeTraverse.selectBefore(paragraph.next()[0]);
            }
			else if($(startNode).parents(':header,blockquote').size()>0)
			{
				startToEndElemRange.setEndAfter($(startNode).parents(':header,blockquote')[0]);
				var remainingHeaderBlockquote = startToEndElemRange.toString();
				startToEndElemRange.deleteContents();
				$($(startNode).parents(':header,blockquote')[0]).after('<p>'+remainingHeaderBlockquote+'</p>');
				
				rangeTraverse.selectBefore($($(startNode).parents(':header,blockquote')[0]).next()[0]);
			}
			else if(rangeTraverse.within('p'))
			{
                paragraph = rangeTraverse.parents('p');
				startToEndElemRange.setEndAfter(paragraph[0]);
				paragraphContents = startToEndElemRange.extractContents();
	
				paragraph.after(paragraphContents);
	
				rangeTraverse.selectBefore(paragraph.next()[0]);
			}
		}
	}
	
	// DESC: Formats the currently selected text to bold, italic, or underline
	// PARAMETER: textStyle is either 'bold', 'italic', or 'underline'
	// RETURNS: void
	this.formatTextStyle = function(textStyle)
	{
		if(thisObject.checkValidStyle(textStyle))
		{
			document.execCommand(textStyle,false,null);
			thisObject.toggleStyleHighlighting();
		}
	}
	
	// DESC: Checks whether a style is being used in an appropriate place
	// PARAMETER: textStyle is either 'bold', 'italic', or 'underline'
	// RETURNS: boolean, true if it is a valid style and false otherwise
	this.checkValidStyle = function(textStyle)
	{
		checkVal = $('<div></div>').append(window.getSelection().getRangeAt(0).cloneContents());
		startNode = window.getSelection().getRangeAt(0).startContainer;
		endNode = window.getSelection().getRangeAt(0).endContainer;
		if(rangeTraverse.within('#content')&&!rangeTraverse.hasAncestor(rangeTraverse.getStartContainer(),'.ilo')&&!rangeTraverse.hasAncestor(rangeTraverse.getEndContainer(),'.ilo'))
		{
			if(textStyle=="italic"||($(startNode).parents(':header').size()==0&&$(endNode).parents(':header').size()==0))
			{
				return true;
			}
		}
		
		return false;
	}
	
	// DESC: Highlight the appropriate button when the cursor is in an area that is styled
	// RETURNS: void
	this.styleHighlighting = function()
	{
		startNode = rangeTraverse.getStartContainer();
		endNode = rangeTraverse.getEndContainer();
	
		if($(startNode).parents().css('fontWeight')=='bold'&&$(endNode).parents().css('fontWeight')=='bold')
		{
			$('#bold').addClass('CPselected');
		}
		else
		{
			$('#bold').removeClass('CPselected');
		}
		
		if($(startNode).parents().css('fontStyle')=='italic'&&$(endNode).parents().css('fontStyle')=='italic')
		{
			$('#italic').addClass('CPselected');
		}
		else
		{
			$('#italic').removeClass('CPselected');
		}
		
		if($(startNode).parents().css('textDecoration')=='underline'&&$(endNode).parents().css('textDecoration')=='underline')
		{
			$('#underline').addClass('CPselected');
		}
		else
		{
			$('#underline').removeClass('CPselected');
		}
	}
	
	// DESC: Alter button highlighting based on button pushes
	// RETURNS: void
	this.toggleStyleHighlighting = function()
	{
		endNode = rangeTraverse.getEndContainer();
	
		if($(endNode).parents().css('fontWeight')=='bold')
		{
			$('#bold').addClass('CPselected');
		}
		else
		{
			$('#bold').removeClass('CPselected');
		}
		
		if($(endNode).parents().css('fontStyle')=='italic')
		{
			$('#italic').addClass('CPselected');
		}
		else
		{
			$('#italic').removeClass('CPselected');
		}
		
		if($(endNode).parents().css('textDecoration')=='underline')
		{
			$('#underline').addClass('CPselected');
		}
		else
		{
			$('#underline').removeClass('CPselected');
		}
	}
	
	// DESC: Pre-loads the equation editor to avoid button loading when the equation editor lightbox is activated
	// RETURNS: void
	this.preloadEquationEditor = function()
	{
		$('body').first().append('<div id="tempEquationEditor"><ul></ul></div>');
		$('#tempEquationEditor ul').append('<li><div id="equationButtonLocation"></div></li>');
		$('#tempEquationEditor ul').append('<li><textarea id="equationText" rows="3" cols="40"></textarea></li>');
		$('#tempEquationEditor ul').append('<li><div id="equationImageHolder"><img id="equationImage" align = "middle" /></div></li>');
		
		var editorOptions = {'buttons':[
											['sum','sum_limits','product','product_limits','coproduct','coproduct_limits','integral','line_integral','line_int_limits',
											 'double_integral','limit'],
											['square_root','nth_root','exponent','base','base_exponent','bounds'],
											['fraction','diff_frac','partial_fraction','sqr_partial_frac'],
											['intersection','var_intersection','union','var_union'],
											['times','plus_minus','minus_plus','asterisk','division','setminus','amalgamation','dagger','double_dagger','wr','diamond','cap',
											 'cup','square_cap','square_cup','wedge','vee','triangle','triangle_down','triangle_left','triangle_right','circle','bullet','cdot',
											 'star','ominus','om_slash','oplus','otimes','odot','union_plus','big_sqr_cup','forall','exists','top'],
											['horizontaldots','verticaldots','diagonaldots'],
											['real','imaginary','Nmath','Pmath','Qmath','Imath','Rmath','Cmath','emptyset'],
											['subset','subseteq','supset','supseteq','sqsubseteq','ni','in','notin'],
											['sin','cos','tan','csc','sec','cot','arcsin','arccos','arctan','mod','log','ln'],
											['dot','hat','check','grave','acute','tilde','bar','ddot','breve','vec','degrees'],
											['wide_tilde','wide_hat','over_right_arrow','under_right_arrow','over_left_arrow','under_left_arrow','overline','underline','overbrace','underbrace'],
											['left_arrow','Left_arrow','right_arrow','Right_arrow','left_right_arrow','left_harpoon_up','left_harpoon_down','right_harpoon_up',
											 'right_harpoon_down','rightleft_harpoons','maps_to','overset_left_arrow','undrset_left_arrow','overset_right_arrow',
											 'underset_right_arrow','overset','underset'],
											['parentheses','curly_brackets','text_curly_left','text_curly_right','square_brackets','floor_brackets','ceiling_brackets',
											 'angle_brackets','pipe','text_pipes',],
											['parentheses_matrix','matrix','pipe_matrix','double_pipe_matrix','left_pipe','right_pipe','sqr_bracket_matrix','curly_matrix','binom',
											 'cases','align_eqs'],
											['alpha','beta','gamma','delta','epsilon','zeta','eta','theta','iota','kappa','lambda','mu','nu','xi','omicron','pi','rho','sigma',
											 'tau','upsilon','phi','chi','psi','omega','varepsilon','vartheta','varpi','varsigma','varphi','varrho','Gamma','Theta','Xi','Sigma',
											 'Phi','Omega','Delta','Lambda','Pi','Upsilon','Psi','partial','infinity'],
											['<','>','=','not_equal','sim','approx','less_equal','great_equal','precise','precise_equal','succ','succ_eq','ll','gg','smile',
											 'frown','mid','models','vdash','dashv','perp','parallel','equivalent','doteq','sim_eq','congruous','proportional_to','bowtie'],
											['thin_space','medium_space','thick_space','negative_space']
									   ],
							  'buttonLocation':document.getElementById('equationButtonLocation'),
							  'menuButtonsPerRow':9,
							  'callback':function(){$('#tempEquationEditor').css('position','fixed').css('visibility','hidden');}
							 };
		
		newEquationEditor = new equationEditor($('#equationText')[0],$('#equationImageHolder')[0],editorOptions);
	}
    
    // DESC: Pre-loads the chemical equation editor to avoid button loading when the chemical equation editor lightbox is activated
	// RETURNS: void
	this.preloadChemicalEquationEditor = function()
	{
		$('body').first().append('<div id="tempChemicalEquationEditor"><ul></ul></div>');
		$('#tempChemicalEquationEditor ul').append('<li><div id="chemicalEquationButtonLocation"></div></li>');
		$('#tempChemicalEquationEditor ul').append('<li><textarea id="chemicalEquationText" rows="3" cols="40"></textarea></li>');
		$('#tempChemicalEquationEditor ul').append('<li><div id="chemicalEquationImageHolder"><img id="chemicalEquationImage" align = "middle" /></div></li>');
		
		var editorOptions = {'buttons':[
											'chem_subscript',
                                            'chem_superscript',
                                            'right_arrow',
                                            'rightleft_harpoons',
                                            'chem_under_right_arrow'
									   ],
							  'buttonLocation':document.getElementById('chemicalEquationButtonLocation'),
							  'menuButtonsPerRow':9,
							  'callback':function(){$('#tempChemicalEquationEditor').css('position','fixed').css('visibility','hidden')},
                              'italics':false
							 };
		
		newChemicalEquationEditor = new equationEditor($('#chemicalEquationText')[0],$('#chemicalEquationImageHolder')[0],editorOptions);
	}
    
    // DESC: fixes background color issues when something is pasted into another area with a different background color or when backspaced
    //       into an area of a different color
    // RETURNS: void
    this.fixBackgroundColor = function()
    {
        $('div#content *').css({'background-color':''});
    }
    
    // DESC: puts spans and text nodes that are "hanging" in .infoBox and section elements in paragraph elements
    // RETURNS: void
    this.cleanAfterPaste = function()
    {
        var adjacentElements = new Array();
        function replaceHangingElements(element)
        {
            $(element).contents().each(function(index,value)
            {
                if(value.nodeType==3||$(value).is('span'))
                {
                    adjacentElements.push(value);
                }
                else if(adjacentElements.length>0)
                {
                    var replicateElements = $(adjacentElements).clone();
                    var newParagraph = $('<p></p>');
                    newParagraph.append(replicateElements);
                    var jqueryElements = $(adjacentElements);
                    jqueryElements.not(':first').remove();
                    jqueryElements.replaceWith(newParagraph);

                    adjacentElements = $();
                }
            });
        }
        
        replaceHangingElements('div#content>section');
        
        $('#content .infoBox').each(function(i,val)
        {
            replaceHangingElements(val);
        });
    }
    
    if($('#content>section').size()>0)
    {
        $('#content>section')[0].contentEditable = true;
    }
    
	$('.ilo, h1').attr('contenteditable',false);
	
	if($('#content>section').children().size()==1)
	{
		$('<p></p>').insertAfter('#content>section>h1');
	}
    
    // Paste event
    $('#content').bind('paste',function()
    {
        contentState.saveState();
        setTimeout(thisObject.fixBackgroundColor,10);
        setTimeout(thisObject.cleanAfterPaste,11);
        setTimeout(contentState.saveState,12);
    });
	
	// Creates undo / redo functionality
	contentState = new ContentState();
	
	// Capture Ctrl + [Letter] functions
	keypressed = new Array();
	keypressed['ctrl'] = false;
	keypressed['alt'] = false;
	keypressed['shift'] = false;
	
	var listItemMarkedForRemoval = false;
	
    $('body').bind('keyup', function(e)
    {
        currentHandler.handleContentEvent(e);
    });
    
	$('#content').bind('keydown click',function(e)
	{
		currentHandler.handleContentEvent(e);
	});
	
	$('.ilo').unbind('mousedown mouseup mousemove mouseout');
	
	$('.ilo').live('mousedown',function(e)
	{
		e.preventDefault();
	});
	
	$('.ilo').live('click',function(e)
	{
		currentHandler.handleContentEvent(e);
	});
	
	$('#CPtoolbar').mousedown(function(e)
	{
		e.preventDefault();
	});
	
	// Save initial state for undo
	MathJax.Hub.Queue(function()
	{
		contentState.saveState();
	});
	
	// Insert Blockquote
	$('#insertBlockquote').click(function()
	{
		thisObject.insertBlockquote();
	});
	
	// Insert lists or tables
	$('#insertOrderedList').click(function()
	{
		thisObject.insertList('ordered');
	});
	
	$('#insertUnorderedList').click(function()
	{
		thisObject.insertList('unordered');
	});
	
	$('#insertTable').click(function()
	{
		if(rangeTraverse.within('#content'))
		{
			thisObject.createInsertTableLightBox();
		}
	});
    
    $('#deleteTable').click(function()
    {
        thisObject.deleteTable();
    })
	
	// Insert Equation	
	$('#insertEquation').click(function()
	{
		equation.editMode();
	});
    
    // Insert Chemical Equation	
	$('#insertChemicalEquation').click(function()
	{
		chemicalEquation.editMode();
	});
	
	// Insert Graph
	$('#insertGraph').click(function()
	{
		graph.editMode();
	});
	
	// Insert Image
	$('#insertImage').click(function()
	{
		staticimage.editMode();
	});
    
    // Set Content Provider Tooltips
    $("span.CPsublist>li[title]").tooltip({position: "bottom center", opacity: 0.85, layout: '<div></div>', onBeforeShow: function()
    {
        var tooltip = this.getTip();
        var paragraph = $('<table><tbody><tr><td vertical-align="middle"><p></p></td></tr></tbody></table>');
        paragraph.find('p').append(tooltip.text());
        tooltip.empty();
        tooltip.append(paragraph);
        
    }, events:
    {
        tooltip: ",mouseenter mouseleave"
    }});
    
	// Style except when within equations or when equations are highlighted 
	$('#bold,#italic,#underline').click(function(){thisObject.formatTextStyle($(this).attr('id'))});
    
	ilo.checkForRepeatILOs();
}