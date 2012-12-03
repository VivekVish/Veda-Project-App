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

// DESC: Deletes the module assuming there are no sections in it
// RETURNS: void
LessonPlan.prototype.deleteModule = function(lessonPlanId)
{
    $.ajax({url:'resources/deleteLessonPlan.php', type: 'POST', data: {"lessonPlanId":lessonPlanId}, success: function(data)
    {
        if(data=="Success.")
        {
            $('li[data-lessonplanid="'+lessonPlanId+'"]').remove();
            window.location = "index.php";
        }
        else
        {
            new Message(data);
        }
    }});
}

// DESC: Makes adjustments and calls an AJAX function after re-ordering a section
// PARAMETER: sectionItem is the section element that is re-ordered
// RETURNS: void
LessonPlan.prototype.sortSection = function(sectionItem)
{
    var thisObject = this;
    
    if(this.actionStarted === false)
    {
        this.actionStarted = true;

        var sectionSpan = sectionItem.children('span[data-sectionpath]');

        var oldOrder = eval(sectionSpan.attr('data-sectionorder'));
        var path = sectionSpan.attr('data-sectionpath');

        var prevElementOrder = eval(sectionItem.prev().children('span').attr('data-sectionorder'));

        if(isNaN(prevElementOrder))
        {
            newOrder = 1;
        }
        else
        {
            if(oldOrder>prevElementOrder)
            {
                var newOrder = eval(sectionItem.prev().children('span').attr('data-sectionorder'))+1;
            }
            else
            {
                var newOrder = eval(sectionItem.prev().children('span').attr('data-sectionorder'));
            }
        }

        var payload = {"oldPath":path, "oldOrder":oldOrder, "newPath": path, "newOrder":newOrder};

        $.ajax({url: 'resources/changeLessonPlanPosition.php', data: payload, success: function(data)
        {
            if(data=="Success.")
            {
                var list = sectionItem.parents('ul');

                if(newOrder>oldOrder)
                {
                    list.children('li').slice(oldOrder-1,newOrder).children('span').each(function(index)
                    {
                        $(this).attr('data-sectionorder',eval($(this).attr('data-sectionorder'))-1);
                    });
                }
                else
                {
                    list.children('li').slice(newOrder-1,oldOrder).children('span').each(function(index)
                    {
                        $(this).attr('data-sectionorder',eval($(this).attr('data-sectionorder'))+1);
                    });
                }

                sectionSpan.attr('data-sectionorder',newOrder);
            }
            else
            {
                new Message(data);
                if(payload.oldOrder==1)
                {
                    sectionItem.prependTo('.sectionList')
                }
                else
                {
                    sectionItem.insertAfter($('.sectionList').children('li').eq(oldOrder-2));
                }
            }
        }, complete: function()
        {
            thisObject.actionStarted = false;
        }});
    }
}

// DESC: Makes adjustments and calls an AJAX function after re-ordering a lesson
// PARAMETER: lessonItem is the lesson element that is re-ordered
// RETURNS: void
LessonPlan.prototype.sortLesson = function(lessonItem,oldList)
{    
    var thisObject = this;
    
    if(this.actionStarted===false)
    {
        this.actionStarted=true;
        
        var lessonSpan = lessonItem.children('span[data-lessonpath]');

        var oldPath = oldList.prev('span').attr('data-sectionpath') + $.trim(lessonSpan.children('span').eq(1).text().replace(/ /g,'_')) + '/';
        var oldOrder = eval(lessonSpan.attr('data-lessonorder'));
        
        var newList = lessonItem.parents('ul').first();
        var newPath = newList.prev('span').attr('data-sectionpath') + $.trim(lessonSpan.children('span').eq(1).text().replace(/ /g,'_')) + '/';

        var prevElementOrder = eval(lessonItem.prev().children('span').attr('data-lessonorder'));
        if(isNaN(prevElementOrder))
        {
            var newOrder = 1;
        }
        else
        {
            if(newList[0]!=oldList[0]||oldOrder>prevElementOrder)
            {
                var newOrder = eval(lessonItem.prev().children('span').attr('data-lessonorder'))+1;
            }
            else
            {
                var newOrder = eval(lessonItem.prev().children('span').attr('data-lessonorder'));
            }
        }

        var payload = {"oldPath":oldPath, "oldOrder":oldOrder, "newPath":newPath, "newOrder":newOrder};

        $.ajax({url: 'resources/changeLessonPlanPosition.php', data: payload, success: function(data)
        {
            if(data=="Success.")
            {
                if(newList[0]==oldList[0])
                {
                    if(newOrder>oldOrder)
                    {
                        oldList.children('li').slice(oldOrder-1,newOrder).children('span').each(function(index)
                        {
                            $(this).attr('data-lessonorder',eval($(this).attr('data-lessonorder'))-1);
                        });
                    }
                    else
                    {
                        oldList.children('li').slice(newOrder-1,oldOrder).children('span').each(function(index)
                        {
                            $(this).attr('data-lessonorder',eval($(this).attr('data-lessonorder'))+1);
                        });
                    }

                    lessonSpan.attr('data-lessonorder',newOrder);
                }
                else
                {
                    oldList.children('li').slice(oldOrder-1).children('span').each(function(index)
                    {
                        $(this).attr('data-lessonorder',eval($(this).attr('data-lessonorder'))-1);
                    });

                    newList.children('li').slice(newOrder-1).children('span').each(function(index)
                    {
                        $(this).attr('data-lessonorder',eval($(this).attr('data-lessonorder'))+1);
                    });

                    lessonSpan.attr('data-lessonorder',newOrder);
                    lessonSpan.attr('data-lessonpath',newPath);	
                }

                thisObject.callNavReprocess();
            }
            else
            {
                new Message(data);

                if(payload.oldOrder==1)
                {
                    lessonItem.prependTo(oldList);
                }
                else
                {
                    lessonItem.insertAfter(oldList.children('li').eq(oldOrder-2));
                }
            }
        }, complete: function()
        {
            thisObject.actionStarted = false;
        }});
    }
    thisObject.actionStarted = false;
    
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
        createLightBox('body','Create Section',insertSection);
        $('#newSectionName').focus();

        function addSection()
        {            
            var newSectionName = $('#newSectionName').val().replace(/ /g,'_');
            
            if(thisObject.isNameValid(newSectionName))
            {
                var payload = {"section":newSectionName,"lessonPlanId":$('#listEditorHeader').attr('data-lessonplanid')};

                $.ajax({url: 'resources/submitLessonPlanSection.php', data: payload, success: function(data)
                {
                    if(data=="Success.")
                    {
                        var newSectionOrder = eval($('.sectionList span[data-sectionorder]').last().attr('data-sectionorder'))+1;
                        if(isNaN(newSectionOrder))
                        {
                            newSectionOrder = 1;
                        }
                        
                        var newSectionRow = $('<span data-sectionpath="/data/lessonplan/'+$('#listEditorHeader').attr('data-lessonplanid')+'/'+newSectionName+'/" data-sectionorder="'+newSectionOrder+'"></span>');
                        newSectionRow.append('<span class="expandedList"></span>')
                                     .append('<span class="sectionName">'+newSectionName.replace(/_/g,' ')+'</span>')
                                     .append('<span><img class="deleteSectionIcon" src="img/editorIcons/delete_icon.png" /></span>');

                        $('.sectionList').append($('<li><ul class="lessonList"></ul></li>').prepend(newSectionRow));

                        $('.lessonList').sortable({connectWith: '.lessonList'}).disableSelection();
                    }
                }});

                $('#lightbox').fadeOut('fast',function() {$(this).remove();});
                $('#overlay').fadeOut('fast',function() {$(this).remove();});
            }
            else
            {
                new Message("Name contains illegal characters.");
            }
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
    var thisObject = this;
    
    if(this.actionStarted === false)
    {
        this.actionStarted = true;
        var thisIcon = this;

        var position =  sectionDeleteButton.parent('span').parent('span').attr('data-sectionpath');
        var positionArray = position.replace(/^\/data\/lessonplan\/|\/$/g,'').split('/');
        var payload = {"lessonPlanId":positionArray[0],"section":positionArray[1]};

        $.ajax({url:'resources/deleteLessonPlanSection.php', data: payload, type: 'POST', success: function(data)
        {
            if(data=="Success.")
            {
                var oldOrder = sectionDeleteButton.parents('span[data-sectionorder]').attr('data-sectionorder');                 

                sectionDeleteButton.parents('ul').first().children('li').slice(oldOrder-1).children('span').each(function(index)
                {
                    $(this).attr('data-sectionorder',eval($(this).attr('data-sectionorder'))-1);
                });

                sectionDeleteButton.parents('li').first().remove();
            }
            else
            {
                new Message(data);
            }
        }, complete:function()
        {
            thisObject.actionStarted = false;
        }});
    }
}

// DESC: adds a lesson
// PARAMETER: lessonItem is the item to be moved from the repository to the lesson plan
// RETURNS: void
LessonPlan.prototype.addLesson = function(lessonItem)
{
    var thisObject = this;
    
    if(this.actionStarted===false)
    {
        this.actionStarted=true;
        var positionArray = lessonItem.children('span').attr('data-lessonpath').replace(/^\/data\/material\/|\/$/g,'').split('/');
        var lessonPlanPositionArray = $(lessonItem).parents('.lessonList').prev('[data-sectionpath]').attr('data-sectionpath').replace(/^\/data\/lessonplan\/|\/$/g,'').split('/');
        var payload = {"field":positionArray[0],"subject":positionArray[1],"course":positionArray[2],"section":positionArray[3],"lesson":positionArray[4],"lessonPlanId":lessonPlanPositionArray[0],"lessonPlanSection":lessonPlanPositionArray[1],"order":$(lessonItem).prevAll().size()+1};

        $.ajax({url:'resources/submitLessonPlanLesson.php', data: payload, type: 'POST', success: function(data)
        {
            if(data==="Success.")
            {
                $(lessonItem).addClass('lessonPlanLesson');
            }
            else
            {
                $(lessonItem).remove();
            }
        }, complete:function()
        {
            thisObject.actionStarted = false;
        }});
    }
}

// DESC: deletes a lesson
// PARAMETER: lessonDeleteButton is the icon that is clicked that caused the delete.
//            The button is used to determine which lesson to delete
// RETURNS: void
LessonPlan.prototype.deleteLesson = function(lessonDeleteButton)
{
    var thisObject = this;
    
    if(this.actionStarted===false)
    {
        var positionArray = $(lessonDeleteButton).parents('li').children('span').attr('data-lessonpath').replace(/^\/data\/material\/|\/$/g,'').split('/');
        var lessonName = positionArray[4];
        var sectionPosition =  $(lessonDeleteButton).parents('ul').prev().attr('data-sectionpath');
        var sectionPositionArray = sectionPosition.replace(/^\/data\/lessonplan\/|\/$/g,'').split('/');
        var payload = {"lessonPlanId":sectionPositionArray[0],"section":sectionPositionArray[1],"lessonName":lessonName};

        $.ajax({url:'resources/deleteLessonPlanLesson.php', data: payload, type: 'POST', success: function(data)
        {
            if(data=="Success.")
            {
                var oldOrder = lessonDeleteButton.parents('span[data-lessonorder]').attr('data-lessonorder');                 

                lessonDeleteButton.parents('ul').first().children('li').slice(oldOrder-1).children('span').each(function(index)
                {
                    $(this).attr('data-lessonorder',eval($(this).attr('data-lessonorder'))-1);
                });

                $(lessonDeleteButton).parents('li').first().remove();
            }
            else
            {
                new Message(data);
            }
        }, complete:function()
        {
            thisObject.actionStarted = false;
        }});
    }
}

// DESC: deletes a lesson addition
// PARAMETER: lessonDeleteButton is the icon that is clicked that caused the delete.
//            The button is used to determine which lesson to delete
// RETURNS: void
LessonPlan.prototype.deleteLessonAddition = function(additionButton)
{
    var thisObject = this;
    
    if(this.actionStarted===false)
    {
        this.actionStarted=true;
        var positionArray = $(additionButton).parents('li').children('span').attr('data-lessonpath').replace(/^\/data\/material\/|\/$/g,'').split('/');
        var lessonName = positionArray[positionArray.length-1];
        var sectionPosition =  $(additionButton).parents('ul').prev().attr('data-sectionpath');
        var sectionPositionArray = sectionPosition.replace(/^\/data\/lessonplan\/|\/$/g,'').split('/');
        var lessonAdditionType = "";
        
        if(additionButton.children('img').hasClass('quizIcon'))
        {
            lessonAdditionType="quiz";
        }
        else if(additionButton.children('img').hasClass('roleplayIcon'))
        {
            lessonAdditionType="roleplay";
        }
        else if(additionButton.children('img').hasClass('trainingManualIcon'))
        {
            lessonAdditionType="trainingmanual";
        }
        else if(additionButton.children('img').hasClass('videoIcon'))
        {
            lessonAdditionType="video";
        }

        var payload = {"lessonPlanId":sectionPositionArray[0],"section":sectionPositionArray[1],"lessonName":lessonName,"type":lessonAdditionType};
        
        $.ajax({url:'resources/deleteLessonPlanLessonAddition.php', data: payload, type: 'POST', success: function(data)
        {
            if(data=="Success.")
            {
                $(additionButton).remove();
            }
            else
            {
                new Message(data);
            }
        }, complete:function()
        {
            thisObject.actionStarted = false;
        }});
    }
}

function LessonPlan()
{
	var thisObject = this;
    
	$('.sectionList').sortable().disableSelection();
	$('.lessonList').sortable({connectWith: '.lessonList'}).disableSelection();

	// Section re-ordering makes ajax request
	$('.sectionList').live("sortstop",function(e,ui)
	{
        if(typeof($(ui.item[0]).attr('data-lessonpath'))==='undefined'&&!$(ui.item).hasClass('lessonPlanLesson'))
        {
            thisObject.sortSection($(ui.item));
        }
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
        if($(ui.item).hasClass('lessonPlanLesson'))
        {
            thisObject.sortLesson($(ui.item),$(e.target));
        }
        else
        {
            thisObject.addLesson($(ui.item));
        }
	});
    
    $('.lessonList').live("sort",function(e,ui)
    {
        $(ui.placeholder[0]).css('height',$('#listEditorHeader').height());
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
    
    // Delete Section
    $('#deleteModuleIcon').live('click',function()
    {
        thisObject.deleteModule($(this).parents('#listEditorHeader').attr('data-lessonplanid'));
    });
    
    // Delete Lesson
    $('.deleteLessonIcon').live('click',function()
    {
        thisObject.deleteLesson($(this));
    });
    
    $('ul.lessonList>li>span>span:last-of-type>a').live('mousedown', function(e)
    {
        if(e.which==3&&$(this).children('.editLessonIcon').size()==0)
        {
            thisObject.deleteLessonAddition($(this));
        }
    });
    
    $('ul.lessonList>li>span>span:last-of-type>a').live('contextmenu',function(e)
    {
        if($(this).children('.editLessonIcon').size()==0)
        {
            e.preventDefault();
        }
    });
    
    $('#editModuleIcon').live('click',function()
    {
        mvpModuleManager.openAddLessonPlanLightbox($(this).parents('#listEditorHeader').attr('data-lessonplanid'));
    });
}

MVPModuleManager.prototype.openAddLessonPlanLightbox = function(lessonPlanId)
{
    var thisObject = this;
    
    var currentName = $("#content h1").html();
    var currentTags = $("#listEditorHeader").attr("data-tags");
    var currentNotes = $("#listEditorHeader").attr("data-notes");
    var currentLocation = $("#listEditorHeader").attr("data-location");
    var currentAge = $("#listEditorHeader").attr("data-age");
    var currentGender = $("#listEditorHeader").attr("data-gender");
    var currentLiteracy = $("#listEditorHeader").attr("data-literacy");
    var currentImage = $("#listEditorHeader").attr("data-image");

    var createLessonPlan = this.createAddLessonPlanLightbox();
        
    createLessonPlan.children('ul').find('#newLessonPlanName').val(currentName);
    createLessonPlan.children('ul').find('#newTags').val(currentTags);
    createLessonPlan.children('ul').find('#newNotes').val(currentNotes);
    createLessonPlan.children('ul').find('#newLessonPlanLocation').children('option[value="'+currentLocation+'"]').attr('selected','selected');
    createLessonPlan.children('ul').find('#newLessonPlanAge').children('option[value="'+currentAge+'"]').attr('selected','selected');
    createLessonPlan.children('ul').find('#newLessonPlanGender').children('option[value="'+currentGender+'"]').attr('selected','selected');
    createLessonPlan.children('ul').find('#newLessonPlanLiteracy').children('option[value="'+currentLiteracy+'"]').attr('selected','selected');
    createLessonPlan.children('ul').find('#newLessonPlanImage').children('option[value="'+currentImage+'"]').attr('selected','selected');

    createLightBox('body','Create Module',createLessonPlan);
    $('#newLessonPlanName').focus();
    
    function editLessonPlan(id,lessonPlanName,tags,notes,location,age,gender,literacy,moduleImage)
    {
        var tagArray = tags.split(",");
        var payload = {id:id,lessonPlanName: lessonPlanName, tags: tagArray, notes: notes, location: location, age: age, gender: gender, literacy: literacy,image: moduleImage};

        $.ajax({url:'resources/submitLessonPlan.php', type: 'POST', data: payload, success: function(data)
        {
            thisObject.addLessonPlanToDOM(data,moduleImage,lessonPlanName,notes,tags,location,age,gender,literacy);
        }, complete: function(data)
        {
            thisObject.actionStarted = false;
        }});            
    }

    function cancel()
    {
        thisObject.actionStarted=false;
        $('#lightbox').fadeOut('fast',function() {$(this).remove();});
        $('#overlay').fadeOut('fast',function() {$(this).remove();});
    }

    $('#newLessonPlanName').bind('keyup', function(e)
    {
        // Enter
        if(e.keyCode==13)
        {
           editLessonPlan(lessonPlanId,$('#newLessonPlanName').val().replace(/_/g,' '),$('#newTags').val(),$('#newNotes').val(),$('#newLessonPlanLocation').val(),$('#newLessonPlanAge').val(),$('#newLessonPlanGender').val(),$('#newLessonPlanLiteracy').val(),$("#newLessonPlanImage").val());
        }
        // Escape
        else if(e.keyCode==27)
        {
            cancel();
        }
    });

    $('#createLessonPlan button.create').click(function()
    {
        editLessonPlan(lessonPlanId,$('#newLessonPlanName').val().replace(/_/g,' '),$('#newTags').val(),$('#newNotes').val(),$('#newLessonPlanLocation').val(),$('#newLessonPlanAge').val(),$('#newLessonPlanGender').val(),$('#newLessonPlanLiteracy').val(),$("#newLessonPlanImage").val());
    });

    $('#createLessonPlan button.cancel').click(function()
    {
        cancel();
    });
}

MVPModuleManager.prototype.addLessonPlanToDOM = function(data,moduleImage,lessonPlanName,notes,tags,location,age,gender,literacy)
{
    try
    {
        var lessonPlanIdArray = $.parseJSON(data);
        
        $("#content h1").html(lessonPlanName);
        $("#listEditorHeader").attr("data-tags",tags);
        $("#listEditorHeader").attr("data-notes",notes);
        $("#listEditorHeader").attr("data-location",location);
        $("#listEditorHeader").attr("data-age",age);
        $("#listEditorHeader").attr("data-gender",gender);
        $("#listEditorHeader").attr("data-literacy",literacy);
        $("#listEditorHeader").attr("data-image",moduleImage);

        $('#lightbox').fadeOut('fast',function() {$(this).remove();});
        $('#overlay').fadeOut('fast',function() {$(this).remove();});
    }
    catch(e)
    {
        new Message(data);
    }
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
                var backLinks = '';
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
                        var lessonOrder = j+1;
                        
                        $('#lessonRepository>div>ul>li:last-of-type>ul').append('<li><span data-lessonpath="'+LessonRepositoryLinks[i].lessons[j]['link']+'" data-lessonorder="'+lessonOrder+'"><span></span><span>'+LessonRepositoryLinks[i].lessons[j]["name"]+'</span><span></span></span></li>');
                        $('#lessonRepository>div>ul>li:last-of-type>ul>li:last-of-type>span>span:last-of-type').append('<img title="Delete Lesson" class="deleteLessonIcon" src="img/editorIcons/delete_icon.png" /><a><img title="Edit Lesson" class="editLessonIcon" src="img/editorIcons/editLesson_icon.png" /></a><a><img title="Edit Quiz" class="quizIcon" src="img/editorIcons/quiz_icon.png" /></a>');
                        for(k=0;k<LessonRepositoryLinks[i].lessons[j].lessonAdditions.length;k++)
                        {
                            switch(LessonRepositoryLinks[i].lessons[j].lessonAdditions[k])
                            {
                                case 'trainingmanual':
                                    $('#lessonRepository>div>ul>li:last-of-type>ul>li:last-of-type>span>span:last-of-type').append('<a><img title="Edit Training Manual" class="trainingManualIcon" src="img/editorIcons/trainingmanual.png" /></a>');
                                    break;
                                case 'roleplay':
                                    $('#lessonRepository>div>ul>li:last-of-type>ul>li:last-of-type>span>span:last-of-type').append('<a><img title="Edit Roleplaying Manual" class="roleplayIcon" src="img/editorIcons/roleplay.png" /></a>');
                                    break;
                                case 'video':
                                    $('#lessonRepository>div>ul>li:last-of-type>ul>li:last-of-type>span>span:last-of-type').append('<a><img title="Edit Video" class="videoIcon" src="img/editorIcons/video.png" /></a>');
                                    break;
                            }
                        }
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
                if(myObject===null)
                {
                    return 0;
                }
                
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
                                var innerDataArray = $.parseJSON(innerData);
                                for(j=0;j<getJSONArrayLength(innerDataArray['children']);j++)
                                {
                                    var lessonAdditions = [];
                                    for(k=0;k<innerDataArray['children'][j]['lessonAdditions'].length;k++)
                                    {
                                        lessonAdditions.push(innerDataArray['children'][j]['lessonAdditions'][k]);
                                    }
                                    newLessonRepositoryLinks[index].lessons.push({link:innerDataArray['children'][j]['path'],name:innerDataArray['children'][j]['name'],lessonAdditions: lessonAdditions});
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
    this.processPosition('/data/material/CHW_Training/');

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
    });
}