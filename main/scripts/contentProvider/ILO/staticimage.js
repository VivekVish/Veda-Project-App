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
							'<ul><li><label for="imageFilename">File</label><input type="file" name="filename" id="imageFilename" value="filename" /></li>'+
                            '<li><label for="imageName">Name</label><input type="text" name="imageName" id="imageName" /></li>'+
                            '<li><label for="imageLicense">License</label><select id="imageLicense" name="imageLicense" /></li>'+
                            '<li><label for="imageCitation">Citation</label><textarea id="imageCitation" name="imageCitation" rows=3 columns=60 /></li>'+
                            '<li><button id="uploadImage" type="submit">Upload Image</button></li></ul>'+
                     '</form>',
	// DESC: creates a lightbox in which the content provider can edit or add an image
	// PARAMETER: targetImage is the ILO to be edited.  If it is undefined, a new ILO will be added after the start container of the caret position
	// RETURNS: void
	editMode: function(targetImage)
	{
		ilo.checkForRepeatILOs();
		var imageData = ILOContents.ILOArray[$(targetImage).attr('id')];
		
        function adjustLightBoxImageSize(img)
        {
            var imageWidth = img.width();
            var imageHeight = img.height();
            var arbVal1 = img.height()*$('#imageEditorHolder>div').first().width();
            var arbVal2 = img.width()*$('#imageEditorHolder>div').first().height();
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
            
            $(img).css('visibility','visible');
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
                $('#imageHolder figure').prepend('<img visibility="hidden" src="../img/contentImages/'+imgFilename+'" />');
                var img = $('#imageHolder').find('img');

                img.load(function(e)
                {
                    setTimeout(function(){adjustLightBoxImageSize($('#imageHolder figure').children('img'))},10);
                });
            }
		}
		
		function replaceLightBoxCaption(newCaption)
		{
			$('#imageHolder figure figcaption').html($('<div />').html(newCaption).remove().text());
            
            var img = $('#imageHolder').find('img');
            if(img.size()>0)
            {
                adjustLightBoxImageSize(img);
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
            else if($('#imageWidth').val()=="")
            {
                $('#imageWidth').val(30);
            }
			else if($('#imageWidth').val()<5)
			{
				$('#imageWidth').val(5);
			}	
		}
        
        function loadCourseImages()
        {
            if($('#courseImages select').children().size()==1)
            {
                var positionArray = $('#content').attr('data-location').replace(/^\/data\/material\/|\/$/g,'').split('/');
                var payload = {"field":positionArray[0],"subject":positionArray[1],"course":positionArray[2]};
                $.ajax({url:'resources/getCourseImages.php', data: payload, success: function(data)
                {
                    try
                    {
                        var courseImages = $.parseJSON(data);
                        $.each(courseImages, function(index,imageRow)
                        {
                            var newOption = $('<option></option>');
                            newOption.attr('value',imageRow.imageId);
                            newOption.html(imageRow.name);
                            $('#courseImages select').append(newOption);
                        });
                    }
                    catch(e)
                    {
                        new Message(data);
                    }
                }});
            }
        }
        
        function loadUserImages()
        {
            if($('#userImages select').children().size()==1)
            {
                $.ajax({url:'resources/getUserImages.php', success: function(data)
                {
                    try
                    {
                        var userImages = $.parseJSON(data);
                        $.each(userImages, function(index,imageRow)
                        {
                            var newOption = $('<option></option>');
                            newOption.attr('value',imageRow.imageId+"."+imageRow.imageType);
                            newOption.html(imageRow.name);
                            $('#userImages select').append(newOption);
                        });
                    }
                    catch(e)
                    {
                        new Message(data);
                    }
                }});
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
		
		createLightBox('#content','Image Editor','<div id="imageEditorHolder"><div><div id="imageHolder"></div><div id="imageTabs"></div><div id="imageInfoHolder"></div></div></div>');
        $('#imageTabs').append('<ul></ul>');
        $('#imageTabs ul').append('<li><a href="#imageUploadForm">Upload Image</a></li>'+
                                  '<li><a href="#courseImages">Course Images</a></li>'+
                                  '<li><a href="#userImages">User Images</a></li>');
        
        $('#imageTabs').append('<div id="imageUploadForm"></div>');
        $('#imageTabs').append('<div id="courseImages"></div>');
        $('#imageTabs').append('<div id="userImages"></div>');
        $('#imageUploadForm').append(staticimage.imageUploadForm);

        $('#courseImages').append('<select><option value="" selected="selected"></option></select>');
        $('#userImages').append('<select><option value="" selected="selected"></option></select>');
        
        $('#courseImages select, #userImages select').change(function(e)
        {
            if($(this).val()!="")
            {
                replaceLightBoxImage($(this).val());
            }
        });
        
        $('#imageTabs').tabs({show: function(e,ui)
        {
            if($(ui.panel).attr('id')=="courseImages")
            {
                loadCourseImages();
            }
            else if($(ui.panel).attr('id')=="userImages")
            {
                loadUserImages();
            }
        }});
        
		$('#imageInfoHolder').append('<h5>Image Properties</h5>');
		$('#imageInfoHolder').append('<ul><li></li></ul>');
		$('#imageInfoHolder ul').append('<li><label for="imageWidth">Width</label><input id="imageWidth" type="text" maxlength=3 />%</li>').
                                 append('<li><label for="imageIncludeFrame">Include Frame</label><input id="imageIncludeFrame" type="checkbox" value="includeFrame"</li>').
                                 append('<li><label for="imageCaption">Caption</label><textarea id="imageCaption" rows=5 columns=60 /></li>').
                                 append('<li><label>Position</label><input id="leftImagePosition" name="imagePosition" type="radio" value="left" /><label for="leftImagePosition">Left</label>'+
										      '<input id="centerImagePosition" name="imagePosition" type="radio" value="center" /><label for="centerImagePosition">Center</label>'+
											  '<input id="rightImagePosition" name="imagePosition" type="radio" value="right" /><label for="rightImagePosition">Right</label></li>');
		
		$('#imageEditorHolder').append('<div><button class="cancel">Cancel</button><button class="create">Create</button></div>');
        
        $('#imageLicense').append('<option value="" selected="selected"></option>').
                           append('<option value="gnu1.0">GNU 1.0</option>').
                           append('<option value="gnu1.1">GNU 1.1</option>').
                           append('<option value="gnu1.2">GNU 1.2</option>').
                           append('<option value="gnu1.3">GNU 1.3</option>').
                           append('<option value="CC">Creative Commons</option>').
                           append('<option value="fairuse">Fair Use</option>').
                           append('<option value="publicdomain">Public Domain</option>');
		
        $('#imageHolder').append('<figure><figcaption></figcaption></figure>');
        $('label[for="imageCaption"]').css('top',$('#imageCaption').offset().top-$('label[for="imageCaption"]').offset().top);
        $('label[for="imageCitation"]').css('top',$('#imageCitation').offset().top-$('label[for="imageCitation"]').offset().top);
        
        var positionArray = $('#content').attr('data-location').replace(/^\/data\/material\/|\/$/g,'').split('/');
        var payload = {"field":positionArray[0],"subject":positionArray[1],"course":positionArray[2]};
        
        $('#unobtrusive').ajaxForm({data: payload, success:function(data)
        {
            try
            {
                var imageData = $.parseJSON(data);
                if("errorCode" in imageData)
                {
                    new Message(data);
                }
                else
                {
                    replaceLightBoxImage(imageData[0]);
                }
            }
            catch(e)
            {
                new Message(data);
            }
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
            $('#imageWidth').val(30);
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
                function afterILOCreation()
                {
                    staticimageILO.display(targetImage);
				
                    delete ILOContents.ILOArray['ilo-1'];

                    $('#lightbox').fadeOut('fast',function() {$(this).remove();});
                    $('#overlay').fadeOut('fast',function() {$(this).remove();});
                }
                
				createImageStarted = true;

                var ILOArray = {'type':'staticimage','version':'1.0','attributes':{'width':$('#imageWidth').val()/100,'frame':$("#imageHolder").attr("data-frame"),'position':$('input[name="imagePosition"]:checked').val()},'content':{'file':$('#imageHolder').attr('data-imagefile'),'caption':$('#imageCaption').val()}};

				if(typeof(targetImage) == 'undefined')
				{
					targetImage = document.createElement('div');
                    ilo.insertILO(insertionPoint,targetImage,'after');
					ilo.createILO(targetImage,ILOArray,afterILOCreation);	
				}
				else
				{
					ilo.editILO($(targetImage).attr('id'),ILOArray,afterILOCreation);
				}
                
				checkValidWidth();
				
			}
        }
        
        function cancel()
        {
            delete ILOContents.ILOArray['ilo-1'];
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