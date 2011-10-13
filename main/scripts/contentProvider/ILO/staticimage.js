////////////////////////////////////////////////////////////////
// The staticimage namespace receives and processes events    //
// from rangeTraverse.  When the image is clicked, the  	  //
// image is highlighted, and users have the option of editing //
// or deleting the image.							  		  //
//															  //
// REQUIRES: jQuery 										  //
////////////////////////////////////////////////////////////////

var staticimage =
{
    imageUploadForm: '<form action="resources/imageUpload.php" method="post" name="unobtrusive" id="unobtrusive" enctype="multipart/form-data">'+
							'<p><input type="file" name="filename" id="imageFilename" value="filename" /></p>'+
                            '<input type="text" name="imageName" id="imageName" />'+
                            '<button id="uploadImage" type="submit">Upload Image</button>'+
                     '</form>',
	// DESC: creates a lightbox in which the content provider can edit or add an image
	// PARAMETER: targetImage is the ILO to be edited.  If it is undefined, a new ILO will be added after the start container of the caret position
	// RETURNS: void
	editMode: function(targetImage)
	{
		ilo.checkForRepeatILOs();
		var imageData = ILOContents.ILOArray[$(targetImage).attr('id')];
		
        function adjustLightBoxImageSize(img,imageHeight,imageWidth)
        {
            if(typeof(imageHeight)=='null'||typeof(imageWidth)=='null')
            {
                imageHeight = img.height;
                imageWidth = img.width;
            }

            var arbVal1 = imageHeight*parseInt($('#imageEditorHolder>div').css('width'));
            var arbVal2 = imageWidth*parseInt($('#imageEditorHolder>div').css('height'));
            var imgHolderHeight = $('#imageEditorHolder>div').height();
            var imgHolderWidth = $('#imageEditorHolder>div').width();

            if(imageWidth>imageHeight)
            {
                $(img).height(arbVal1/imageWidth);
                $(img).width(imgHolderWidth);
                $('#imageHolder').width(imgHolderWidth);
                $('#imageHolder').height(arbVal1/imageWidth+$('#imageHolder figcaption').height());
            }
            else
            {
                $(img).width(arbVal2/imageHeight);
                $(img).height(imgHolderHeight);
                $('#imageHolder').width(arbVal2/imageHeight);
                $('#imageHolder').height(imgHolderHeight+$('#imageHolder figcaption').height());
            }
         }
        
		function replaceLightBoxImage(imgFilename)
		{
            $('#imageHolder figure img').remove();
            
            if(imgFilename=="")
            {
                $('#imageHolder').height($('#imageHolder figcaption').height());
            }
            else
            {
                $('#imageHolder').attr('data-imagefile',imgFilename);
                $('#imageHolder figure').prepend('<img src="../img/contentImages/'+imgFilename+'" \\>');
                var img = $('#imageHolder').find('img');
                
                img.css('visibility','hidden');
                
                if($.browser!="mozilla")
                {
                    img[0].imgHeight = img[0].height;
                    img[0].imgWidth = img[0].width;
                }

                img.load(function(e)
                {
                    adjustLightBoxImageSize(this,this.imgHeight,this.imgWidth);
                    $(this).css('visibility','visible');
                });
            }
		}
		
		function replaceLightBoxCaption(newCaption)
		{
			$('#imageHolder figure figcaption').html(newCaption);
            
            var img = $('#imageHolder').find('img');
            if(img.size()>0)
            {
                if($.browser!="mozilla")
                {
                    img[0].imgHeight = img[0].height;
                    img[0].imgWidth = img[0].width;
                }
                
                adjustLightBoxImageSize(img,img[0].imgHeight,img[0].imgWidth);
            }
            else
            {
                $('#imageHolder').height($('#imageHolder figcaption').height());
            }
		}
		
		function checkValidWidth()
		{
			if($('#imageWidth').val()>100)
			{
				$('#imageWidth').val(100);
			}
			else if($('#imageWidth').val()<5)
			{
				$('#imageWidth').val(5);
			}	
		}
		
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
		}
		
		createLightBox('#content','Image Editor','<div id="imageEditorHolder"><div><div id="imageHolder"></div><div id="imageInfoHolder"></div></div></div>');
		$('#imageInfoHolder').append('<h5>Image Properties</h5>');
		$('#imageInfoHolder').append('<ul><li></li></ul>');
		$('#imageInfoHolder ul').append('<li><label for="imageFilename">File</label>'+staticimage.imageUploadForm+'</li>');
		$('#imageInfoHolder ul').append('<li><label for="imageWidth">Width</label><input id="imageWidth" type="text" maxlength=3 />%</li>');
        $('#imageInfoHolder ul').append('<li><label for="imageIncludeFrame">Include Frame</label><input id="imageIncludeFrame" type="checkbox" value="includeFrame"</li>');
		$('#imageInfoHolder ul').append('<li><label for="imageCaption">Caption</label><textarea id="imageCaption" rows=5 columns=60 /></li>');
		$('#imageInfoHolder ul').append('<li><label>Position</label><input id="leftImagePosition" name="imagePosition" type="radio" value="left" /><label for="leftImagePosition">Left</label>'+
										      '<input id="centerImagePosition" name="imagePosition" type="radio" value="center" /><label for="centerImagePosition">Center</label>'+
											  '<input id="rightImagePosition" name="imagePosition" type="radio" value="right" /><label for="rightImagePosition">Right</label></li>');
		
		$('#imageEditorHolder').append('<div><button class="cancel">Cancel</button><button class="create">Create</button></div>');
		
        $('#imageHolder').append('<figure><figcaption></figcaption></figure>');
        $('label[for="imageCaption"]').css('top',$('#imageCaption').offset().top-$('label[for="imageCaption"]').offset().top);
        
        var positionArray = $('#content').attr('data-location').replace(/^\/data\/material\/|\/$/g,'').split('/');
        var payload = {"field":positionArray[0],"subject":positionArray[1],"course":positionArray[2]};
        
        $('#unobtrusive').ajaxForm({data: payload, success:function(data)
        {
            replaceLightBoxImage(data);
        }});
        
		if(typeof(targetImage)!='undefined')
		{
            
			replaceLightBoxImage(imageData['content']['file']);
			replaceLightBoxCaption(imageData['content']['caption']);
			eval('$("#'+imageData['attributes']['position']+'ImagePosition").attr("checked","checked")');
			$('#imageWidth').val(imageData['attributes']['width']*100);
			$('#imageCaption').val(imageData['content']['caption']);
            
            if(imageData['attributes']['frame']=="none")
            {
                $("#imageIncludeFrame").attr("checked",false);
                $("#imageCaption").attr("disabled",true);
                $("#imageHolder figcaption").remove();
            }
            else
            {
                $("#imageIncludeFrame").attr("checked",true);
                $("#imageHolder").attr("data-frame","frame");
            }
		}
		else
		{
			$("#centerImagePosition").attr("checked",true);
            $("#imageIncludeFrame").attr("checked",true);
            $("#imageHolder").attr("data-frame","frame");
		}
        
        
        
        $("#imageIncludeFrame").change(function(e)
        {
            if($(this).is(':checked'))
            {
                $("#imageCaption").removeAttr("disabled");
                $("#imageHolder figure").append("<figcaption></figcaption>");
                replaceLightBoxCaption($('#imageCaption').val());
                $("#imageHolder").attr("data-frame","frame");
            }
            else
            {
                $("#imageCaption").attr("disabled",true);
                $("#imageHolder figure figcaption").remove();
                $("#imageHolder").attr("data-frame","none");
            }
        });
		
		$('#lightbox').addClass('imageLightbox');
		
		centerLightBox();
		
		$('#imageFilename').blur(function()
		{
			replaceLightBoxImage($('#imageFilename').val());
		});
		
		$('#imageCaption').blur(function()
		{
			replaceLightBoxCaption($('#imageCaption').val());
		});
		
		$('#imageWidth').blur(function()
		{
			checkValidWidth();
		});
		
		var createImageStarted = false;
        
        $('#imageCaption').focus();
        
        
        
        function createImage()
        {
            if(!createImageStarted&&$('#imageHolder').find('img').size()>0)
			{
				createImageStarted = true;
				var ILOArray = '<ilo ilotype="staticimage" width="'+$('#imageWidth').val()/100+'" position="'+$('input[name="imagePosition"]:checked').val()+'" frame="'+$("#imageHolder").attr("data-frame")+'">'+
					   '<file>'+$('#imageHolder').attr('data-imagefile')+'</file>'+
         			   '<imagecaption>'+$('#imageCaption').val()+'</imagecaption></ilo>';
                   
                var ILOArray = {'type':'image','version':'1.0','attributes':{'width':$('#imageWidth').val()/100,'frame':$("#imageHolder").attr("data-frame"),'position':$('input[name="imagePosition"]:checked').val()},'content':{'file':$('#imageHolder').attr('data-imagefile'),'caption':$('#imageCaption').val()}};

				if(typeof(targetImage) == 'undefined')
				{
					targetImage = document.createElement('div');
                    ilo.insertILO(insertionPoint,targetImage,'after');
					ilo.createILO(targetImage,ILOArray);	
				}
				else
				{
					ilo.editILO($(targetImage).attr('id'),ILOArray);
				}
				
				checkValidWidth();
				staticimageILO.display(targetImage);
					
				$('#lightbox').fadeOut('fast',function() {$(this).remove();});
				$('#overlay').fadeOut('fast',function() {$(this).remove();});
			}
        }
        
        function cancel()
        {
            $('#lightbox').fadeOut('fast',function() {$(this).remove();});
			$('#overlay').fadeOut('fast',function() {$(this).remove();});
        }
		
		$('#imageEditorHolder button.create').click(function()
		{
			createImage();
		});
		
		$('#imageEditorHolder button.cancel').click(function()
		{
			cancel();
		});
        
         $('#imageEditorHolder input[type="text"]').keydown(function(e)
        {
            switch(e.keyCode)
            {
                // Enter
                case 13:
                    createGraph();
                    break;
                // Escape
                case 27:
                    cancel();
                    break;
            }
        });
	}
}