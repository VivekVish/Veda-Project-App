
var youtube =
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
        console.log(targetImage);
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
	
        insertionPoint = rangeTraverse.parents('p,.ilo,:header,table,ul,li')[0];
        
        if(typeof(targetImage) == 'undefined')
        {
            if((!rangeTraverse.within('#content')))
            {
                return;
            }
            var currentRange = rangeTraverse.getCurrentRange();
        }
		
        createLightBox('html','Youtube Video Insert','<div id="youtubeVideoForm">'+youtube.youtubeForm+'</div>');

        function createVideo(targetImage)
        {
            youtube.createImageStarted = true;
            var ILOArray = {'type':'youtube','video':$('#videoInput').val()};
            
            function afterILOCreation()
            {
                youtubeILO.display(targetImage);

                delete ILOContents.ILOArray['ilo-1'];

                $('#lightbox').fadeOut('fast',function() {$(this).remove();});
                $('#overlay').fadeOut('fast',function() {$(this).remove();});
            }
            
            console.log($('#content').find(targetImage).size());
            if(typeof(targetImage) == 'undefined' || $('#content').find(targetImage).size()==0)
            {
                var targetImage = document.createElement('div');
                
                ilo.insertILO(insertionPoint,targetImage,'after');
                ilo.createILO(targetImage,ILOArray,afterILOCreation,function(targetImage){youtube.createImageStarted = false;$(targetImage).remove();}, [targetImage]);
            }
            else
            {
                console.log('got here');
                ilo.editILO($(targetImage).attr('id'),ILOArray,afterILOCreation, function(){youtube.createImageStarted = false;});
            }
        }

        $('#btnSetVideo').click(function()
        {
            createVideo(targetImage);
        });
        
        $('#btnCancelSetVideo').click(function() 
        {
            cancel();
        });
		
        $('#videoInput').focus();
    }
    
    
}