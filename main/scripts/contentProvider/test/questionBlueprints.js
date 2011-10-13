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
				"<span data-ilotype='equation' class='ilo' id='ilo7'></span>"+
			"</contentblueprint>"+
			"<correctanswerblueprint>"+
				"<eval>``d/dx(`trigfunc`(`a`x^`b`))``</eval>"+
			"</correctanswerblueprint>"+
			"<answerfieldblueprint id=\"afb20\" type=\"multchoice\" choices=\"5\">"+
				"<answerblueprint><span data-ilotype='equation' class='ilo' id='ilo1'></span></answerblueprint>"+
				"<answerblueprint><span data-ilotype='equation' class='ilo' id='ilo2'></span></answerblueprint>"+
				"<answerblueprint><span data-ilotype='equation' class='ilo' id='ilo3'></span></answerblueprint>"+
				"<answerblueprint><span data-ilotype='equation' class='ilo' id='ilo4'></span></answerblueprint>"+
				"<answerblueprint><span data-ilotype='equation' class='ilo' id='ilo5'></span></answerblueprint>"+
				"<answerblueprint><span data-ilotype='equation' class='ilo' id='ilo6'></span></answerblueprint>"+
				"<answerblueprint position=\"last\" forceinclude=\"true\">None of the above</answerblueprint>"+
			"</answerfieldblueprint>"+
		"</questionblueprint>";
		
		ILOContents.ILOArray['ilo1'] = "<ilo ilotype='equation' eval='true'>``d/dx(`trigfunc`(`a`x^{\\bbox[yellow]{b}}))`` / `b`</ilo>";
		ILOContents.ILOArray['ilo2'] = "<ilo ilotype='equation' eval='true'>``d/dx(`trigfunc`(`a`x^{`b`}))`` / (`b`*`a`*x^{`b`-1})</ilo>";
		ILOContents.ILOArray['ilo3'] = "<ilo ilotype='equation' eval='true'>`trigfunc`(`a`x^{`b`}) * (`b`*`a`*x^{`b`-1})</ilo>";
		ILOContents.ILOArray['ilo4'] = "<ilo ilotype='equation' eval='true'>-``d/dx(`trigfunc`(`a`x^{`b`}))``</ilo>";
		ILOContents.ILOArray['ilo5'] = "<ilo ilotype='equation' eval='true'>``d/dx(`trigfunc`(`a`x^{`b`})`)`` / `b` * `c`</ilo>";
		ILOContents.ILOArray['ilo6'] = "<ilo ilotype='equation' eval='true'>``d/dx(`trigfunc`(`a`x^{`b`}))`` / (`b`*`a`*x^{`b`-1}) * `d`</ilo>";
		ILOContents.ILOArray['ilo7'] = "<ilo ilotype='equation'>d/dx `trigfunc`(`a`x^{`b`})</ilo>";
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