$(document).ready(function()
{
    $('#setVideoButton').click(function()
    {
        var locationArray = $('#content').attr('data-location').replace(/^\/data\/material\/|\/$/g,'').split('/');
        
        var payload = {lesson: locationArray[4], section:locationArray[3],course:locationArray[2], subject:locationArray[1],field:locationArray[0],content:$('#videoInput').val(),name:'video'};
        $.ajax({url : "resources/submitLessonAddition.php", type: 'POST', data: payload, success:function(data)
        {
            new Message(data);
        }});
    })
});