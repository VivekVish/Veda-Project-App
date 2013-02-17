////////////////////////////////////////////////////////////////
// The CourseEditor object handles all course editing         //
// functionality which includes adding, re-ordering, deleting //
// and renaming lessons and sections as well as recovering    //
// deleted lessons.                                           //
////////////////////////////////////////////////////////////////

$(document).ready(function()
{
	courseEditor = new CourseEditor();
});

// DESC: If an action is started, is set to true.  when completed, it is set to false.
//       If actionStarted is true, a new action like a sort cannot start
CourseEditor.prototype.actionStarted = false;

// DESC: Checks if a particular name is a valid lesson or section name
// PARAMETER: nameToCheck is the string of the name of the lesson or section
// RETURNS: boolean, true if name is valid and false if not
CourseEditor.prototype.isNameValid = function(nameToCheck)
{
    return nameToCheck.length>0&&nameToCheck.search(/\//)==-1&&nameToCheck.search(/\&/)==-1;
}

// DESC: Refreshes the navigation bar
// RETURNS: void
CourseEditor.prototype.callNavReprocess = function()
{
    if($('#coursenav').attr('data-navPosition')==$('#listEditorHeader').attr('data-coursepath'))
    {
        navigationBar.processPosition($('#coursenav').attr('data-navPosition'));
    }
}

// DESC: Renames a section
// PARAMETER: sectionNameElement is the element that holds the section to be renamed
// PARAMETER: newName is the new section name
// RETURNS: void
CourseEditor.prototype.renameSection = function(sectionNameElement, newName)
{
    var thisObject = this;
    
    if(this.actionStarted === false)
    {
        this.actionStarted = true;
        newName = $.trim(newName);
        if(!this.isNameValid(newName))
        {
            var position = $(sectionNameElement).parents('span[data-sectionpath]').attr('data-sectionpath');
            var positionArray = position.replace(/^\/data\/material\/|\/$/g,'').split('/');
            $(sectionNameElement).replaceWith('<span class="sectionName">'+positionArray[3].replace(/_/g,' ')+'</span>');
            new Message("Name cannot contain special characters.",{type:'error'});
            return;
        }

        var position = $(sectionNameElement).parents('span[data-sectionpath]').attr('data-sectionpath');
        var positionArray = position.replace(/^\/data\/material\/|\/$/g,'').split('/');
        var payload = {'name':newName,"field":positionArray[0],"subject":positionArray[1],"course":positionArray[2],"section":positionArray[3]};
        if(payload.name.replace(/ /g,'_')==payload.section)
        {
            $(sectionNameElement).replaceWith('<span class="sectionName">'+payload.section.replace(/_/g,' ')+'</span>');
            this.actionStarted = false;
        }
        else
        {
            $.ajax({url:'resources/submitSection.php', type: 'POST', data: payload, success: function(data)
            {
                if(data=="Success.")
                {
                    var newPositionName = newName.replace(/ /g,'_');
                    positionArray[3] = newPositionName;
                    $(sectionNameElement).parents('span[data-sectionpath]').attr('data-sectionpath','/data/material/'+positionArray.join('/')+'/');
                    $(sectionNameElement).parents('span[data-sectionpath]').next('ul.lessonList').find('li>span[data-lessonpath]').each(function(index)
                    {
                        $(this).children().last().children('a').each(function()
                        {
                            $(this).attr("href",$(this).attr("href").substring(0,$(this).attr("href").indexOf("&section=")+9)+encodeURIComponent(newPositionName)+$(this).attr("href").substring($(this).attr("href").indexOf("&lesson=")));
                        });
                        var lessonPathArray = $(this).attr('data-lessonpath').split('/');
                        lessonPathArray[6] = newPositionName;
                        $(this).attr('data-lessonpath',lessonPathArray.join('/'));
                    });

                    $(sectionNameElement).replaceWith('<span class="sectionName">'+newName+'</span>');
                    thisObject.callNavReprocess();
                }
                else
                {
                    $(sectionNameElement).replaceWith('<span class="sectionName">'+positionArray[3].replace(/_/g,' ')+'</span>');
                    new Message(data);
                }
            }, complete: function(data)
            {
                thisObject.actionStarted = false;
            }});
        }
    }
}

// DESC: Renames a lesson
// PARAMETER: lessonNameElement is the element that holds the lesson to be renamed
// PARAMETER: newName is the new lesson name
// RETURNS: void
CourseEditor.prototype.renameLesson = function(lessonNameElement, newName)
{
    var thisObject = this;
    
    if(this.actionStarted === false)
    {
        this.actionStarted = true;
        newName = $.trim(newName);
        if(!this.isNameValid(newName))
        {
            var position = $(lessonNameElement).parents('span[data-lessonpath]').attr('data-lessonpath');
            var positionArray = position.replace(/^\/data\/material\/|\/$/g,'').split('/');
            $(lessonNameElement).replaceWith('<span class="lessonName">'+positionArray[4].replace(/_/g,' ')+'</span>');
            new Message("Name cannot contain special characters.",{type:'error'});
            return;
        }

        var position = $(lessonNameElement).parents('span[data-lessonpath]').attr('data-lessonpath');
        var positionArray = position.replace(/^\/data\/material\/|\/$/g,'').split('/');
        var payload = {'name':newName,"field":positionArray[0],"subject":positionArray[1],"course":positionArray[2],"section":positionArray[3],"lesson":positionArray[4]};
        if(payload.name.replace(/ /g,'_')==payload.lesson)
        {
            $(lessonNameElement).replaceWith('<span class="lessonName">'+payload.lesson.replace(/_/g,' ')+'</span>');
            this.actionStarted = false;
        }
        else
        {
            $.ajax({url:'resources/submitLesson.php', type: 'POST', data: payload, success: function(data)
            {
                if(data=="Success.")
                {
                    var newPositionName = newName.replace(/ /g,'_');
                    positionArray[4] = newPositionName;
                    $(lessonNameElement).parents('span[data-lessonpath]').children().last().children('a').each(function()
                    {
                        $(this).attr("href",$(this).attr("href").substring(0,$(this).attr("href").indexOf("&lesson=")+8)+encodeURIComponent(newPositionName)+$(this).attr("href").substring($(this).attr("href").indexOf("&type=")))
                    });
                    $(lessonNameElement).parents('span[data-lessonpath]').attr('data-lessonpath','/data/material/'+positionArray.join('/')+'/');
                    $(lessonNameElement).replaceWith('<span class="lessonName">'+newName+'</span>');
                    
                    thisObject.callNavReprocess();
                    thisObject.actionStarted = false;
                }
                else
                {
                    $(lessonNameElement).replaceWith('<span class="lessonName">'+positionArray[4].replace(/_/g,' ')+'</span>');
                    new Message(data);
                    thisObject.actionStarted = false;
                }
            }});
        }
    }
}

// DESC: Makes adjustments and calls an AJAX function after re-ordering a section
// PARAMETER: sectionItem is the section element that is re-ordered
// RETURNS: void
CourseEditor.prototype.sortSection = function(sectionItem)
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

        var payload = {"oldPath":path, "oldOrder":oldOrder, "newPath":path, "newOrder":newOrder};

        $.ajax({url: 'resources/changePosition.php', data: payload, success: function(data)
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
                thisObject.callNavReprocess();
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
CourseEditor.prototype.sortLesson = function(lessonItem,oldList)
{
    var thisObject = this;
    
    if(this.actionStarted === false)
    {
        this.actionStarted = true;

        var lessonSpan = lessonItem.children('span[data-lessonpath]');

        var oldPath = lessonSpan.attr('data-lessonpath').replace(/content\/$/,'');
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

        $.ajax({url: 'resources/changePosition.php', data: payload, success: function(data)
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
}

// DESC: turns a section name into an editable input box for the user to edit
// PARAMETER: sectionItem is the section element to be edited
// RETURNS: void
CourseEditor.prototype.editSectionName = function(sectionItem)
{
    var thisObject = this;
    
    if(this.actionStarted === false)
    {
        this.actionStarted = true;
        var sectionName = sectionItem.text();
        var sectionInput = $('<input type="text" class="sectionName" value="'+sectionName+'" />');
        sectionItem.replaceWith(sectionInput);
        sectionInput.focus();

        $(document).on('mousedown','html',function(e)
        {
            if($(sectionInput).attr('data-revert')!="true")
            {
                thisObject.renameSection(sectionInput,sectionInput.val());
                $(document).off('mousedown','html');
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
                    $(document).off('mousedown','html');
                    break;
               // Escape
               case 27:
                   if(sectionInput.size()>0)
                    {
                        $(this).attr("data-revert","true");
                        $(this).replaceWith('<span class="sectionName">'+sectionName+'</span>');
                    }
                    $(document).off('mousedown','html');
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

// DESC: turns a lesson name into an editable input box for the user to edit
// PARAMETER: lessonItem is the lesson element to be edited
// RETURNS: void
CourseEditor.prototype.editLessonName = function(lessonItem)
{
    var thisObject = this;
    
    if(this.actionStarted === false)
    {
        this.actionStarted = true;
        var lessonName = lessonItem.text();
        var lessonInput = $('<input type="text" class="lessonName" value="'+lessonName+'" />');
        lessonItem.replaceWith(lessonInput);
        lessonInput.focus();

        $(document).on('mousedown','html',function(e)
        {
            if($(lessonInput).attr('data-revert')!="true")
            {
                thisObject.renameLesson(lessonInput,lessonInput.val());
                $(document).off('mousedown','html');
            }
        });

        $(lessonInput).bind('keydown',function(e)
        {
            switch(e.keyCode)
            {
                // Tab or Enter
                case 9: case 13:
                    if(lessonInput.size()>0)
                    {
                        lessonInput.blur();
                    }
                    $(document).off('mousedown','html');
                    break;
                // Escape
                case 27:
                    if(lessonInput.size()>0)
                    {
                        $(this).attr("data-revert","true");
                        $(this).replaceWith('<span class="lessonName">'+lessonName+'</span>');
                    }
                    $(document).off('mousedown','html');
                    break;
            }
        });

        $(lessonInput).bind('mousedown',function(e)
        {
            e.stopPropagation();
        });
    }

    this.actionStarted = false;
}

// DESC: opens the add section lightbox and handles adding section
// RETURNS: void
CourseEditor.prototype.openAddSectionLightbox = function()
{
    var thisObject = this;
    
    if(this.actionStarted === false)
    {
        this.actionStarted = true;
        var insertSection = $('<div id="insertSectionBox"><ul></ul></div>');
        insertSection.children('ul').append('<li><label for="newSectionName">Section Name</label><input id="newSectionName"></input></li>');
        insertSection.children('ul').append('<li><button class="cancel">Cancel</button><button class="create">Create</button></li>');
        createLightBox('html','Create Section',insertSection);
        $('#newSectionName').focus();

        function addSection()
        {
            if(thisObject.isNameValid($('#newSectionName').val()))
            {
                var position = $('#listEditorHeader').attr('data-coursepath') + $.trim($('#newSectionName').val().replace(/ /g,'_')) + "/";
                var positionArray = position.replace(/^\/data\/material\/|\/$/g,'').split('/');
                var payload = {"field":positionArray[0],"subject":positionArray[1],"course":positionArray[2],"section":positionArray[3]};
                var newSectionName = $('#newSectionName').val().replace(/_/g,' ');

                $.ajax({url: 'resources/submitSection.php', data: payload, success: function(data)
                {
                    if(data=="Success.")
                    {
                        var newSectionOrder = eval($('.sectionList span[data-sectionorder]').last().attr('data-sectionorder'))+1;
                        if(isNaN(newSectionOrder))
                        {
                            newSectionOrder = 1;
                        }

                        var newSectionRow = $('<span data-sectionpath='+position+' data-sectionorder='+newSectionOrder+'></span>');
                        newSectionRow.append('<span class="expandedList"></span>')
                                     .append('<span class="sectionName">'+newSectionName+'</span>')
                                     .append('<span><img class="addLessonIcon" src="img/editorIcons/addLesson_icon.png"><img class="deleteSectionIcon" src="img/editorIcons/delete_icon.png" /></span>');

                        $('.sectionList').append($('<li><ul class="lessonList"></ul></li>').prepend(newSectionRow));
                        $('.lessonList').sortable({connectWith: '.lessonList'}).disableSelection();
                        thisObject.callNavReprocess();
                    }
                    else
                    {
                        new Message(data);
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

CourseEditor.prototype.openAddLessonAddition = function(lessonAdditionIcon)
{
    var thisObject = this;
    
    if(this.actionStarted === false)
    {
        this.actionStarted = true;
        var insertLessonAddition = $('<div id="insertLessonAdditionBox"><ul></ul></div>');
        insertLessonAddition.children('ul').append('<li><select id="lessonAdditionType"></select></li>');
        insertLessonAddition.find('#lessonAdditionType').append('<option value="trainingmanual">Training Manual</option>');
        insertLessonAddition.find('#lessonAdditionType').append('<option value="roleplay">Roleplay</option>');
        insertLessonAddition.find('#lessonAdditionType').append('<option value="video">Video</option>');
        insertLessonAddition.children('ul').append('<li><button class="cancel">Cancel</button><button class="create">Create</button></li>');
        createLightBox('html','Attach Lesson Resource',insertLessonAddition);
        $('#lessonAdditionType').focus();
        
        var lessonPath = lessonAdditionIcon.parents('li').first().children('span').attr('data-lessonpath');
        
        function attachLessonAddition(lessonPath)
        {
            var positionArray = lessonPath.replace(/^\/data\/material\/|\/$/g,'').split('/');

            if($('#lessonAdditionType').children('option:selected').val()=="video")
            {
                var newContent = "none";
            }
            else
            {
                newContent = "<section></section>";
            }

            var payload = {"field":positionArray[0],"subject":positionArray[1],"course":positionArray[2],"section":positionArray[3],"lesson":positionArray[4],"name":$('#lessonAdditionType').children('option:selected').val(),"content":newContent};

            $.ajax({url: 'resources/submitLessonAddition.php', data: payload, type: 'POST', success: function(data)
            {
                if(data=="Success.")
                {
                    $('#lessonAdditionType').children('option:selected').val();
                    $('#lightbox').fadeOut('fast',function() {$(this).remove();});
                    $('#overlay').fadeOut('fast',function() {$(this).remove();});
                }
            }});
        }
        
        function cancel()
        {
            $('#lightbox').fadeOut('fast',function() {$(this).remove();});
            $('#overlay').fadeOut('fast',function() {$(this).remove();});
        }

        $('#lessonAdditionType').bind('keyup', function(e)
        {
            // Enter
            if(e.keyCode==13)
            {
               attachLessonAddition(lessonPath); 
            }
            // Escape
            else if(e.keyCode==27)
            {
                cancel();
            }
        });
        
        $('#insertLessonAdditionBox button.create').click(function()
        {
            attachLessonAddition(lessonPath);
        });

        $('#insertLessonAdditionBox button.cancel').click(function()
        {
            cancel();
        });
    }
    
    thisObject.actionStarted = false;
}

// DESC: opens the add lesson lightbox and handles adding lesson
// RETURNS: void
CourseEditor.prototype.openAddLessonLightbox = function(lessonIcon)
{
    var thisObject = this;
    
    if(this.actionStarted === false)
    {
        this.actionStarted = true;
        var lessonList = $(lessonIcon).parent().parent().siblings('ul');
        var insertLesson = $('<div id="insertLessonBox"><ul></ul></div>');
        insertLesson.children('ul').append('<li><label for="newLessonName">Lesson Name</label><input id="newLessonName"></input></li>');
        insertLesson.children('ul').append('<li><button class="cancel">Cancel</button><button class="create">Create</button></li>');
        createLightBox('html','Create Lesson',insertLesson);
        $('#newLessonName').focus();

        function addLesson()
        {
            if(thisObject.isNameValid($('#newLessonName').val()))
            {
                var position =  lessonIcon.parent('span').parent('span').attr('data-sectionpath') + $.trim($('#newLessonName').val().replace(/ /g,'_')) + "/";
                var positionArray = position.replace(/^\/data\/material\/|\/$/g,'').split('/');
                var payload = {"field":positionArray[0],"subject":positionArray[1],"course":positionArray[2],"section":positionArray[3],"lesson":positionArray[4],"new_lesson":"true"};

                $.ajax({url: 'resources/submitLesson.php', data: payload, type: 'POST', success: function(data)
                {
                    if(data=="Success.")
                    {
                        var newLessonOrder = eval(lessonList.children('li').last().children('span').attr('data-lessonorder'))+1;
                        if(isNaN(newLessonOrder))
                        {
                            newLessonOrder = 1;
                        }

                        var newLessonRow = $('<span data-lessonpath='+position+' data-lessonorder='+newLessonOrder+'></span>');
                        var lessonLink = "index.php?field="+payload['field']+"&subject="+payload['subject']+"&course="+payload['course']+"&section="+payload['section']+"&lesson="+payload['lesson'];
                        newLessonRow.append('<span></span>')
                                     .append('<span class="lessonName">'+positionArray[4].replace(/_/g,' ')+'</span>')
                                     .append('<span><img class="deleteLessonIcon" src="img/editorIcons/delete_icon.png" />'+
                                             '<a href="'+lessonLink+'"><img class="editLessonIcon" src="img/editorIcons/editLesson_icon.png" /></a></span>');

                        $(lessonList).append($('<li></li>').append(newLessonRow));
                        thisObject.callNavReprocess();
                    }
                    else
                    {
                        new Message(data);
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

        $('#newLessonName').bind('keyup', function(e)
        {
            // Enter
            if(e.keyCode==13)
            {
               addLesson(); 
            }
            // Escape
            else if(e.keyCode==27)
            {
                cancel();
            }
        });

        $('#insertLessonBox button.create').click(function()
        {
            addLesson();
        });

        $('#insertLessonBox button.cancel').click(function()
        {
            cancel();
        });
    }

    thisObject.actionStarted = false;
}

// DESC: deletes a section
// PARAMETER: sectionDeleteButton is the icon that is clicked that caused the delete.
//            The button is used to determine which section to delete
// RETURNS: void
CourseEditor.prototype.deleteSection = function(sectionDeleteButton)
{
    var thisObject = this;
    
    if(this.actionStarted === false)
    {
        this.actionStarted = true;
        var thisIcon = this;

        var position =  sectionDeleteButton.parent('span').parent('span').attr('data-sectionpath');
        var positionArray = position.replace(/^\/data\/material\/|\/$/g,'').split('/');
        var payload = {"field":positionArray[0],"subject":positionArray[1],"course":positionArray[2],"section":positionArray[3]};

        $.ajax({url:'resources/deleteSection.php', data: payload, type: 'POST', success: function(data)
        {
            if(data=="Success.")
            {
                var oldOrder = sectionDeleteButton.parents('span[data-sectionorder]').attr('data-sectionorder');                 

                sectionDeleteButton.parents('ul').first().children('li').slice(oldOrder-1).children('span').each(function(index)
                {
                    $(this).attr('data-sectionorder',eval($(this).attr('data-sectionorder'))-1);
                });

                sectionDeleteButton.parents('li').first().remove();

                thisObject.callNavReprocess();
            }
            else
            {
                new Message(data);
            }

            thisObject.actionStarted = false;
        }});
    }
}

// DESC: deletes a lesson
// PARAMETER: lessonDeleteButton is the icon that is clicked that caused the delete.
//            The button is used to determine which lesson to delete
// RETURNS: void
CourseEditor.prototype.deleteLesson = function(lessonDeleteButton)
{
    var thisObject = this;
    
    if(this.actionStarted === false)
    {
        this.actionStarted = true;
 

        var position =  $(lessonDeleteButton).parent('span').parent('span').attr('data-lessonpath');
        var positionArray = position.replace(/^\/data\/material\/|\/$/g,'').split('/');
        var payload = {"field":positionArray[0],"subject":positionArray[1],"course":positionArray[2],"section":positionArray[3],"lesson":positionArray[4]};

        $.ajax({url:'resources/deleteLesson.php', data: payload, type: 'POST', success: function(data)
        {
            if(data=="Success.")
            {
                var oldOrder = $(lessonDeleteButton).parents('span[data-lessonorder]').attr('data-lessonorder');  

                $(lessonDeleteButton).parents('ul').first().children('li').slice(oldOrder-1).children('span').each(function(index)
                {
                    $(this).attr('data-lessonorder',eval($(this).attr('data-lessonorder'))-1);
                });

                 $(lessonDeleteButton).parents('li').first().remove();

                 thisObject.callNavReprocess();
            }
            else
            {
                new Message(data);
            }
        }});
    }

    thisObject.actionStarted = false;
}

// DESC: opens the recover deleted lessons lightbox and handles recovery
// PARAMETER: navPosition is the current course position
// RETURNS: void
CourseEditor.prototype.recoverDeletedLessons = function(navPosition)
{
    var thisObject = this;
    
    if(this.actionStarted === false)
    {
        this.actionStarted = true;
        var recoverLessonsBox = $('<div id="recoverLessonsBox"><ul></ul></div>');

        var positionArray = navPosition.replace(/^\/data\/material\/|\/$/g,'').split('/');
        var payload = {"field":positionArray[0],"subject":positionArray[1],"course":positionArray[2]};

        recoverLessonsBox.children('ul').append('<li><select multiple="multiple"></select></li>');

        $.ajax({url:'resources/getDeletedLessons.php',type:'GET',data:payload,success:function(data)
        {
            if(data!='"none"')
            {
                var deletedLessons = $.parseJSON(data);
                $.each(deletedLessons, function(index, value)
                {
                    recoverLessonsBox.find('ul>li>select').append('<option value="'+value.id+'">'+value.name.replace(/_/g,' ')+'</option>');
                });
            }
        }});

        recoverLessonsBox.children('ul').append('<li><button class="ok">OK</button><button class="recover">Recover</button><li>');

        createLightBox('html','Recover Deleted Lessons',recoverLessonsBox);

        $('#recoverLessonsBox button.recover').click(function()
        {
            var positionArray = thisObject.navPosition.replace(/^\/data\/material\/|\/$/g,'').split('/');
            var payload = {"field":positionArray[0],"subject":positionArray[1],"course":positionArray[2], "lesson_ids":recoverLessonsBox.find('ul>li>select').val()};
            $.ajax({url:'resources/recoverLessons.php',type:'POST',data: payload, success: function(data)
            {
                try
                {
                    var recoveredLessons = $.parseJSON(data);

                    $.each(recoveredLessons, function(index, lessonItem)
                    {                        
                        var position = thisObject.navPosition+lessonItem['section_name']+"/"+lessonItem['name']+"/";
                        var newLessonOrder = lessonItem['order'];

                        var newLessonRow = $('<span data-lessonpath='+position+' data-lessonorder='+newLessonOrder+'></span>');
                        var lessonLink = "index.php?field="+payload['field']+"&subject="+payload['subject']+"&course="+payload['course']+"&section="+lessonItem['section_name']+"&lesson="+lessonItem['name'];

                        newLessonRow.append('<span></span>')
                                 .append('<span class="lessonName">'+lessonItem['name'].replace(/_/g,' ')+'</span>')
                                 .append('<span><img class="deleteLessonIcon" src="img/editorIcons/delete_icon.png" />'+
                                         '<a href="'+lessonLink+'"><img class="editLessonIcon" src="img/editorIcons/editLesson_icon.png" /></a></span>');

                        $('span[data-sectionpath="'+thisObject.navPosition+lessonItem['section_name']+"/"+'"]').parent('li').children('ul.lessonList').append($('<li></li>').append(newLessonRow));

                        $('#recoverLessonsBox select option[value="'+lessonItem['id']+'"]').remove();
                    });

                    thisObject.callNavReprocess();

                }
                catch(e)
                {
                    new Message(data);
                }
            }});
        });

        $('#recoverLessonsBox button.ok').click(function()
        {
            $('#lightbox').fadeOut('fast',function() {$(this).remove();});
            $('#overlay').fadeOut('fast',function() {$(this).remove();});
        });
    }

    this.actionStarted = false;
}

function CourseEditor()
{
    this.navPosition = $('#listEditorHeader').attr('data-coursepath');
	var thisObject = this;
    
	$('.sectionList').sortable().disableSelection();
	$('.lessonList').sortable({connectWith: '.lessonList'}).disableSelection();
	
	// Section re-ordering makes ajax request
	$(document).on("sortstop",'.sectionList',function(e,ui)
	{
        thisObject.sortSection($(ui.item));
	});
    
    $(document).on("sort",'.sectionList',function(e,ui)
    {
        if(thisObject.actionStarted)
        {
            e.preventDefault();
        }
    });
	
	// Lesson re-ordering makes ajax request
	$(document).on("sortstop",'.lessonList',function(e,ui)
	{
        thisObject.sortLesson($(ui.item),$(e.target));
	});
    
    $(document).on("sort",'.lessonList',function(e,ui)
    {
        if(thisObject.actionStarted)
        {
            e.preventDefault();
        }
    });
	
	// Edit section name
	$(document).on('click','span.sectionName',function()
	{
        thisObject.editSectionName($(this));
	});
	
	$(document).on('blur','input.sectionName',function()
	{
        if($(this).attr('data-revert')!="true")
        {
            thisObject.renameSection(this,$(this).val());
        }
	});
	
	// Edit lesson name
	$(document).on('click','span.lessonName',function()
	{
        thisObject.editLessonName($(this));
	});
	
	$(document).on('blur','input.lessonName',function()
	{
        if($(this).attr('data-revert')!="true")
        {
            thisObject.renameLesson(this,$(this).val());
        }
	});
	
	// Contract List
	$(document).on('click','.listEditor .expandedList img',function()
	{
		var minusImage = this;
		$(minusImage).parents('li').children('ul').slideUp(400,function()
		{
			$(minusImage).attr('src','img/editorIcons/plus_icon.png');
			$(minusImage).parents('.expandedList').removeClass('expandedList').addClass('contractedList');
		});
	});
	
	// Expand List
	$(document).on('click','.listEditor .contractedList img',function()
	{
		var plusImage = this;
		$(plusImage).parents('li').children('ul').slideDown(400,function()
		{
			$(plusImage).attr('src','img/editorIcons/minus_icon.png');
			$(plusImage).parents('.contractedList').removeClass('contractedList').addClass('expandedList');
		});
	});
	
	// Add Section Button
	$(document).on('click','#listEditorHeader #addSectionIcon',function()
	{
        thisObject.openAddSectionLightbox();
	});
	
	// Add Lesson Button
	$(document).on('click','.addLessonIcon',function()
	{
        thisObject.openAddLessonLightbox($(this));
	});
    
    // Delete Section
    $(document).on('click','.deleteSectionIcon',function()
    {
        thisObject.deleteSection($(this));
    });
    
    // Delete Lesson
    $(document).on('click','.deleteLessonIcon',function()
    {
        thisObject.deleteLesson($(this));
    });
    
    // Add Lesson Addition
    $(document).on('click','.addLessonAddition',function()
    {
        thisObject.openAddLessonAddition($(this));
    });
    
    // Recover Deleted Lessons
    $(document).on('click','#recoverDeletedLessons',function()
    {
        thisObject.recoverDeletedLessons(thisObject.navPosition);
    });
}