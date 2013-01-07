$(document).ready(function()
{
    $('#teachertrainingmanual').append('<ul>');
    function addTrainingCheckbox(boxtype,boxtypeName)
    {
        if($('[data-infoboxtype='+boxtype+']').size()>0)
        {
            $("#teachertrainingmanual ul").append('<li><input type="checkbox" id="show'+boxtype+'" checked="checked" /><label for="show'+boxtype+'">Show '+boxtypeName+'</label><li>');

            $("#show"+boxtype).bind("click",function()
            {
                if($(this).is(':checked'))
                {
                    $('[data-infoboxtype='+boxtype+']').show();
                }
                else
                {
                    $('[data-infoboxtype='+boxtype+']').hide();
                }
            })
        }
    }
    
    addTrainingCheckbox("roleplay","Roleplay");
    addTrainingCheckbox("jobaide","Job Aide");
    addTrainingCheckbox("studentparticipation","Student Participation");
    addTrainingCheckbox("discussion","Discussion");
});