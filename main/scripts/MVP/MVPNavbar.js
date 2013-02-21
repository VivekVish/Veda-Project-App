////////////////////////////////////////////////////////////////
// The navbar object allows the user to navigate through      //
// content.  When a field, subject, course is clicked, the    //
// navigation bar is changed appropriately.  When a lesson is //
// clicked, it is loaded.                                     //
////////////////////////////////////////////////////////////////

$(document).ready(function()
{
    // Add images to navigation links
    navigationBar = new navbar();
});

navbar.prototype.readyToProcess=true;

// DESC: Uses the navigation bar location to get and fill the links associated with that location
// PARAMETER: navBarLocation is the the slash-separated level of navigation
// RETURNS: void
navbar.prototype.processPosition = function(navBarLocation)
{
    var navbarObject = this;
    navbarObject.currentPosition=navBarLocation;

    if(this.readyToProcess)
    {
        this.readyToProcess=false;
        if(navBarLocation.search(/^\/data\/material\//g)>-1)
        {
            var linkArray = navBarLocation.replace(/^\/data\/material\/|\/$/g,'').split('/');
            var navPosition = {lesson:linkArray[2],section:linkArray[2], course:linkArray[2], subject:linkArray[1],field:linkArray[0]};

            $('#coursenavheader h2').text(linkArray[2].replace(/_/g,' '));
            $.ajax({url : 'resources/getCourseNav.php', type: 'GET', data: navPosition,success: function(data)
            {
                var dataArray = $.parseJSON(data);

                var backLocation = "index.php?field="+navPosition.field+"&subject="+navPosition.subject;
                var linkLocation = "index.php?field="+navPosition.field+"&subject="+navPosition.subject+"&course="+navPosition.course+"&section="+escape(navPosition.section)+"&lesson="+escape(navPosition.lesson);
                var quizLocation = linkLocation+"&type=quiz"
                
                $('#upToPreviousNavLevel').replaceWith('<a id="backToCourseButton" href='+backLocation+'><img src="img/back_button.png"></a>');
                
                $('#coursenav>div>ul').append('<li><a href="'+linkLocation+'">Lesson</a></li>');
                $('#coursenav>div>ul').append('<li><a href="'+quizLocation+'">Quiz</a></li>');

                $.each(dataArray.children[0].lessonAdditions,function(index, value)
                {
                    var additionLinkLocation = linkLocation+"&type="+value;
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
                    
                    $('#coursenav>div>ul').append('<li><a href="'+additionLinkLocation+'">'+additionName+'</a></li>');
                });
            }});
        }
        else
        {   
            linkArray = $('#content').attr('data-location').replace(/^\/data\/lessonplan\/|\/$/g,'').split('/');

            navPosition = {moduleId:linkArray[0]};
            $('#coursenavheader h2').text(linkArray[2].replace(/_/g,' '));
            
            $.ajax({url : 'resources/getModuleNav.php', type: 'GET', data: navPosition,success: function(data)
            {
                var jsonArray = $.parseJSON(data);
                
                var backLocation = "index.php?field=CHW_Training&subject=CHW_Training";
                $('#upToPreviousNavLevel').replaceWith('<a id="backToCourseButton" href='+backLocation+'><img src="img/back_button.png"></a>');

                var linkLocation = "index.php?type=lessonPlan&id="+navPosition.moduleId+"&section="+escape(jsonArray.children[0].name.replace(/ /g,'_'))+"&lesson="+escape(jsonArray.children[0].lessons[0].name.replace(/ /g,'_'));
                $('#coursenav>div>ul').append('<li><a href="'+linkLocation+'">Lesson</a></li>');
                
                var prependLocation = "index.php?id="+navPosition.moduleId+"&section="+escape(jsonArray.children[0].name.replace(/ /g,'_'))+"&lesson="+escape(jsonArray.children[0].lessons[0].name.replace(/ /g,'_'))+"&type=lessonPlan";
                
                $.each(jsonArray.children[0].lessons[0].additions,function(index, value)
                {
                    if(value=="quiz")
                    {
                        value="Quiz";
                    }
                    
                    var additionLinkLocation = prependLocation+value;
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
                    else if(value=="Quiz")
                    {
                        additionName = "Quiz";
                    }
                    
                    $('#coursenav>div>ul').append('<li><a href="'+additionLinkLocation+'">'+additionName+'</a></li>');
                });
            }});
        }
    }
}


function navbar()
{
    var navbarObject = this;
    
    this.processPosition($('#coursenav').attr('data-navPosition'));
}