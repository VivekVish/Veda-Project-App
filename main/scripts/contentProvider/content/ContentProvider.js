ContentProvider.prototype = new BaseProvider();
ContentProvider.prototype.constructor = ContentProvider;
ContentProvider.prototype.parent = new BaseProvider();

ContentProvider.prototype.savedChanges=true;

// DESC: Opens the lightbox that either inserts an infobox or adjusts the infobox type
// RETURNS: void
ContentProvider.prototype.openInfoBoxLightbox = function()
{
    var thisObject = this;
    
    var caretPositionRange = rangeTraverse.getCurrentRange();
    var insertInfoBoxBox = $('<div id="insertInfoBoxBox"><ul></ul></div>');
    insertInfoBoxBox.children('ul').append('<li><select></select></li>');
    insertInfoBoxBox.find('ul>li>select').append('<option value="definition">Definition</option>').
                                          append('<option value="theorem">Theorem</option>').
                                          append('<option value="warning">Warning</option>').   
                                          append('<option value="information">Information</option>').
                                          append('<option value="teacher">Teacher\'s Manual</option>');
    insertInfoBoxBox.children('ul').append('<li><button class="cancel">Cancel</button><button class="create">Create</button></li>');

    if($(caretPositionRange.startContainer).parents('.infoBox').size()==0)
    {
        createLightBox('html','Create Info Box',insertInfoBoxBox);

        $('#insertInfoBoxBox button.create').click(function()
        {
            thisObject.insertInfoBox($('#insertInfoBoxBox').find('select').val(),caretPositionRange);
            $('#lightbox').fadeOut('fast',function() {$(this).remove();});
            $('#overlay').fadeOut('fast',function() {$(this).remove();});
        });
    }
    else
    {
        createLightBox('html','Change Info Box',insertInfoBoxBox);

        $('#insertInfoBoxBox button.create').click(function()
        {
            thisObject.changeInfoBoxType($('#insertInfoBoxBox').find('select').val(),$(caretPositionRange.startContainer).parents('.infoBox').first());
            $('#lightbox').fadeOut('fast',function() {$(this).remove();});
            $('#overlay').fadeOut('fast',function() {$(this).remove();});
        });
    }

    $('#insertInfoBoxBox button.cancel').click(function()
    {
        $('#lightbox').fadeOut('fast',function() {$(this).remove();});
        $('#overlay').fadeOut('fast',function() {$(this).remove();});
    });
}

// DESC: Inserts a div box at the current cursor level
// PARAMETER: boxType is the type of box that will be inserted
// PARAMETER: caretPositionRange is the range that contains the caret Position for the added box
// RETURNS: void
ContentProvider.prototype.insertInfoBox = function(boxType,caretPositionRange)
{
    var thisObject = this;
    
    if($(caretPositionRange.startContainer).parents('#content').size()>0&&$(caretPositionRange.startContainer).parents('.infoBox').size()==0)
    {
        var properStartPosition = false;

        var insertNodeLocation = $(caretPositionRange.startContainer).parents('p,ul,ol,blockquote,table').last();
        if(insertNodeLocation.size()==0&&$(caretPositionRange.startContainer).is('p,ul,ol,blockquote,table'))
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
            var newDiv = $('<div class="infoBox" data-infoboxtype="'+boxType+'"><p></p></div>');

            var toEndOfStartNode = caretPositionRange;				
            toEndOfStartNode.setEndAfter(insertNodeLocation[0]);
            insertNodeLocation.after(toEndOfStartNode.extractContents());
            insertNodeLocation.after(newDiv);

            rangeTraverse.selectBefore($(newDiv).find('p')[0]);
            contentState.saveState();
            thisObject.toggleExitInfoBoxButton();
        }
    }
}

// DESC: Adds a paragraph after the info box
// RETURNS: void
ContentProvider.prototype.exitInfoBox = function()
{
    if(rangeTraverse.within('.infoBox'))
    {
        var newParagraph = $('<p></p>');
        rangeTraverse.parents('.infoBox').first().after(newParagraph);
        rangeTraverse.selectBefore(newParagraph[0]);
    }
}

// DESC: Changes infoBox's data-infoboxtype attribute to boxType
// PARAMETER: boxType is the type of box that
// PARAMETER: caretPositionRange is the range that contains the caret Position for the added box
// RETURNS: void
ContentProvider.prototype.changeInfoBoxType = function(boxType,infoBox)
{
    if(infoBox.hasClass('infoBox'))
    {
        infoBox.attr('data-infoboxtype',boxType);
    }
}

// DESC: Inserts a header at the current cursor level
// PARAMETER: level is an integer indicating the header level of the section to be added
// RETURNS: void
ContentProvider.prototype.insertSection= function(level)
{
    if(rangeTraverse.within('#content'))
    {
        var newHeader = $('<h'+(eval(level)+1)+'>');
        var rangeParent = rangeTraverse.parents(':header,blockquote,table,ol,ul,p').last();

        if(rangeParent.children().size()==0&&rangeParent.text()=="")
        {
            rangeParent.replaceWith(newHeader.text("Section Header"));
            rangeTraverse.selectNode(newHeader[0]);
        }
        else if(rangeTraverse.within(':header'))
        {
            var replaceText = rangeTraverse.parents(':header').text();
            rangeTraverse.parents(':header').replaceWith(newHeader.append(replaceText));
            rangeTraverse.selectAfter(newHeader[0]);
        }
        else if(rangeTraverse.within('p,blockquote'))
        {
            var startNode = rangeTraverse.getStartContainer();
            var startToEndElemRange = rangeTraverse.getCurrentRange();
            startToEndElemRange.deleteContents();

            paragraph = rangeTraverse.parents('p,blockquote');
            startToEndElemRange.setEndAfter(paragraph[0]);
            paragraphContents = startToEndElemRange.extractContents();

            paragraph.after(paragraphContents).after(newHeader.text("Section Header"));

            rangeTraverse.selectNode(newHeader[0]);
        }
    }
}

// DESC: Toggle the display of the exit info box button based on whether the cursor is in an info box
// RETURNS: void
ContentProvider.prototype.toggleExitInfoBoxButton = function()
{
    if(rangeTraverse.within('.infoBox'))
    {
        $('#exitInfoBox').show();
    }
    else
    {
        $('#exitInfoBox').hide();
    }
}

// DESC: Gets payload for a submit or autosave
// RETURNS: Object literal including path, content, and ILOs
ContentProvider.prototype.getPayload = function()
{
    ilo.checkForRepeatILOs();

    var tempILOArray = $.extend({},ILOContents.ILOArray);
    delete tempILOArray['ilo-1'];
    var tempCitationsArray = $.extend({},citations.citationArray);

    $('div#bibliography li').each(function(index)
    {
        if($('#'+$(this).attr('data-citationid')).size()==0)
        {
            delete tempCitationsArray[$(this).attr('data-citationid')];
        }
    });

    contentClone = $('#content>section').first().clone();
    contentClone.find('.ilo').empty();
    contentClone.find('.citation').empty();
    contentClone.children('h1').remove();
    var contentHTML = contentClone.wrap('<div></div>').parent().html();
    var locationArray = $('#content').attr('data-location').replace(/^\/data\/material\/|\/$/g,'').split('/');
    contentClone.parent().remove();
    var contentPayload = {lesson: locationArray[4], section:locationArray[3],course:locationArray[2], subject:locationArray[1],field:locationArray[0],content:contentHTML,ilos:tempILOArray,citations:tempCitationsArray};

    return contentPayload;
}

// DESC: Calls the parent construct function and sets event handlers
// RETURNS: void
ContentProvider.prototype.construct = function()
{
    this.parent.construct();
    var thisObject = this;
    
    // Style drop down menu
	var insertSectionLeft = $('#CPtoolbar #insertSection').position().left;
	$('#CPtoolbar ul ul').css('left',insertSectionLeft);
	
	this.preloadEquationEditor();
    this.preloadChemicalEquationEditor();
    
    // Section Modifiers
	$('#insertSection ul li').click(function()
	{
		thisObject.insertSection($(this).attr('data-level'));
	});
    
    // Insert Info Box Button
    $('#insertInfoBox').click(function()
    {
        thisObject.openInfoBoxLightbox();
    });
    
    // Exit Info Box Button
    $('#exitInfoBox').click(function()
    {
        thisObject.exitInfoBox();
    })
    
    $("#insertSection *[title]").tooltip({
      show: "false",
      hide: "false",
      position: {
        my: "left+5 center",
        at: "right center"
      },
      content: function()
      {
          return "<p>"+$(this).attr('title')+"<p>";
      },
      open: function(e,ui)
      {
          if($(ui.tooltip[0]).find('.ui-tooltip-content>p').height()>40)
          {
              $(ui.tooltip[0]).addClass('bigTooltip');
          }
      }
    });
    
    // The following removes overlays that were added when people submitted lessons with a lightbox active
    $('#lightbox').remove();
    $('#overlay').remove();
}

function ContentProvider()
{

}
