////////////////////////////////////////////////////////////////
// The staticimageILO class handles the display of static     //
// image ILOs as well as events from users but not from       //
// content providers.  					      //
//							      //
// REQUIRES: jQuery					      //
////////////////////////////////////////////////////////////////

var staticimageILO =
{
    // DESC: handles events from the user
    // PARAMETER: e is the event being passed
    // RETURNS: void
    handleUserEvent: function(e)
    {

    },
    
    // DESC: displays an individual image
    // PARAMETER: targetImage is the image to be displayed
    // RETURNS: void
    display: function(targetImage)
    {
        var imageData = ILOContents.ILOArray[$(targetImage).attr('id')]
        $(targetImage).children('div').remove();
        $(targetImage).attr('data-position',imageData['attributes']['position']);
        $(targetImage).attr('data-frame',imageData['attributes']['frame']);

        newFigure = $('<figure></figure>').append('<img src="img/contentImages/'+imageData['content']['file']+'" \\>');
        if($(targetImage).attr('data-frame')=='frame')
        {
            newFigure.append('<figcaption>'+$('<div />').html(imageData['content']['caption']).remove().text()+'</figcaption>');
        }
        $(targetImage).append('<div class="imageFrame" data-position="'+imageData['attributes']['position']+'"></div>').children('div').append(newFigure);
        if(typeof(imageData['attributes']['width'])!="undefined"&&imageData['attributes']['width']!="")
        {
            $(targetImage).find('img')[0].width = imageData['attributes']['width'] * ($('#content').width()-parseInt($('#content>section').css('padding-left'))-parseInt($('#content>section').css('padding-right'))-parseInt($(targetImage).children('.imageFrame').css('padding-left'))-parseInt($(targetImage).children('.imageFrame').css('padding-right')));
        }

        $(targetImage).children('div').width($(targetImage).find('img')[0].width);
        $(targetImage).width($(targetImage).children('div').width()+
                                                 parseFloat($(targetImage).children('div').css('padding-left'))+
                                                 parseFloat($(targetImage).children('div').css('padding-right'))+
                                                 parseFloat($(targetImage).children('div').css('border-left-width'))+
                                                 parseFloat($(targetImage).children('div').css('border-right-width')));
    }
}