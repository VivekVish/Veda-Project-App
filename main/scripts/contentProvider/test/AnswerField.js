////////////////////////////////////////////////////////////////
// The answerField object parses the XML of a question's      //
// answer field blueprint									  //
////////////////////////////////////////////////////////////////

function AnswerField(answerFieldXMLObject)
{
	this.XML = answerFieldXMLObject;
	
	this.parseXML = function()
	{
		var returnXML = $('<div class="answerField"><ul></ul></div>');
		this.XML.children('answerblueprint').each(function(index, element)
		{
			$(returnXML).children('ul').append('<li class="answer">'+$(this).html()+'</li>');
		});
		
		return returnXML;
	}
}