$(document).ready(function()
{	
    // Add letters to the list
    multChoiceQuestions = $('.question .multchoice');

    for(i=0; i<multChoiceQuestions.size();i++)
    {
        multChoice = $(multChoiceQuestions[i]).find("ol > li");
        for(j=0; j<multChoice.size(); j++)
        {
            letter = String.fromCharCode(65+j);
            $(multChoice[j]).prepend("<span class='letter'>"+letter+".&nbsp;</span>");
        }
    }
    // Allow selection of multiple choice questions
    $(".multchoice:not(.selected) > ol > li").click(function()
    {
        if($(this).hasClass('selected'))
        {
            $(this).addClass('deselected');	
            $(this).removeClass('selected');
        }
        else
        {
            $(this).siblings().removeClass('selected');
            $(this).siblings().addClass('deselected');
            $(this).addClass('selected');	
            $(this).removeClass('deselected');
        }

        var answerPayload = {};

        answerPayload.questionId=$(this).attr('id').substr(0,$(this).attr('id').indexOf('-'));
        answerPayload.answerId=$(this).attr('id').substr($(this).attr('id').indexOf('-')+1,$(this).attr('id').length-1);

        function processSubmitAnswerResponse(answerPayload)
        {
            $.ajax({url : "resources/submitAnswer.php", type: 'POST', data: answerPayload, success:function(data)
            {
                if(data=="Success.")
                {
                    var newPayload = {questionId:answerPayload.questionId};

                    $.ajax({url:"resources/getAnswer.php", type:'POST', data:newPayload, success:function(answerData)
                    {
                        try
                        {
                            var answerArray = $.parseJSON(answerData);
                            var correctAnswer = answerArray["correctAnswer"];
                            // Acts on all questions present--if multiple questions are added, this code must be changed
                            $(".multchoice>ol>li").eq(correctAnswer-1).append("<img class='correctAnswerImage' src='img/correctAnswer.png' />").addClass('correctAnswer');
                            $('.correctAnswerImage').css('top',($('.correctAnswerImage').parent('li').outerHeight()-$('.correctAnswerImage').height())/2+"px");
                            $('.answerfield').addClass('selected');
                            
                            if(answerPayload.answerId!=correctAnswer)
                            {
                                $(".multchoice>ol>li").eq(answerPayload.answerId-1).append("<img class='incorrectAnswerImage' src='img/incorrectAnswer.png' />").addClass('incorrectAnswer');
                                $('.incorrectAnswerImage').css('top',($('.incorrectAnswerImage').parent('li').outerHeight()-$('.incorrectAnswerImage').height())/2+"px");
                            }
                            
                            if(answerArray.response!=null)
                            {
                                $('.question').append('<div id="answerResponse"></div>');
                                $("#answerResponse").html($('<div />').html(answerArray.response).text());
                            }
                            
                            $('#questionButtons').append('<button id="nextquestion">Next Question</button>');
                            
                            $('#nextquestion').click(function()
                            {
                                window.location.reload();
                            });
                        }
                        catch(e)
                        {
                            console.log(e);
                            new Message(answerData);
                        }
                    }})
                }
            }});
        }
        
        processSubmitAnswerResponse(answerPayload);
    });

    $('.fillintheblank>input')
    .autocomplete(
    {
        source: function(req,add)
        {
            req.answerFieldId=$(this.element).attr('id');
            $.getJSON("resources/answerAutocomplete.php",req,function(data)
            {
                var suggestions = [];

                $.each(data, function(i,val)
                {
                    suggestions.push(val);
                });

                add(suggestions);
            });
        }
    });

    // Set the selected answer
    $(".answerChoice").each(function()
    {
        $(this).click(function()
        {
            $("#selectedAnswer").val($(this).attr("id"));
        });
    });

    // Submit form
    $("#submitAnswer").click(function()
    {
        $("#answerForm").submit();
    });
});