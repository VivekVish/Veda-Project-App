////////////////////////////////////////////////////////////////
// The QuestionContent object parses the XML of the question  //
// content													  //
////////////////////////////////////////////////////////////////

function QuestionContent(questionContentXMLObject)
{
	this.XML = questionContentXMLObject;
	
	this.parseXML = function()
	{
		var returnXML = $('<div class="questionContent"></div>');
		returnXML.append(this.XML.html());
		return returnXML;
	}
}