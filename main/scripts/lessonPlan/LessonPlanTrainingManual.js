function LessonPlanTrainingManual()
{
    var pathArray = $('#content').attr('data-location').replace(/^\/data\/lessonplan\/|\/$/g,'').split('/')
    var lessonPlanPayload = {uri:"/data/lessonplan/"+pathArray[0]+"/"};

    $.ajax({url:'resources/isLessonPlanOwner.php',type:'GET',data:lessonPlanPayload,success:function(data)
    {
        var jsonArray = $.parseJSON(data);
        if(jsonArray["isMyLessonPlan"])
        {
            //$('body').append('<div id="teachertrainingmanual"><div id="teachertrainingmanualheader"><h2>Customize Training Manual</h2></div></div>')
            var payload = {uri:$('#content').attr('data-location')};
        
            $.ajax({url:'resources/getTrainingManual.php',type:'GET',data:payload,success:function(data)
            {
                var jsonArray = $.parseJSON(data);
                
                for(var key in jsonArray)
                {
                    if(key.indexOf('show')!=-1)
                    {
                        if(jsonArray[key]==="false")
                        {
                            $('.infoBox[data-infoboxtype='+key.substring(4)+']').hide();
                        }
                    }
                }

                addTeacherFunctionality();
            }});
        }
    }});
}

$(document).ready(function()
{
    var lessonPlanTrainingManual = new LessonPlanTrainingManual();
});