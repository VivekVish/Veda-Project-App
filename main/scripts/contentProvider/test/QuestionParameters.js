////////////////////////////////////////////////////////////////
// The QuestionParameter object parses the XML of a 	      //
// question's generic parameters							  //
////////////////////////////////////////////////////////////////

function QuestionParameters(questionParametersXMLObject)
{
	this.XML = questionParametersXMLObject;
	
	this.parseXML = function()
	{
		var returnXML = $('<div class="questionParameters"></div>');
		returnXML.append(this.XML.html());
		return returnXML;
	}
}