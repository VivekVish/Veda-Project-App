////////////////////////////////////////////////////////////////
// The questionBlueprints namespace stores the XML of questions //
// and gets the question XML from the server.				  //
////////////////////////////////////////////////////////////////

var questionBlueprints =
{
	// stores ILO XML
	questionXML: new Object(),
	
	// DESC: gets question blueprints using an AJAX request to the API
	// PARAMETER: questionIds is an array of question IDs to be requested
	// RETURNS: void
	getQuestionXML: function(questionIds)
	{
        if(questionIds!="new")
        {
            $.ajax({url : 'resources/getQuizQuestion.php', type: 'POST', data: questionIds, success: function(data)
            {
                
            }});
        }
        /*
		questionBlueprints.questionXML['question101'] = 
		"<questionblueprint id = \"qb1\">"+
			"<genericparams>"+
				"<parameter name='trigfunc' type='enum'><function>sin</function><function>cos</function><function>tan</function></parameter>"+
				"<parameter name='a' type='range'><begin>1</begin><end>10</end></parameter>"+
				"<parameter name='b' type='range'><begin>2</begin><end>4</end></parameter>"+
				"<afparameter name='c' type='enum'><int>-2</int><int>2</int></afparameter>"+
				"<afparameter name='d' type='enum'><int>-2</int><int>2</int></afparameter>"+
			"</genericparams>"+
			"<contentblueprint>"+
				"<p>Evaluate the following expression:</p>"+
				"<span id='ilo3' data-ilotype='equation' class='ilo'></span>"+
			"</contentblueprint>"+
			"<correctanswerblueprint>"+
				"\\(``simplify((x+`a`)*(x+`b`)/(x+`a`))``,x \\ne -`a`\\)"+
			"</correctanswerblueprint>"+
			"<answerfieldblueprint id=\"afb20\" type=\"multchoice\" choices=\"5\">"+
				"<answerblueprint><span id='ilo1' data-ilotype='equation' class='ilo'></span></answerblueprint>"+
				"<answerblueprint><span id='ilo2' data-ilotype='equation' class='ilo'></span></answerblueprint>"+
                "<answerblueprint>None of the above</answerblueprint>"+
			"</answerfieldblueprint>"+
		"</questionblueprint>";
        
        $('.samplequestion .questioncontent').append('<span id="ilo4" data-ilotype="equation" class="ilo"></span>');
        $('.samplequestion .answerfield ol').append('<li><span id="ilo5" data-ilotype="equation" class="ilo"></span></li>');
        $('.samplequestion .answerfield ol').append('<li><span id="ilo6" data-ilotype="equation" class="ilo"></span></li>');
        $('.samplequestion .answerfield ol').append('<li><span id="ilo7" data-ilotype="equation" class="ilo"></span></li>');
        $('.samplequestion .answerfield ol').append('<li><span id="ilo8" data-ilotype="equation" class="ilo"></span></li>');
        $('.samplequestion .answerfield ol').append('<li>None of the above</li>');
		
		ILOContents.ILOArray['ilo1'] = {content:'x+`b`',type:'equation',version:'1.0'};
		ILOContents.ILOArray['ilo2'] = {content:'x+`c`,x\\ne -`a`',type:'equation',version:'1.0'};
        ILOContents.ILOArray['ilo3'] = {content:'\\frac{``simplify((x+`a`)*(x+`b`))``}{x+`a`}',type:'equation',version:'1.0'};
        ILOContents.ILOArray['ilo4'] = {content:'\\frac{x^2-1}{x+1}',type:'equation',version:'1.0'};
		ILOContents.ILOArray['ilo5'] = {content:'x-1, x \\ne -1',type:'equation',version:'1.0'};
        ILOContents.ILOArray['ilo6'] = {content:'x+2, x \\ne -1',type:'equation',version:'1.0'};
        ILOContents.ILOArray['ilo7'] = {content:'x-1',type:'equation',version:'1.0'};
        ILOContents.ILOArray['ilo8'] = {content:'x+3, x \\ne -1',type:'equation',version:'1.0'};
        */
	},
	
	// DESC: sets the ILO XML of the ILO in question
	// PARAMETER: QuestionId is the question ID to be changed
	// PARAMETER: XML is the question XML
	// RETURNS: void
	setQuestionXML: function(QuestionId, XML)
	{
		questionBlueprints.questionXML[QuestionId] = XML;
	}
}