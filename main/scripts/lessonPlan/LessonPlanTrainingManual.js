function LessonPlanTrainingManual()
{
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

// DESC: A placeholder function that is overwritten in teacher.js to ensure the ajax request is met
// RETURNS: void
function addTeacherFunctionality()
{
    
}

$(document).ready(function()
{
    var lessonPlanTrainingManual = new LessonPlanTrainingManual();
});