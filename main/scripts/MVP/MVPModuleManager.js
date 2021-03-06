$(document).ready(function()
{
    mvpModuleManager = new MVPModuleManager();
})

// DESC: If an action is started, is set to true.  when completed, it is set to false.
//       If actionStarted is true, a new action like a sort cannot start
MVPModuleManager.prototype.actionStarted = false;

// DESC: Adds module to My Modules
// PARAMETERS: data is the data returned by AJAX from submitLessonPlan
//             moduleImage is the image for the module
//             lessonPlanName is the name of the lesson plan
//             notes are the lesson plan notes
//             tags are the tags for the lesson plan
//             age is the target age of the patients
//             gender is the target gender of the patients
//             literacy is a boolean that tells whether the lesson plan requires literacy
// RETURNS: void
MVPModuleManager.prototype.addLessonPlanToDOM = function(data,moduleImage,lessonPlanName,notes,tags,location,age,gender,literacy)
{
    try
    {
        var lessonPlanIdArray = $.parseJSON(data);

        var lessonPlanRow = $('<li data-lessonplanid="'+lessonPlanIdArray['id']+'" item="material"></li>');
        $(lessonPlanRow).append('<a href="index.php?type=lessonPlan&id='+lessonPlanIdArray['id']+'&section='+moduleImage+'&lesson='+moduleImage+'"></a>');
        $(lessonPlanRow).children('a').append('<img src="img/navIcons/'+moduleImage+'.png" />')
        $(lessonPlanRow).children('a').append('<div class="moduleContent"></div>')
        $(lessonPlanRow).find ('a .moduleContent');
        $(lessonPlanRow).find('a .moduleContent').append('<h3>'+lessonPlanName+'</h3>');
        $(lessonPlanRow).find('a .moduleContent').append('<p class="notes">'+notes+'</p>');
        var genderText = gender=="both" ? "both genders" : gender;
        var literacyText = literacy=="yes" ? "literacy required" : "literacy not required"
        if(tags=="")
        {
            $(lessonPlanRow).find('a .moduleContent').append('<p class="tags"><strong>Tags:</strong> <span class="moduleLocation">'+location+'</span>, <span class="moduleAge">'+age+'</span>, <span class="moduleGender">'+genderText+'</span>, <span class="moduleLiteracy">'+literacyText+'</span></td>');
        }
        else
        {
            $(lessonPlanRow).find('a .moduleContent').append('<p class="tags"><strong>Tags:</strong> <span class="moduleTags">'+tags+'</span>, <span class="moduleLocation">'+location+'</span>, <span class="moduleAge">'+age+'</span>, <span class="moduleGender">'+genderText+'</span>, <span class="moduleLiteracy">'+literacyText+'</span></td>');
        }

        if($('#myModules ul').children('li[data-lessonplanid="'+lessonPlanIdArray['id']+'"]').size()==0)
        {
            $('#myModules ul').append(lessonPlanRow);
        }
        else
        {
            $('#myModules ul').children('li[data-lessonplanid="'+lessonPlanIdArray['id']+'"]').replaceWith(lessonPlanRow);
        }

        $('#lightbox').fadeOut('fast',function() {$(this).remove();});
        $('#overlay').fadeOut('fast',function() {$(this).remove();});
    }
    catch(e)
    {
        new Message(data);
    }
}

// DESC: Creates the content for the add lesson plan light box
// RETURNS: voids
MVPModuleManager.prototype.createAddLessonPlanLightbox = function()
{
    var createLessonPlan = $('<div id="createLessonPlan"><ul></ul></div>');
    createLessonPlan.children('ul').append('<li><label for="newLessonPlanName">Module Name</label><input id="newLessonPlanName" value=""></input></li>');
    createLessonPlan.children('ul').append('<li><label for="newLessonPlanLocation">Location</label><select id="newLessonPlanLocation"></select></li>');
    createLessonPlan.children('ul').append('<li><label for="newLessonPlanAge">Target Patient Age</label><select id="newLessonPlanAge"></select></li>');
    createLessonPlan.children('ul').find('#newLessonPlanAge').append('<option value="adult">Adult</option><option value="oneToFive">One to Five Years Old</option><option value="zeroToOne">Zero to One Years Old</option><option value="newborn">Newborn</option>');
    createLessonPlan.children('ul').append('<li><label for="newLessonPlanGender">Target Patient Gender</label><select id="newLessonPlanGender"></select></li>');
    createLessonPlan.children('ul').find('#newLessonPlanGender').append('<option value="both">Both</option><option value="female">Female</option><option value="male">Male</option>');
    createLessonPlan.children('ul').find('#newLessonPlanLocation').append('<option value="potou">Potou, Senegal</option>').
                                                              append('<option value="tiby">Tiby, Mali</option>').
                                                              append('<option value="toya">Toya, Mali</option>').
                                                              append('<option value="sada">SADA, Northern Ghana</option>').
                                                              append('<option value="pampaida">Pampaida, Nigeria</option>').
                                                              append('<option value="bonsaaso">Bonsaaso, Ghana</option>').
                                                              append('<option value="ikaram">Ikaram, Nigeria</option>').
                                                              append('<option value="koraro">Koraro, Ethiopia</option>').
                                                              append('<option value="sauri">Sauri, Kenya</option>').
                                                              append('<option value="dertu">Dertu, Kenya</option>').
                                                              append('<option value="ruhira">Ruhira, Kenya</option>').
                                                              append('<option value="mayange">Mayange, Rwanda</option>').
                                                              append('<option value="mbola">Mbola, Tanzania</option>').
                                                              append('<option value="gumulira">Gumulira, Malawi</option>').
                                                              append('<option value="mwandama">Mwandama, Mali</option>');
    createLessonPlan.children('ul').append('<li><label for="newLessonPlanLiteracy">Literacy Required</label><select id="newLessonPlanLiteracy"><option value="yes">Yes</option><option value="no">No</option></select></li>');
    createLessonPlan.children('ul').append('<li><label for="newTags">Tags (comma-separated)</label><input id="newTags" value=""></input></li>');
    createLessonPlan.children('ul').append('<li><label for="newNotes">Notes</label><textarea id="newNotes"></textarea></li>');
    createLessonPlan.children('ul').append('<li><label for="newLessonPlanImage">Image</label><select id="newLessonPlanImage"></select></li>');
    createLessonPlan.children('ul').find('#newLessonPlanImage').append('<option value="CHW_Overview">CHW Overview</option>').
                                                              append('<option value="Cough">Cough</option>').
                                                              append('<option value="Diarrhea">Diarrhea</option>').
                                                              append('<option value="Fever">Fever</option>').
                                                              append('<option value="Bednets">Bednets</option>').
                                                              append('<option value="Vaccinations">Vaccinations</option>').
                                                              append('<option value="Hygiene_and_Sanitation">Hygiene and Sanitation</option>').
                                                              append('<option value="Nutrition">Nutrition</option>').
                                                              append('<option value="Water_Treatment">Water Treatment</option>').
                                                              append('<option value="Safe_Food_Handling">Safe Food Handling</option>').
                                                              append('<option value="Antenatal_Care">Antenatal Care</option>').
                                                              append('<option value="Newborn_Care">Newborn Care</option>');
    createLessonPlan.children('ul').append('<li><button class="cancel">Cancel</button><button class="create">Create</button></li>');
    
    return createLessonPlan;
}

// DESC: Opens the add lesson plan light box
// PARAMETERS: lessonPlanId is the id of the lesson plan whose lightbox should be opened ("undefined" for new lesson plans)
// RETURNS: void
MVPModuleManager.prototype.openAddLessonPlanLightbox = function(lessonPlanId)
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
            var currentLocation = "potou";
            var currentAge = "adult";
            var currentGender = "both";
            var currentLiteracy = "yes";
            var currentImage = "CHW_Overview";
        }
        else
        {
            var currentName = $('#myModules ul').find('li[data-lessonplanid="'+lessonPlanId+'"] a .moduleContent').children('h3').text();
            var currentTags = $('#myModules ul').find('li[data-lessonplanid="'+lessonPlanId+'"] a .moduleContent').children('.tags').children('.moduleTags').text();
            var currentNotes = $('#myModules ul').find('li[data-lessonplanid="'+lessonPlanId+'"] a .moduleContent').children('.notes').text();
            var currentLocation = $('#myModules ul').find('li[data-lessonplanid="'+lessonPlanId+'"] a .moduleContent').children('.tags').children('.moduleLocation').text();
            var currentAge = $('#myModules ul').find('li[data-lessonplanid="'+lessonPlanId+'"] a .moduleContent').children('.tags').children('.moduleAge').text();
            var currentGender = $('#myModules ul').find('li[data-lessonplanid="'+lessonPlanId+'"] a .moduleContent').children('.tags').children('.moduleGender').text();
            var currentLiteracy = $('#myModules ul').find('li[data-lessonplanid="'+lessonPlanId+'"] a .moduleContent').children('.tags').children('.moduleLiteracy').text() == "literacy required" ? "yes" : "no";
            var imgSource = $('#myModules ul').find('li[data-lessonplanid="'+lessonPlanId+'"] a').children('img').first().attr('src');
            var currentImage = imgSource.substring(imgSource.lastIndexOf('/')+1,imgSource.lastIndexOf('.'));
        }
        
        var createLessonPlan = thisObject.createAddLessonPlanLightbox();
        
        createLessonPlan.children('ul').find('#newLessonPlanName').val(currentName);
        createLessonPlan.children('ul').find('#newTags').val(currentTags);
        createLessonPlan.children('ul').find('#newNotes').val(currentNotes);
        createLessonPlan.children('ul').find('#newLessonPlanLocation').children('option[value="'+currentLocation+'"]').attr('selected','selected');
        createLessonPlan.children('ul').find('#newLessonPlanAge').children('option[value="'+currentAge+'"]').attr('selected','selected');
        createLessonPlan.children('ul').find('#newLessonPlanGender').children('option[value="'+currentGender+'"]').attr('selected','selected');
        createLessonPlan.children('ul').find('#newLessonPlanLiteracy').children('option[value="'+currentLiteracy+'"]').attr('selected','selected');
        createLessonPlan.children('ul').find('#newLessonPlanImage').children('option[value="'+currentImage+'"]').attr('selected','selected');

        if(typeof(lessonPlanId)!="undefined")
        {
            createLessonPlan.children('ul').find('#newLessonPlanImage').parent('li').hide();
        }
        
        createLightBox('html','Create Module',createLessonPlan);
        $('#newLessonPlanName').focus();
        
        this.updateLessonAdditions(currentImage.replace(/ /g,' '),lessonPlanId);
        
        $('#newLessonPlanImage').change(function()
        {
            thisObject.updateLessonAdditions($('#newLessonPlanImage').val(),lessonPlanId);
        })
        
        function addLessonPlan(id,lessonPlanName,tags,notes,location,age,gender,literacy,moduleImage,lessonAdditions)
        {
            var tagArray = tags.split(",");
            var payload = {id:id,lessonPlanName: lessonPlanName, tags: tagArray, notes: notes, location: location, age: age, gender: gender, literacy: literacy,image: moduleImage,additions: lessonAdditions};

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
               var lessonAdditions = {};
               $('.lessonAdditionInclusion').each(function()
               {
                   lessonAdditions[$(this).attr('id').replace(/Addition/,'')] = $(this).is(':checked');
               })
               
               addLessonPlan(lessonPlanId,$('#newLessonPlanName').val().replace(/_/g,' '),$('#newTags').val(),$('#newNotes').val(),$('#newLessonPlanLocation').val(),$('#newLessonPlanAge').val(),$('#newLessonPlanGender').val(),$('#newLessonPlanLiteracy').val(),$("#newLessonPlanImage").val(),lessonAdditions);
            }
            // Escape
            else if(e.keyCode==27)
            {
                cancel();
            }
        });

        $('#createLessonPlan button.create').click(function()
        {
            var lessonAdditions = {};
            $('.lessonAdditionInclusion').each(function()
            {
                lessonAdditions[$(this).attr('id').replace(/Addition/,'')] = $(this).is(':checked');
            });
            
            addLessonPlan(lessonPlanId,$('#newLessonPlanName').val().replace(/_/g,' '),$('#newTags').val(),$('#newNotes').val(),$('#newLessonPlanLocation').val(),$('#newLessonPlanAge').val(),$('#newLessonPlanGender').val(),$('#newLessonPlanLiteracy').val(),$("#newLessonPlanImage").val(),lessonAdditions);
        });

        $('#createLessonPlan button.cancel').click(function()
        {
            cancel();
        });
    }
}

// DESC: Updates lesson additions based on what image is chosen
// RETURNS: void
MVPModuleManager.prototype.updateLessonAdditions = function(imageName,lessonPlanId)
{
    var payload = {field:"CHW_Training",subject:"CHW_Training",course:imageName,section:imageName};
    
    $.ajax({url:'resources/getCourseNav.php', type: 'POST', data: payload, success: function(data)
    {
        var jsonArray = $.parseJSON(data);
        
        $('.lessonAdditionInclusion').parent('li').remove();
        
        $('#createLessonPlan ul').children('li:last-of-type').before('<li></li>');
        $('#createLessonPlan ul').children('li:last-of-type').prev().append('<label for="quizAddition">Quiz</label><input type="checkbox" class="lessonAdditionInclusion" id="quizAddition"></input>');
        
        $.each(jsonArray.children[0].lessonAdditions,function(index,value)
        {
            if(value=="trainingmanual")
            {
                var additionName = "Training Manual";
            }
            else if(value=="roleplay")
            {
                additionName = "Roleplay";
            }
            else if(value=="video")
            {
                additionName = "Video";
            }
            
            $('#createLessonPlan ul').children('li:last-of-type').before('<li></li>').prev().append('<label for="'+value+'Addition">'+additionName+'</label><input type="checkbox" class="lessonAdditionInclusion" id="'+value+'Addition"></input>')
        });

        centerLightBox();

        if(typeof(lessonPlanId)=="undefined")
        {
            $('.lessonAdditionInclusion').attr('checked','checked')
        }
        else
        {
            var navPosition = {moduleId:lessonPlanId};

            $.ajax({url : 'resources/getModuleNav.php', type: 'GET', data: navPosition,success: function(data)
            {
                var jsonArray = $.parseJSON(data);

                $.each(jsonArray.children[0].lessons[0].additions,function(index, value)
                {
                    $('#'+value+'Addition').attr('checked','checked')
                });
            }});
        }
    }});
}

// DESC: Adds edit (if applicable) and delete buttons to module on hover
// PARAMETERS: listItem is the module to add buttons to
// RETURNS: void
MVPModuleManager.prototype.addButtonsToMyModule = function(listItem)
{
    if($(listItem).attr('data-lessonplanid')!==undefined)
    {
        $(listItem).append("<img class='deleteMyModule' src='img/editorIcons/delete_icon.png' />"+
                           "<img class='editMyModule' src='img/editorIcons/editLesson_icon.png' />");
    }
    else if($(listItem).attr('data-coursepath')!==undefined)
    {
        $(listItem).append("<img class='deleteMyModule' src='img/editorIcons/delete_icon.png' />");
    }
}

// DESC: Removes edit (if applicable) and delete buttons on module
// PARAMETERS: listItem is the module to remove buttons from
// RETURNS: void
MVPModuleManager.prototype.removeButtonsToMyModule = function(listItem)
{
    $(listItem).children('.deleteMyModule,.editMyModule').remove();
}

MVPModuleManager.prototype.deleteLessonPlan = function(listItem)
{
    if($(listItem).attr('data-userlessonplanid')===undefined)
    {
        var payload = {"lessonPlanId":$(listItem).attr('data-lessonplanid'),"image":$(listItem).find('img').attr('src').substring($(listItem).find('img').attr('src').lastIndexOf('/')+1,$(listItem).find('img').attr('src').lastIndexOf('.png'))};

        $.ajax({url:'resources/deleteLessonPlan.php', type: 'POST', data: payload, success: function(data)
        {
            if(data=="Success.")
            {
                $(listItem).remove();
            }
            else
            {
                new Message(data);
            }
        }});
    }
    else
    {
        $.ajax({url:'resources/deleteMyLessonPlan.php', type: 'POST', data: {"id":$(listItem).attr('data-userlessonplanid')}, success: function(data)
        {
            if(data=="Success.")
            {
                $(listItem).remove();
            }
            else
            {
                new Message(data);
            }
        }});
    }
}

function MVPModuleManager()
{
    var thisObject = this;
    
    $('#addModule').click(function()
    {
        thisObject.openAddLessonPlanLightbox();
    });
    
    $(document).on('click','.deleteModule',function(e)
    {
        thisObject.deleteLessonPlan($(this).parent('li').attr('data-lessonplanid'));
    });
    
    $(document).on('click','.editModule',function()
    {
        thisObject.openAddLessonPlanLightbox($(this).parent('li').attr('data-lessonplanid'));
    });
    
    $('#myModules ul').on({
                            mouseenter:function()
                            {
                                thisObject.addButtonsToMyModule(this);
                            },
                            mouseleave:function()
                            {
                                thisObject.removeButtonsToMyModule(this);
                            }
                          }, "li");
    
    $('#myModules ul').on({
                            click:function()
                            {
                                thisObject.openAddLessonPlanLightbox($(this).parents('li').first().attr('data-lessonplanid'));
                            }
                          }, "li .editMyModule");
    
    $('#myModules ul').on({
                            click:function()
                            {
                                thisObject.deleteLessonPlan($(this).parents('li').first());
                            }
                          }, "li .deleteMyModule");
}