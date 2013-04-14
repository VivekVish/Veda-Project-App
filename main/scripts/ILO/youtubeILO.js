////////////////////////////////////////////////////////////////
// The youtubeILO class handles the display of youtube        //
// videos ILOs as well as events from users but not from      //
// content providers.  				              //
//                                                            //
// REQUIRES: jQuery				              //
////////////////////////////////////////////////////////////////

var youtubeILO =
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
        $(targetImage).children().remove();
        $(targetImage).append('<iframe width="560" height="315" src="http://www.youtube.com/embed/'+imageData.video+'" frameborder="0" allowfullscreen></iframe>');
    }
}