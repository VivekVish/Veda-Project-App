////////////////////////////////////////////////////////////////
// The QuestionEditor object parses the XML of a question     //
// blueprint and contains functions that edit a question 	  //
// blueprint.												  //
////////////////////////////////////////////////////////////////

function QuestionEditor(questionElement,questionXML)
{
    this.questionContainer = questionElement;
    this.questionBlueprintId = $(questionXML).attr('id');
    this.contentBlueprint = new QuestionContent($(questionXML).children('contentblueprint'));
    this.genericParams = new QuestionParameters($(questionXML).children('genericparams'));
    this.correctAnswerBlueprint = new CorrectAnswer($(questionXML).children('correctanswerblueprint'));
    this.answerFieldBlueprint = new AnswerField($(questionXML).children('answerfieldblueprint'));

    this.display = function()
    {
        $(this.questionContainer).append(this.contentBlueprint.parseXML());
        $(this.questionContainer).append(this.answerFieldBlueprint.parseXML());
    }

    this.display();
}