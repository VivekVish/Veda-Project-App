////////////////////////////////////////////////////////////////
// The CorrectAnwswer object parses the JSON of a question's   //
// correct answer blueprint									  //
////////////////////////////////////////////////////////////////

function CorrectAnswer(correctAnswerJSONObject)
{
	this.JSON = correctAnswerJSONObject;
	
	this.parseJSON = function()
	{
		var returnJSON = $('<div class="correctAnswer"></div>');
		returnJSON.append(this.JSON.html());
		return returnJSON;
	}
}