$(document).ready(function()
{
    baseContent = new Content();
});

// DESC: displays each ILO on the page
// RETURNS: void
Content.prototype.refreshILOs = function()
{
    $('.ilo').each(function(index)
    {
        eval($(this).attr('data-ilotype')+'ILO.display(this)');
    });
}

// DESC: displays citations in bibliography and properly orders them
// RETURNS: void
Content.prototype.refreshCitations = function()
{
    $('div#bibliography').empty();
    $('.citation').empty();

    $('.citation').each(function(index)
    {
        if(index==0)
        {
            $('div#bibliography').append('<h2>Bibliography</h2><ol></ol>');
        }

        $(this).text(parseInt(index)+1);
        // Remove non-italics, non-bold, and non-underline text
        var tempParagraph = $('<p>').append(citations.citationArray[$(this).attr('id')]);
        tempParagraph.find('*:not(i,b,u)').remove();
        var citationText = tempParagraph.remove().html();
        $('div#bibliography ol').append('<li data-citationid="'+$(this).attr('id')+'">'+citationText+'</li>');
    });
}

function Content()
{
    $('#content>section>h1').remove();
    $('#content>section').prepend("<h1>"+$('#content').attr('data-name')+"</h1>");
    $('#content>section').after('<div id="bibliography"></div>');
	
	// Fix Chrome / Safari text area height issue
	if($.browser.webkit)
	{
		$('#notebar textarea').css({'height':this.windowHeight * 0.9});
	}
    
    // Notebar Resizing
	$('#notebar').resizable({handles: 'w'});
	$('#notebar').bind("resize", 
		function(event,ui)
		{
			if(event.pageX > $(window).width() * 0.4)
			{
				$('#notebar').css('left',event.pageX);
				$('#notebar').width($(window).width() - $('#notebar').position().left - 3);
			}
			else
			{
				$('#notebar').css('left',$(window).width() * 0.4);
				$('#notebar').width($(window).width() - $('#notebar').position().left - 3);
			}
			
			var newSize = $('#notebar').position().left - $('#content').position().left;
			$('#content').width(newSize);
			$('footer').width(newSize);
			$('#usernav').width(newSize);
			$('#pagenav').width(newSize);
		});
	$('#notebar').bind("resizestop",
		function(event,ui)
		{
			if($('#notebar').width() < parseInt($(window).width() * 0.05))
			{
				$('#notebar').css('left',$(window).width());
				var newSize = $('#notebar').position().left - $('#content').position().left;
				$('#content').width(newSize);
				$('footer').width(newSize);
				$('#usernav').width(newSize);
			}
		});
    
    
	$('.ilo').bind('mousedown mouseup mousemove mouseout',function(e)
	{
		eval($(this).attr('data-ilotype')+'ILO.handleUserEvent(e)');
	});
	
    var iloIdArray = new Array();
    
    $('.ilo').each(function(index)
    {
        iloIdArray.push($(this).attr('id'));
    });
    
    var citationIdArray = new Array();
    
    $('.citation').each(function(index)
    {
        citationIdArray.push($(this).attr('id'));
    });
    // Display ILOs
	ILOContents.getILOArray(iloIdArray,this.refreshILOs);
    // Display Citations
    citations.getCitations(citationIdArray, this.refreshCitations);
    
    var citationsArray = new Array();
    
    // DESC: loads citations using AJAX
    // RETURNS: void
    this.loadCitations = function()
    {
        $('.citation').each(function()
        {
            citationsArray.push($(this).attr('id'));
        });
    }
}