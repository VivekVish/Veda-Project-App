$(document).ready(function()
{	
	// Add letters to the list
	multChoiceQuestions = $('.question .multchoice');
	
	for(i=0; i<multChoiceQuestions.size();i++)
	{
		multChoice = $(multChoiceQuestions[i]).find("ol > li");
		for(j=0; j<multChoice.size(); j++)
		{
			letter = String.fromCharCode(97+j);
			$(multChoice[j]).prepend("<span class='letter'>"+letter+".&nbsp;</span>");
		}
	}
	// Allow selection of multiple choice questions
	$(".multchoice > ol > li").click(function()
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
        
        $.ajax({url : "resources/submitAnswer.php", type: 'POST', data: answerPayload, success:function(data)
        {
            if(data=="Success.")
            {
                window.location.reload();
            }
        }});
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