$(document).ready(function()
{
    lessonPlanManager = new LessonPlanManager();
})

// DESC: If an action is started, is set to true.  when completed, it is set to false.
//       If actionStarted is true, a new action like a sort cannot start
LessonPlanManager.prototype.actionStarted = false;

LessonPlanManager.prototype.openAddLessonPlanLightbox = function(lessonPlanId)
{
    var thisObject = this;
        
    if(this.actionStarted===false)
    {
        this.actionStarted=true;
        
        if(typeof(lessonPlanId)=="undefined")
        {
            var currentName = "";
            var currentTags = "";
            var currentNotes = "";
        }
        else
        {
            console.log($('#lessonplans tbody').children('tr[data-lessonplanid="'+lessonPlanId+'"]'));
            var currentName = $('#lessonplans tbody').children('tr[data-lessonplanid="'+lessonPlanId+'"]').children().first().text();
            var currentTags = $($('#lessonplans tbody').children('tr[data-lessonplanid="'+lessonPlanId+'"]').children().get(1)).text();
            var currentNotes = $($('#lessonplans tbody').children('tr[data-lessonplanid="'+lessonPlanId+'"]').children().get(2)).text();
        }
        
        var createLessonPlan = $('<div id="createLessonPlan"><ul></ul></div>');
        createLessonPlan.children('ul').append('<li><label for="newLessonPlanName">Lesson Plan Name</label><input id="newLessonPlanName" value="'+currentName+'"></input></li>');
        createLessonPlan.children('ul').append('<li><label for="newTags">Tags (comma-separated)</label><input id="newTags" value="'+currentTags+'"></input></li>');
        createLessonPlan.children('ul').append('<li><label for="newNotes">Notes</label><textarea id="newNotes">'+currentNotes+'</textarea></li>');
        createLessonPlan.children('ul').append('<li><button class="cancel">Cancel</button><button class="create">Create</button></li>');
        createLightBox('#content','Create Lesson Plan',createLessonPlan);
        $('#newLessonPlanName').focus();
        
        function addLessonPlan(id,lessonPlanName,tags,notes)
        {
            var tagArray = tags.split(",");
            var payload = {id:id,lessonPlanName: lessonPlanName, tags: tagArray, notes: notes};

            $.ajax({url:'resources/submitLessonPlan.php', type: 'POST', data: payload, success: function(data)
            {
                try
                {
                    var lessonPlanIdArray = $.parseJSON(data);

                    var lessonPlanRow = $('<tr data-lessonplanid="'+lessonPlanIdArray['id']+'"></tr>');
                    $(lessonPlanRow).append('<td><a href="index.php?lessonPlanId='+lessonPlanIdArray['id']+'">'+lessonPlanName+'</a></td>');
                    $(lessonPlanRow).append('<td>'+tags+'</td>');
                    $(lessonPlanRow).append('<td>'+notes+'</td>');
                    $(lessonPlanRow).append('<td><img title="Edit Lesson" class="editLessonPlanIcon" src="img/editorIcons/editLesson_icon.png" />'+
                                            '<img title="Delete Lesson" class="deleteLessonPlanIcon" src="img/editorIcons/delete_icon.png" /></td>');

                    if($('#lessonplans tbody').children('tr[data-lessonplanid="'+lessonPlanIdArray['id']+'"]').size()==0)
                    {
                        $('#lessonplans').append(lessonPlanRow);
                    }
                    else
                    {
                        $('#lessonplans tbody').children('tr[data-lessonplanid="'+lessonPlanIdArray['id']+'"]').replaceWith(lessonPlanRow);
                    }
                    
                    $('#lightbox').fadeOut('fast',function() {$(this).remove();});
                    $('#overlay').fadeOut('fast',function() {$(this).remove();});
                }
                catch(e)
                {
                    new Message(data);
                }
                
                
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
               addLessonPlan(lessonPlanId,$('#newLessonPlanName').val().replace(/_/g,' '),$('#newTags').val(),$('#newNotes').val()); 
            }
            // Escape
            else if(e.keyCode==27)
            {
                cancel();
            }
        });

        $('#createLessonPlan button.create').click(function()
        {
            addLessonPlan(lessonPlanId,$('#newLessonPlanName').val().replace(/_/g,' '),$('#newTags').val(),$('#newNotes').val());
        });

        $('#createLessonPlan button.cancel').click(function()
        {
            cancel();
        });
    }
}

LessonPlanManager.prototype.deleteLessonPlan = function(lessonPlanId)
{
    $.ajax({url:'resources/deleteLessonPlan.php', type: 'POST', data: {"lessonPlanId":lessonPlanId}, success: function(data)
    {
        if(data=="Success.")
        {
            $('#lessonplans tbody').children('tr[data-lessonplanid="'+lessonPlanId+'"]').remove();
        }
        else
        {
            new Message(data);
        }
    }});
}

function LessonPlanManager()
{
    var thisObject = this;
    
    $('#addLessonPlan').click(function()
    {
        thisObject.openAddLessonPlanLightbox();
    });
    
    $('.deleteLessonPlanIcon').live('click',function()
    {
        thisObject.deleteLessonPlan($(this).parents('tr').first().attr('data-lessonplanid'));
    });
    
    $('.editLessonPlanIcon').live('click',function()
    {
        thisObject.openAddLessonPlanLightbox($(this).parents('tr').first().attr('data-lessonplanid'));
    });
}