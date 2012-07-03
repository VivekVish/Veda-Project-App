////////////////////////////////////////////////////////////////
// The LessonPlan object handles all course editing         //
// functionality which includes adding, re-ordering, deleting //
// and renaming lessons and sections as well as recovering    //
// deleted lessons.                                           //
////////////////////////////////////////////////////////////////

$(document).ready(function()
{
	var lessonPlan = new LessonPlan();
    var lessonRepository = new LessonRepository();
});

// DESC: If an action is started, is set to true.  when completed, it is set to false.
//       If actionStarted is true, a new action like a sort cannot start
LessonPlan.prototype.actionStarted = false;

// DESC: Checks if a particular name is a valid lesson or section name
// PARAMETER: nameToCheck is the string of the name of the lesson or section
// RETURNS: boolean, true if name is valid and false if not
LessonPlan.prototype.isNameValid = function(nameToCheck)
{
    return nameToCheck.length>0&&nameToCheck.search(/\//)==-1&&nameToCheck.search(/\&/)==-1;
}

// DESC: Renames a section
// PARAMETER: sectionNameElement is the element that holds the section to be renamed
// PARAMETER: newName is the new section name
// RETURNS: void
LessonPlan.prototype.renameSection = function(sectionNameElement, newName)
{
    var thisObject = this;
    
    if(this.actionStarted === false)
    {
        this.actionStarted = true;
        newName = $.trim(newName);
        thisObject.actionStarted = false;
    }
}

// DESC: Makes adjustments and calls an AJAX function after re-ordering a section
// PARAMETER: sectionItem is the section element that is re-ordered
// RETURNS: void
LessonPlan.prototype.sortSection = function(sectionItem)
{
    
}

// DESC: Makes adjustments and calls an AJAX function after re-ordering a lesson
// PARAMETER: lessonItem is the lesson element that is re-ordered
// RETURNS: void
LessonPlan.prototype.sortLesson = function(lessonItem,oldList)
{
    
}

// DESC: turns a section name into an editable input box for the user to edit
// PARAMETER: sectionItem is the section element to be edited
// RETURNS: void
LessonPlan.prototype.editSectionName = function(sectionItem)
{
    var thisObject = this;
    
    if(this.actionStarted === false)
    {
        this.actionStarted = true;
        var sectionName = sectionItem.text();
        var sectionInput = $('<input type="text" class="sectionName" value="'+sectionName+'" />');
        sectionItem.replaceWith(sectionInput);
        sectionInput.focus();

        $('html').live('mousedown',function(e)
        {
            if($(sectionInput).attr('data-revert')!="true")
            {
                thisObject.renameSection(sectionInput,sectionInput.val());
                $('html').die('mousedown');
            }
        });

        $(sectionInput).bind('keydown',function(e)
        {
            switch(e.keyCode)
            {
                // Tab or Enter
                case 9: case 13:
                    if(sectionInput.size()>0)
                    {
                        sectionInput.blur();
                    }
                    $('html').die('mousedown');
                    break;
               // Escape
               case 27:
                   if(sectionInput.size()>0)
                    {
                        $(this).attr("data-revert","true");
                        $(this).replaceWith('<span class="sectionName">'+sectionName+'</span>');
                    }
                    $('html').die('mousedown');
                    break;
            }
        });

        $(sectionInput).bind('mousedown',function(e)
        {
            e.stopPropagation();
        });
    }

    this.actionStarted = false;
}

// DESC: opens the add section lightbox and handles adding section
// RETURNS: void
LessonPlan.prototype.openAddSectionLightbox = function()
{
    var thisObject = this;
    
    if(this.actionStarted === false)
    {
        this.actionStarted = true;
        var insertSection = $('<div id="insertSectionBox"><ul></ul></div>');
        insertSection.children('ul').append('<li><label for="newSectionName">Section Name</label><input id="newSectionName"></input></li>');
        insertSection.children('ul').append('<li><button class="cancel">Cancel</button><button class="create">Create</button></li>');
        createLightBox('#content','Create Section',insertSection);
        $('#newSectionName').focus();

        function addSection()
        {            
            var newSectionName = $('#newSectionName').val().replace(/_/g,' ');
            var newSectionRow = $('<span></span>');
            newSectionRow.append('<span class="expandedList"></span>')
                         .append('<span class="sectionName">'+newSectionName+'</span>')
                         .append('<span><img class="deleteSectionIcon" src="img/editorIcons/delete_icon.png" /></span>');
            
            $('.sectionList').append($('<li><ul class="lessonList"></ul></li>').prepend(newSectionRow));
            
            $('.lessonList').sortable({connectWith: '.lessonList'}).disableSelection();
            //$('.listEditor>li>ul>li').draggable({connectToSortable: ".lessonList",helper: "clone",revert: "invalid"});
            
            $('#lightbox').fadeOut('fast',function() {$(this).remove();});
            $('#overlay').fadeOut('fast',function() {$(this).remove();});
        }

        function cancel()
        {
            $('#lightbox').fadeOut('fast',function() {$(this).remove();});
            $('#overlay').fadeOut('fast',function() {$(this).remove();});
        }

        $('#newSectionName').bind('keyup', function(e)
        {
            // Enter
            if(e.keyCode==13)
            {
               addSection(); 
            }
            // Escape
            else if(e.keyCode==27)
            {
                cancel();
            }
        });

        $('#insertSectionBox button.create').click(function()
        {
            addSection();
        });

        $('#insertSectionBox button.cancel').click(function()
        {
            cancel();
        });
    }

    this.actionStarted = false;
}

// DESC: deletes a section
// PARAMETER: sectionDeleteButton is the icon that is clicked that caused the delete.
//            The button is used to determine which section to delete
// RETURNS: void
LessonPlan.prototype.deleteSection = function(sectionDeleteButton)
{
    sectionDeleteButton.parents('li').first().remove();
}

// DESC: deletes a lesson
// PARAMETER: lessonDeleteButton is the icon that is clicked that caused the delete.
//            The button is used to determine which lesson to delete
// RETURNS: void
LessonPlan.prototype.deleteLesson = function(lessonDeleteButton)
{
    $(lessonDeleteButton).parents('li').first().remove();;
}

function LessonPlan()
{
	var thisObject = this;
    
	$('.sectionList').sortable().disableSelection();
	$('.lessonList').sortable({connectWith: '.lessonList'}).disableSelection();

	// Section re-ordering makes ajax request
	$('.sectionList').live("sortstop",function(e,ui)
	{

	});
    
    $('.sectionList').live("sort",function(e,ui)
    {
        if(thisObject.actionStarted)
        {
            e.preventDefault();
        }
    });
	
	// Lesson re-ordering makes ajax request
	$('.lessonList').live("sortstop",function(e,ui)
	{
        
	});
    
    $('.lessonList').live("sort",function(e,ui)
    {
        if(thisObject.actionStarted)
        {
            e.preventDefault();
        }
    });
	
	// Edit section name
	$('span.sectionName').live('click',function()
	{
        thisObject.editSectionName($(this));
	});
	
	$('input.sectionName').live('blur',function()
	{
        if($(this).attr('data-revert')!="true")
        {
            thisObject.renameSection(this,$(this).val());
        }
	});
	
	// Contract List
	$('.listEditor .expandedList img').live('click',function()
	{
		var minusImage = this;
		$(minusImage).parents('li').children('ul').slideUp(400,function()
		{
			$(minusImage).attr('src','img/editorIcons/plus_icon.png');
			$(minusImage).parents('.expandedList').removeClass('expandedList').addClass('contractedList');
		});
	});
	
	// Expand List
	$('.listEditor .contractedList img').live('click',function()
	{
		var plusImage = this;
		$(plusImage).parents('li').children('ul').slideDown(400,function()
		{
			$(plusImage).attr('src','img/editorIcons/minus_icon.png');
			$(plusImage).parents('.contractedList').removeClass('contractedList').addClass('expandedList');
		});
	});
	
	// Add Section Button
	$('#listEditorHeader #addSectionIcon').live('click',function()
	{
        thisObject.openAddSectionLightbox();
	});
    
    // Delete Section
    $('.deleteSectionIcon').live('click',function()
    {
        thisObject.deleteSection($(this));
    });
    
    // Delete Lesson
    $('.deleteLessonIcon').live('click',function()
    {
        thisObject.deleteLesson($(this));
    });
}

LessonRepository.prototype.fields = false;
LessonRepository.prototype.lessons = false;
LessonRepository.prototype.readyToProcess=true;
LessonRepository.prototype.currentPosition=null;

// DESC: fills the LessonRepository with content and calls the display function
// PARAMETER: backLocation is the location the user will be taken to if they hit the LessonRepository back button
// PARAMETER: LessonRepositoryLinks is the links that will be added to the new LessonRepository
// RETURNS: void
LessonRepository.prototype.fill = function(LessonRepositoryLinks)
{
    var LessonRepositoryObject = this;
    $('div#lessonRepository>div').fadeOut('fast',
        function()
        {
            var backPathArray = $('#lessonRepository').attr('data-navposition').replace(/^\/data\/material\/|\/$/g,'').split('/');
            $('#repositoryBackLinks').empty();
            $('#lessonRepository>div>ul').removeClass('listEditor');
            
            if(backPathArray[0]!="")
            {
                var backLinks = '<span data-link="/data/material/">Fields</span> > ';
                $.each(backPathArray, function(index, value)
                {
                    var linkPath = '/data/material/'+backPathArray.slice(0,index+1).join('/')+'/';
                    var link='<span data-link="'+linkPath+'">'+value.replace(/_/g,' ')+'</span>';
                    if(index!=backPathArray.length-1)
                    {
                        backLinks+=link+" > ";
                    }
                    else
                    {
                        backLinks+=link;
                    }
                });
                
                
                
                $('#repositoryBackLinks').html(backLinks);
            }
            
            $('#lessonRepository>div>ul').remove();
            $('#lessonRepository>div').append('<ul></ul>');

            if(LessonRepositoryObject.lessons)
            {
                $('div#lessonRepository').addClass('lessonNav');
                for(i=0;i<LessonRepositoryLinks.length;i++)
                {
                    $('#lessonRepository>div>ul').addClass('listEditor');
                    $('#lessonRepository>div>ul').append('<li><span><span></span><span>'+LessonRepositoryLinks[i]["name"]+'</span><span></span></span></li>');
                    $('#lessonRepository>div>ul>li:last-of-type').append('<ul></ul>');
                    for(j=0;j<LessonRepositoryLinks[i].lessons.length;j++)
                    {
                        var linkArray = LessonRepositoryLinks[i].lessons[j]['link'].replace(/^\/data\/material\/|\/$/g,'').split('/');
                        var navPosition = {lesson:linkArray[4],section:linkArray[3], course:linkArray[2], subject:linkArray[1],field:linkArray[0]};

                        var linkLocation = "index.php?field="+navPosition.field+"&subject="+navPosition.subject+"&course="+navPosition.course+"&section="+escape(navPosition.section)+"&lesson="+escape(navPosition.lesson);
                        $('#lessonRepository>div>ul>li:last-of-type>ul').append('<li><span><span></span><span>'+LessonRepositoryLinks[i].lessons[j]["name"]+'</span><span></span></span></li>');
                    }
                }
                
                $('.listEditor>li>ul>li').draggable({connectToSortable: ".lessonList",helper: "clone",revert: "invalid"});
            }
            else
            {
                $('#lessonRepository').removeClass('lessonNav');
                for(i=0;i<LessonRepositoryLinks.length;i++)
                {
                    $('#lessonRepository>div>ul').append('<li data-img="'+LessonRepositoryLinks[i]['img']+'" data-link="'+LessonRepositoryLinks[i]['link']+'">'+LessonRepositoryLinks[i]["name"]+'</li>');
                }
            }

            LessonRepositoryObject.display();
        }			
     );
}

// DESC: adds images to the newly added LessonRepository and fades it in
// RETURNS: void
LessonRepository.prototype.display = function()
{
    var LessonRepositoryObject = this;
    var navlinks = $('div#lessonRepository ul li');

    if(!LessonRepositoryObject.lessons)
    {
        for(i=0;i<navlinks.length;i++)
        {
            $(navlinks[i]).prepend('<img data-loaded="false" src=img/navIcons/'+$(navlinks[i]).attr('data-img')+".png />");
        }

        navlinks.find('img').load(function()
        {
            if($(this).parents('li').first().siblings().find('img[data-loaded=false]').size()==0)
            {
                $('div#lessonRepository>div').fadeIn('fast',function()
                {
                    LessonRepositoryObject.readyToProcess=true;	
                });
            }
            else
            {
                $(this).attr('data-loaded',"true");
            }
        });
    }
    else
    {
        $('div#lessonRepository>div').fadeIn('fast', function()
        {
            LessonRepositoryObject.readyToProcess=true;	
        });
    }
}

// DESC: Uses the navigation bar location to get and fill the links associated with that location
// PARAMETER: navLocation is the the slash-separated level of navigation
// RETURNS: void
LessonRepository.prototype.processPosition = function(navLocation)
{
    var LessonRepositoryObject = this;
    LessonRepositoryObject.currentPosition=navLocation;
    
    if(this.readyToProcess)
    {
        this.readyToProcess=false;
        var linkArray = navLocation.replace(/^\/data\/material\/|\/$/g,'').split('/');
        var navPosition = {lesson:linkArray[4],section:linkArray[3], course:linkArray[2], subject:linkArray[1],field:linkArray[0]};

        $.ajax({url : 'resources/getCourseNav.php', type: 'GET', data: navPosition,success: function(data)
        {
            var backLocation = '/data/material/';
            dataArray = $.parseJSON(data);
            
            var currentPath = dataArray['path'];
            
            if(currentPath!==null)
            {
                var backLocationArray = currentPath.split('/');
                backLocationArray.splice(backLocationArray.length-2,1);
                var backLocation = backLocationArray.join('/');
            }

            var newLessonRepositoryLinks = new Array();

            LessonRepositoryObject.fields = false;
            LessonRepositoryObject.lessons = false;
            
            function getJSONArrayLength(myObject)
            {
                var keepGoing = true;
                var objectLength = 0;
                while(keepGoing)
                {
                    if(myObject[objectLength]==null)
                    {
                        keepGoing=false;
                    }
                    else
                    {
                        objectLength++;
                    }
                }
                
                return objectLength;
            }

            if(currentPath.split('/').length==7)
            {
                LessonRepositoryObject.fields = false;
                LessonRepositoryObject.lessons = true;

                if(getJSONArrayLength(dataArray['children'])>0)
                {
                    for(i=0;i<getJSONArrayLength(dataArray['children']);i++)
                    {
                        newLessonRepositoryLinks.push({link:dataArray['children'][i]['path'],name:dataArray['children'][i]['name'],lessons:new Array()});
                        var sectionLinkArray = newLessonRepositoryLinks[i].link.replace(/^\/data\/material\/|\/$/g,'').split('/');
                        var sectionNavPosition = {section:sectionLinkArray[3], course:sectionLinkArray[2], subject:sectionLinkArray[1],field:sectionLinkArray[0]};

                        function processAjax(index)
                        {
                            return function(innerData)
                            {
                                innerDataArray = $.parseJSON(innerData);

                                for(j=0;j<getJSONArrayLength(innerDataArray['children']);j++)
                                {
                                    newLessonRepositoryLinks[index].lessons.push({link:innerDataArray['children'][j]['path'],name:innerDataArray['children'][j]['name']});
                                }

                                if(index==getJSONArrayLength(dataArray['children'])-1)
                                {
                                    LessonRepositoryObject.fill(newLessonRepositoryLinks);
                                }
                            }
                        }
                        
                        $.ajax({url: 'resources/getCourseNav.php',type:'GET',data:sectionNavPosition,success:processAjax.call(this,i)});
                    }
                }
                else
                {
                    LessonRepositoryObject.fill(newLessonRepositoryLinks);
                }
            }
            else
            {
                if(currentPath=='/data/material/')
                {
                    LessonRepositoryObject.fields = true;
                }
                else
                {
                    LessonRepositoryObject.fields = false;
                }
                LessonRepositoryObject.lessons = false;
                
                for(i=0;i<getJSONArrayLength(dataArray['children']);i++)
                {
                    newLessonRepositoryLinks.push({link:dataArray['children'][i]['path'],name:dataArray['children'][i]['name'],img:$.trim(dataArray['children'][i]['name']).replace(/ /g,'_')});
                }	

                LessonRepositoryObject.fill(newLessonRepositoryLinks);
            }

            $('#lessonRepository').attr('data-navPosition',navLocation);
        }});
    }
}

// DESC: navigates to the next navigation level after the user clicks on an icon
// PARAMETER: navLocation is new location to navigate to
// RETURNS: void
LessonRepository.prototype.navigateToNextLevel = function(navLocation)
{
    if(this.readyToProcess)
    {
        this.processPosition(navLocation);
    }
}

// DESC: navigates to a lesson
// PARAMETER: navLocation is the lesson to load
// RETURNS: void
LessonRepository.prototype.navigateToLesson = function(navLocation)
{
    if(this.readyToProcess)
    {
        var linkArray = navLocation.replace(/^\/data\/material\/|\/$/g,'').split('/');
        var navPosition = {lesson:linkArray[4],section:linkArray[3], course:linkArray[2], subject:linkArray[1],field:linkArray[0]};

        window.location = "index.php?field="+navPosition.field+"&subject="+navPosition.subject+"&course="+navPosition.course+"&section="+escape(navPosition.section)+"&lesson="+escape(navPosition.lesson);
    }
}

function LessonRepository()
{
	var LessonRepositoryObject = this;

	this.processPosition($('#lessonRepository').attr('data-navPosition'));
	
	$('#lessonRepository>div>ul>li').live('click',function()
	{
        if(!LessonRepositoryObject.lessons)
        {
            LessonRepositoryObject.navigateToNextLevel($(this).attr('data-link'));
        }
	});
    
    $('#lessonRepository>p#repositoryBackLinks>span').live('click', function()
    {
        LessonRepositoryObject.navigateToNextLevel($(this).attr('data-link'));
    })
}