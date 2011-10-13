$(document).ready(function()
{	
	// Add letters to the list
	multChoiceQuestions = $('.question .multchoice');
	
	for(i=0; i<multChoiceQuestions.size();i++)
	{
		multChoice = $(multChoiceQuestions[i]).find("ol > li");
		for(j=0; j<multChoice.size(); j++)
		{
			letter = String.fromCharCode(97+i);
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