$(document).ready(function()
{
	courseEditor = new CourseEditor();
});

this.actionStarted = false;
this.navPosition = $('#coursenav').attr('data-navPosition');

CourseEditor.prototype.isNameValid = function(nameToCheck)
{
    return nameToCheck.length>0&&nameToCheck.search(/\//)==-1;
}

CourseEditor.prototype.drawExpandButton = function()
{
    $('#content ul.sectionList>li>span>span:first-of-type');
}

CourseEditor.prototype.callNavReprocess = function()
{
    if($('#coursenav').attr('data-navPosition')==$('#listEditorHeader').attr('data-coursepath'))
    {
        navigationBar.processPosition($('#coursenav').attr('data-navPosition'));
    }
}

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

function CourseEditor()
{
	var thisObject = this;
    
	$('.sectionList').sortable().disableSelection();
	$('.lessonList').sortable({connectWith: '.lessonList'}).disableSelection();
	
	// Section re-ordering makes ajax request
	$('.sectionList').live("sortstop",function(e,ui)
	{
        if(thisObject.actionStarted === false)
		{
			thisObject.actionStarted = true;
            var sectionSpan = $(ui.item).children('span[data-sectionpath]');
            
            var oldOrder = eval(sectionSpan.attr('data-sectionorder'));
            var path = sectionSpan.attr('data-sectionpath');

            var prevElementOrder = eval($(ui.item).prev().children('span').attr('data-sectionorder'));

            if(isNaN(prevElementOrder))
            {
                newOrder = 1;
            }
            else
            {
                if(oldOrder>prevElementOrder)
                {
                    var newOrder = eval($(ui.item).prev().children('span').attr('data-sectionorder'))+1;
                }
                else
                {
                    var newOrder = eval($(ui.item).prev().children('span').attr('data-sectionorder'));
                }
            }

            var payload = {"oldPath":path, "oldOrder":oldOrder, "newPath":path, "newOrder":newOrder};

            $.ajax({url: 'resources/changePosition.php', data: payload, success: function(data)
            {
                if(data=="Success.")
                {
                    var list = $(ui.item).parents('ul');

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
                        $(ui.item).prependTo('.sectionList')
                    }
                    else
                    {
                        $(ui.item).insertAfter($('.sectionList').children('li').eq(oldOrder-2));
                    }
                }
            }, complete: function()
            {
                thisObject.actionStarted = false;
            }});
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
        if(thisObject.actionStarted === false)
		{
			thisObject.actionStarted = true;
            e.stopPropagation();

            var lessonSpan = $(ui.item).children('span[data-lessonpath]');

            var oldPath = lessonSpan.attr('data-lessonpath').replace(/content\/$/,'');
            var oldOrder = eval(lessonSpan.attr('data-lessonorder'));
            var oldList = $(e.target);

            var newList = $(ui.item).parents('ul').first();
            var newPath = newList.prev('span').attr('data-sectionpath') + $.trim(lessonSpan.children('span').eq(1).text().replace(/ /g,'_')) + '/';

            var prevElementOrder = eval($(ui.item).prev().children('span').attr('data-lessonorder'));
            if(isNaN(prevElementOrder))
            {
                var newOrder = 1;
            }
            else
            {
                if(newList[0]!=oldList[0]||oldOrder>prevElementOrder)
                {
                    var newOrder = eval($(ui.item).prev().children('span').attr('data-lessonorder'))+1;
                }
                else
                {
                    var newOrder = eval($(ui.item).prev().children('span').attr('data-lessonorder'));
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
                        $(ui.item).prependTo(oldList);
                    }
                    else
                    {
                        $(ui.item).insertAfter(oldList.children('li').eq(oldOrder-2));
                    }
                }
            }, complete: function()
            {
                thisObject.actionStarted = false;
            }});
        }
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
        if(thisObject.actionStarted === false)
		{
			thisObject.actionStarted = true;
			var sectionName = $(this).text();
			var sectionInput = $('<input type="text" class="sectionName" value="'+sectionName+'" />');
			$(this).replaceWith(sectionInput);
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
        
        thisObject.actionStarted = false;
	});
	
	$('input.sectionName').live('blur',function()
	{
        if($(this).attr('data-revert')!="true")
        {
            thisObject.renameSection(this,$(this).val());
        }
	});
	
	// Edit lesson name
	$('span.lessonName').live('click',function()
	{
        if(thisObject.actionStarted === false)
		{
			thisObject.actionStarted = true;
			var lessonName = $(this).text();
			var lessonInput = $('<input type="text" class="lessonName" value="'+lessonName+'" />');
			$(this).replaceWith(lessonInput);
			lessonInput.focus();
			
			$('html').live('mousedown',function(e)
			{
                if($(lessonInput).attr('data-revert')!="true")
                {
                    thisObject.renameLesson(lessonInput,lessonInput.val());
                    $('html').die('mousedown');
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
						$('html').die('mousedown');
						break;
                    // Escape
                    case 27:
                        if(lessonInput.size()>0)
                        {
                            $(this).attr("data-revert","true");
                            $(this).replaceWith('<span class="lessonName">'+lessonName+'</span>');
                        }
                        $('html').die('mousedown');
                        break;
				}
			});
			
			$(lessonInput).bind('mousedown',function(e)
			{
				e.stopPropagation();
			});
        }
        
        thisObject.actionStarted = false;
	});
	
	$('input.lessonName').live('blur',function()
	{
        if($(this).attr('data-revert')!="true")
        {
            thisObject.renameLesson(this,$(this).val());
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
        if(thisObject.actionStarted === false)
		{
			thisObject.actionStarted = true;
            var insertSection = $('<div id="insertSectionBox"><ul></ul></div>');
            insertSection.children('ul').append('<li><label for="newSectionName">Section Name</label><input id="newSectionName"></input></li>');
            insertSection.children('ul').append('<li><button class="cancel">Cancel</button><button class="create">Create</button></li>');
            createLightBox('#content','Create Section',insertSection);
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
                            newSectionRow.append('<span class="expandedList"><img src="img/editorIcons/minus_icon.png"></span>')
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
        
        thisObject.actionStarted = false;
	});
	
	// Add Lesson Button
	$('.addLessonIcon').live('click',function()
	{
        if(thisObject.actionStarted === false)
		{
			thisObject.actionStarted = true;
            var thisIcon = this;
            var lessonList = $(this).parent().parent().siblings('ul');
            var insertLesson = $('<div id="insertLessonBox"><ul></ul></div>');
            insertLesson.children('ul').append('<li><label for="newLessonName">Lesson Name</label><input id="newLessonName"></input></li>');
            insertLesson.children('ul').append('<li><button class="cancel">Cancel</button><button class="create">Create</button></li>');
            createLightBox('#content','Create Lesson',insertLesson);
            $('#newLessonName').focus();

            function addLesson()
            {
                if(thisObject.isNameValid($('#newLessonName').val()))
                {
                    var position =  $(thisIcon).parent('span').parent('span').attr('data-sectionpath') + $.trim($('#newLessonName').val().replace(/ /g,'_')) + "/";
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
                            newLessonRow.append('<span></span>')
                                         .append('<span class="lessonName">'+positionArray[4].replace(/_/g,' ')+'</span>')
                                         .append('<span><img class="deleteLessonIcon" src="img/editorIcons/delete_icon.png" /></span>');

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
	});
    
    // Delete Section
    $('.deleteSectionIcon').live('click',function()
    {
        if(thisObject.actionStarted === false)
		{
			thisObject.actionStarted = true;
            var thisIcon = this;

            var position =  $(thisIcon).parent('span').parent('span').attr('data-sectionpath');
            var positionArray = position.replace(/^\/data\/material\/|\/$/g,'').split('/');
            var payload = {"field":positionArray[0],"subject":positionArray[1],"course":positionArray[2],"section":positionArray[3]};

            $.ajax({url:'resources/deleteSection.php', data: payload, type: 'POST', success: function(data)
            {
                if(data=="Success.")
                {
                    var oldOrder = $(thisIcon).parents('span[data-sectionorder]').attr('data-sectionorder');                 
                    
                    $(thisIcon).parents('ul').first().children('li').slice(oldOrder-1).children('span').each(function(index)
                    {
                        $(this).attr('data-sectionorder',eval($(this).attr('data-sectionorder'))-1);
                    });

                    $(thisIcon).parents('li').first().remove();
                    
                    thisObject.callNavReprocess();
                }
                else
                {
                    new Message(data);
                }
                
                thisObject.actionStarted = false;
            }});
        }
    });
    
    // Delete Lesson
    $('.deleteLessonIcon').live('click',function()
    {
        if(thisObject.actionStarted === false)
		{
			thisObject.actionStarted = true;
            var thisIcon = this;

            var position =  $(thisIcon).parent('span').parent('span').attr('data-lessonpath');
            var positionArray = position.replace(/^\/data\/material\/|\/$/g,'').split('/');
            var payload = {"field":positionArray[0],"subject":positionArray[1],"course":positionArray[2],"section":positionArray[3],"lesson":positionArray[4]};

            $.ajax({url:'resources/deleteLesson.php', data: payload, type: 'POST', success: function(data)
            {
                if(data=="Success.")
                {
                    var oldOrder = $(thisIcon).parents('span[data-lessonorder]').attr('data-lessonorder');  

                    $(thisIcon).parents('ul').first().children('li').slice(oldOrder-1).children('span').each(function(index)
                    {
                        $(this).attr('data-lessonorder',eval($(this).attr('data-lessonorder'))-1);
                    });

                     $(thisIcon).parents('li').first().remove();
                     
                     thisObject.callNavReprocess();
                }
                else
                {
                    new Message(data);
                }
            }});
        }
        
        thisObject.actionStarted = false;
    });
    
    // Recover Deleted Lessons
    $('#recoverDeletedLessons').live('click',function()
    {
        if(thisObject.actionStarted === false)
		{
			thisObject.actionStarted = true;
            var recoverLessonsBox = $('<div id="recoverLessonsBox"><ul></ul></div>');

            var positionArray = thisObject.navPosition.replace(/^\/data\/material\/|\/$/g,'').split('/');
            var payload = {"field":positionArray[0],"subject":positionArray[1],"course":positionArray[2]};

            recoverLessonsBox.children('ul').append('<li><select multiple="multiple"></select></li>');

            $.ajax({url:'resources/getDeletedLessons.php',type:'GET',data:payload,success:function(data)
            {
                var deletedLessons = $.parseJSON(data);
                $.each(deletedLessons, function(index, value)
                {
                    recoverLessonsBox.find('ul>li>select').append('<option value="'+value.id+'">'+value.name.replace(/_/g,' ')+'</option>');
                });
            }});

            recoverLessonsBox.children('ul').append('<li><button class="ok">OK</button><button class="recover">Recover</button><li>');

            createLightBox('#content','Recover Deleted Lessons',recoverLessonsBox);

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
                            position = thisObject.navPosition+lessonItem['section_name']+"/"+lessonItem['name']+"/";
                            newLessonOrder = lessonItem['order'];

                            var newLessonRow = $('<span data-lessonpath='+position+' data-lessonorder='+newLessonOrder+'></span>');

                            newLessonRow.append('<span></span>')
                                     .append('<span class="lessonName">'+lessonItem['name'].replace(/_/g,' ')+'</span>')
                                     .append('<span><img class="deleteLessonIcon" src="img/editorIcons/delete_icon.png" /></span>');

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
        
        thisObject.actionStarted = false;
    });
}