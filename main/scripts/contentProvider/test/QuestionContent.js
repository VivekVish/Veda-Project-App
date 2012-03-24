////////////////////////////////////////////////////////////////
// The QuestionContent object parses the JSON of the question  //
// content													  //
////////////////////////////////////////////////////////////////

function QuestionContent(questionContentJSONObject)
{
	this.JSON = questionContentJSONObject;
	
	this.parseJSON = function()
	{
		var returnJSON = $('<div class="questionContent"></div>');
		returnJSON.append(this.JSON.html());
		return returnJSON;
	}
}