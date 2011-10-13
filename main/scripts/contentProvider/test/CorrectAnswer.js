////////////////////////////////////////////////////////////////
// The CorrectAnwswer object parses the XML of a question's   //
// correct answer blueprint									  //
////////////////////////////////////////////////////////////////

function CorrectAnswer(correctAnswerXMLObject)
{
	this.XML = correctAnswerXMLObject;
	
	this.parseXML = function()
	{
		var returnXML = $('<div class="correctAnswer"></div>');
		returnXML.append(this.XML.html());
		return returnXML;
	}
}