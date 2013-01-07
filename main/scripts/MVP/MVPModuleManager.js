$(document).ready(function()
{
    mvpModuleManager = new MVPModuleManager();
})

// DESC: If an action is started, is set to true.  when completed, it is set to false.
//       If actionStarted is true, a new action like a sort cannot start
MVPModuleManager.prototype.actionStarted = false;

MVPModuleManager.prototype.addLessonPlanToDOM = function(data,moduleImage,lessonPlanName,notes,tags,location,age,gender,literacy)
{
    try
    {
        var lessonPlanIdArray = $.parseJSON(data);

        var lessonPlanRow = $('<li data-lessonplanid="'+lessonPlanIdArray['id']+'" item="material"></li>');
        $(lessonPlanRow).append('<a href="index.php?type=lessonPlan&id='+lessonPlanIdArray['id']+'"></a>');
        $(lessonPlanRow).children('a').append('<img src="img/navIcons/'+moduleImage+'.png" />')
        $(lessonPlanRow).append('<div class="moduleContent"></div>')
        $(lessonPlanRow).children('.moduleContent').append('<a href="index.php?type=lessonPlan&id='+lessonPlanIdArray['id']+'"></a>');
        $(lessonPlanRow).find('.moduleContent a').append('<h3>'+lessonPlanName+'</h3>');
        $(lessonPlanRow).find('.moduleContent a').append('<p class="notes">'+notes+'</p>');
        var genderText = gender=="both" ? "both genders" : gender;
        var literacyText = literacy=="yes" ? "literacy required" : "literacy not required"
        if(tags=="")
        {
            $(lessonPlanRow).find('.moduleContent a').append('<p class="tags"><strong>Tags:</strong> '+location+','+age+','+genderText+','+literacyText+'</td>');
        }
        else
        {
            $(lessonPlanRow).find('.moduleContent a').append('<p class="tags"><strong>Tags:</strong> '+tags+','+location+','+age+','+genderText+','+literacyText+'</td>');
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
            var currentName = $('#myModules ul').find('li[data-lessonplanid="'+lessonPlanId+'"] a').children('h3').text();
            var currentTags = $('#myModules ul').find('li[data-lessonplanid="'+lessonPlanId+'"] a').children('.tags').text().substring(6);
            var currentNotes = $('#myModules ul').find('li[data-lessonplanid="'+lessonPlanId+'"] a').children('.notes').text();
            var currentLocation = "potou";
            var currentAge = "oneToFive";
            var currentGender = "male";
            var currentLiteracy = "no";
            var currentImage = "Cough";
        }
        
        var createLessonPlan = thisObject.createAddLessonPlanLightbox();
        
        createLessonPlan.children('ul').find('#newLessonPlanName').val(currentName);
        createLessonPlan.children('ul').find('#newTags').val(currentTags);
        createLessonPlan.children('ul').find('#newNotes').val();
        createLessonPlan.children('ul').find('#newLessonPlanLocation').children('option[value="'+currentLocation+'"]').attr('selected','selected');
        createLessonPlan.children('ul').find('#newLessonPlanAge').children('option[value="'+currentAge+'"]').attr('selected','selected');
        createLessonPlan.children('ul').find('#newLessonPlanGender').children('option[value="'+currentGender+'"]').attr('selected','selected');
        createLessonPlan.children('ul').find('#newLessonPlanLiteracy').children('option[value="'+currentLiteracy+'"]').attr('selected','selected');
        createLessonPlan.children('ul').find('#newLessonPlanImage').children('option[value="'+currentImage+'"]').attr('selected','selected');
        
        createLightBox('html','Create Module',createLessonPlan);
        $('#newLessonPlanName').focus();
        
        function addLessonPlan(id,lessonPlanName,tags,notes,location,age,gender,literacy,moduleImage)
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
               addLessonPlan(lessonPlanId,$('#newLessonPlanName').val().replace(/_/g,' '),$('#newTags').val(),$('#newNotes').val(),$('#newLessonPlanLocation').val(),$('#newLessonPlanAge').val(),$('#newLessonPlanGender').val(),$('#newLessonPlanLiteracy').val(),$("#newLessonPlanImage").val());
            }
            // Escape
            else if(e.keyCode==27)
            {
                cancel();
            }
        });

        $('#createLessonPlan button.create').click(function()
        {
            addLessonPlan(lessonPlanId,$('#newLessonPlanName').val().replace(/_/g,' '),$('#newTags').val(),$('#newNotes').val(),$('#newLessonPlanLocation').val(),$('#newLessonPlanAge').val(),$('#newLessonPlanGender').val(),$('#newLessonPlanLiteracy').val(),$("#newLessonPlanImage").val());
        });

        $('#createLessonPlan button.cancel').click(function()
        {
            cancel();
        });
    }
}

function MVPModuleManager()
{
    var thisObject = this;
    
    $('#addModule').click(function()
    {
        thisObject.openAddLessonPlanLightbox();
    });
    
    $('.deleteModule').live('click',function(e)
    {
        thisObject.deleteLessonPlan($(this).parent('li').attr('data-lessonplanid'));
    });
    
    $('.editModule').live('click',function()
    {
        thisObject.openAddLessonPlanLightbox($(this).parent('li').attr('data-lessonplanid'));
    });
}