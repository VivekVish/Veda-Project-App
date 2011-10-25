function ContentProvider()
{
    var thisObject = this;
	this.savedChanges=true;
    
    // DESC: Opens paste lightbox
    // RETURNS: void
    this.openPasteLightbox = function()
    {
        if(rangeTraverse.within("#content")&&rangeTraverse.parents('.ilo,:header').size()==0)
        {
            var currentRange = rangeTraverse.getCurrentRange();
            var pasteBox = $('<div id="pasteBox"><ul></ul></div>');
            pasteBox.children('ul').append('<ul><p>Please paste your text here:</p></ul>');
            pasteBox.children('ul').append('<ul><textarea></textarea></ul>');
            pasteBox.children('ul').append('<li><button class="cancel">Cancel</button><button class="create">Paste</button></li>');
            createLightBox('#content','Paste Text',pasteBox);
            $('#pasteBox textarea').focus();

            $('#pasteBox button.create').click(function()
            {
                contentState.saveState();
                var textNode = document.createTextNode($('#pasteBox textarea').val());
                currentRange.deleteContents();
                if($(currentRange.startContainer).is('div,section'))
                {
                    currentRange.insertNode($('<p>').append(textNode)[0]);
                }
                else
                {
                    currentRange.insertNode(textNode);
                }
                $('#lightbox').fadeOut('fast',function() {$(this).remove();});
                $('#overlay').fadeOut('fast',function() {$(this).remove();});
                
                contentState.saveState();
            });

            $('#pasteBox button.cancel').click(function()
            {
                $('#lightbox').fadeOut('fast',function() {$(this).remove();});
                $('#overlay').fadeOut('fast',function() {$(this).remove();});
            });
        }
    }
	
	// DESC: Inserts a header at the current cursor level
	// PARAMETER: level is an integer indicating the header level of the section to be added
	// RETURNS: void
	this.insertSection= function(level)
	{
		if(rangeTraverse.within('#content'))
		{
            var newHeader = $('<h'+(eval(level)+1)+'>');
            var rangeParent = rangeTraverse.parents(':header,blockquote,table,list,p').last();

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
    
    // DESC: Gets payload for a submit or autosave
    // RETURNS: Object literal including path, content, and ILOs
    this.getPayload = function()
    {
        ilo.checkForRepeatILOs();

        var tempILOArray = $.extend({},ILOContents.ILOArray);
        delete tempILOArray['ilo-1'];
        contentClone = $('#content>section').first().clone();
		contentClone.find('.ilo').empty();
        contentClone.children('h1').remove();
		var contentHTML = contentClone.wrap('<div></div>').parent().html();
        var locationArray = $('#content').attr('data-location').replace(/^\/data\/material\/|\/$/g,'').split('/');
        contentClone.parent().remove();
		var contentPayload = {lesson: locationArray[4], section:locationArray[3],course:locationArray[2], subject:locationArray[1],field:locationArray[0],content:contentHTML,ilos:tempILOArray};

        return contentPayload;
    }
    
    // Style drop down menu
	var insertSectionLeft = $('#CPtoolbar #insertSection').position().left;
	$('#CPtoolbar ul ul').css('left',insertSectionLeft);
	
	this.preloadEquationEditor();
    this.preloadChemicalEquationEditor();
	
	
    $('#content').bind('paste',function(e)
    {
        thisObject.openPasteLightbox();
        e.preventDefault();
    });
    
    
    // Section Modifiers
	$('#insertSection ul li').click(function()
	{
		thisObject.insertSection($(this).attr('data-level'));
	});
    
    $("#insertSection *[title]").data('tooltip',null);
    
    $("#insertSection *[title]").tooltip({position: "center right", opacity: 0.85, layout: '<div></div>', onBeforeShow: function()
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
    
    // The following removes overlays that were added when people submitted lessons with a lightbox active
    $('#lightbox').remove();
    $('#overlay').remove();
}
