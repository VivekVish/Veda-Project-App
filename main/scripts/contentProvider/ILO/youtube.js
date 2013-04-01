
var youtubevideo =
{
    // DESC: createImageStarted is set to true if a image has started to be created
    createImageStarted: false,
    
    // DESC: the html for the image upload form
    youtubeForm: '<label for="videoInput">Video Input</label><input id="videoInput"/>'+
        '<button id="btnSetVideo" class="yesbutton">Set Video</button><button id="btnCancelSetVideo"   class="cancel">Cancel</button>'
                     ,
	// DESC: creates a lightbox in which the content provider can edit or add an image
	// PARAMETER: targetImage is the ILO to be edited.  If it is undefined, a new ILO will be added after the start container of the caret position
	// RETURNS: void
	editMode: function(targetImage)
	{
        function cancel()
        {
            delete ILOContents.ILOArray['ilo-1'];
            $('#lightbox').fadeOut('fast',function() {$(this).remove();});
            $('#overlay').fadeOut('fast',function() {$(this).remove();});
            rangeTraverse.setCurrentRange(currentRange);
        }
        
		ilo.checkForRepeatILOs();
        var imageData = ILOContents.ILOArray[$(targetImage).attr('id')];
		
		if($('#lightbox').size()>0) 
		{
			return;	
		} 
		
		if(typeof(targetImage) == 'undefined')
		{
			if((!rangeTraverse.within('#content')))
			{
				return;
			}
			insertionPoint = rangeTraverse.parents('p,.ilo,:header,table,ul,li')[0];
            var currentRange = rangeTraverse.getCurrentRange();
		}
		
		createLightBox('html','Youtube Video Insert','<div id="youtubeVideoForm">'+youtubevideo.youtubeForm+'</div>');
        
        $('#btnSetVideo').click(function() {
            insertionPoint = rangeTraverse.parents('p,.ilo,:header,table,ul,li')[0];
            ilo.insertILO(insertionPoint,targetImage,'after');
        });
        
        $('#btnCancelSetVideo').click(function() {
            alert('yeehow');
        });
		
        $('#videoInput').focus();
	}
    
    
}