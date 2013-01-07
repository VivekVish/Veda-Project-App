$(document).ready(function()
{
    $('#retakequiz').click(function()
    {
        var quizPath = {"quizPath":$('#content').attr('data-location')};
        $.ajax({url : "resources/deleteQuizResults.php", type: 'POST', data: quizPath, success:function(data)
        {
            if(data=="Success.")
            {
                window.location.reload();
            }
            else
            {
                new Message(data);
            }
        }});
    });
});