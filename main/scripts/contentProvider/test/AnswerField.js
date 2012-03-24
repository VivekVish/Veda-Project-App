////////////////////////////////////////////////////////////////
// The answerField object parses the JSON of a question's      //
// answer field blueprint									  //
////////////////////////////////////////////////////////////////

function AnswerField(answerFieldJSONObject)
{
	this.JSON = answerFieldJSONObject;
	
	this.parseJSON = function()
	{
		var returnJSON = $('<div class="answerField"><ul></ul></div>');
		this.JSON.children('answerblueprint').each(function(index, element)
		{
			$(returnJSON).children('ul').append('<li class="answer">'+$(this).html()+'</li>');
		});
		
		return returnJSON;
	}
}