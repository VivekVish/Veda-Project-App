////////////////////////////////////////////////////////////////
// The QuestionParameter object parses the JSON of a 	      //
// question's generic parameters							  //
////////////////////////////////////////////////////////////////

function QuestionParameters(questionParametersJSONObject)
{
	this.JSON = questionParametersJSONObject;
	
	this.parseJSON = function()
	{
		var returnJSON = $('<div class="questionParameters"></div>');
		returnJSON.append(this.JSON.html());
		return returnJSON;
	}
}