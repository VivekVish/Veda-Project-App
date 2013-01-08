/* Create Lightbox */
function createLightBox(lightBoxTarget, lightBoxTitle, lightBoxContent, lightBoxWidth, lightBoxHeight)
{
    $('<div id="overlay"></div>')
            .appendTo($(lightBoxTarget))
            .css({'opacity':'0'})
            .animate({'opacity': '0.6'});
		
    $('<div id="lightbox"><div><h4>'+lightBoxTitle+'</h4></div></div>')
    .appendTo('body');

    $('#lightbox>div>h4').after(lightBoxContent);

    if(typeof(lightBoxWidth) != 'undefined')
    {
        $('#lightbox').width(lightBoxWidth);
    }

    if(typeof(lightBoxHeight) != 'undefined')
    {
        $('#lightbox').height(lightBoxHeight);
    }
    
    $('#lightbox').css('font-size',window.WINDOWHEIGHT/55);

    centerLightBox();
    window.getSelection().removeAllRanges();
    $('#lightbox').fadeIn();
}

/* Recenters the lightbox div */
function centerLightBox()
{
    if($('#lightbox').height()>$(window).height())
    {
        $('#lightbox').height($(window).height());
    }
    
    if($('#lightbox').width()>$(window).width())
    {
        $('#lightbox').width($(window).width());
    }
    
	var top = ($(window).height() - $(window).scrollTop()*2 - $('#lightbox').height()) / 2;
	var left = ($(window).width() - $('#lightbox').width()) / 2;
    
    
	
	$('#lightbox')
	.css(
	{
	'top': top + $(document).scrollTop(),
	'left': left
	});
}