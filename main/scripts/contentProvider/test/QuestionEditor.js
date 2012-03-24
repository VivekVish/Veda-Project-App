////////////////////////////////////////////////////////////////
// The QuestionEditor object parses the XML of a question     //
// blueprint and contains functions that edit a question 	  //
// blueprint.												  //
////////////////////////////////////////////////////////////////

function QuestionEditor(questionElement,questionJSON)
{
	this.questionContainer = questionElement;
	this.questionBlueprintId = $(questionJSON).attr('id');
	this.contentBlueprint = new QuestionContent($(questionJSON).children('contentblueprint'));
	this.genericParams = new QuestionParameters($(questionJSON).children('genericparams'));
	this.correctAnswerBlueprint = new CorrectAnswer($(questionJSON).children('correctanswerblueprint'));
	this.answerFieldBlueprint = new AnswerField($(questionJSON).children('answerfieldblueprint'));
	
	this.display = function()
	{
		$(this.questionContainer).append(this.contentBlueprint.parseJSON());
		$(this.questionContainer).append(this.answerFieldBlueprint.parseJSON());
		console.log(this.questionContainer);
		console.log(this.questionBlueprintId);
		console.log(this.genericParams.parseJSON());
		console.log(this.contentBlueprint.parseJSON());
		console.log(this.correctAnswerBlueprint.parseJSON());
		console.log(this.answerFieldBlueprint.parseJSON());
	}
	
	this.display();
}