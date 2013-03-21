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
                
                if(jsonArray.showroleplay==="false")
                {
                    $('.infoBox[data-infoboxtype=roleplay]').hide();
                }

                if(jsonArray.showjobaide==="false")
                {
                    $('.infoBox[data-infoboxtype=jobaide]').hide();
                }

                if(jsonArray.showstudentparticipation==="false")
                {
                    $('.infoBox[data-infoboxtype=studentparticipation]').hide();
                }

                if(jsonArray.showdiscussion==="false")
                {
                    $('.infoBox[data-infoboxtype=discussion]').hide();
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