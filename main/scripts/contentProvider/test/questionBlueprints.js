////////////////////////////////////////////////////////////////
// The questionBlueprints namespace stores the JSON of        //
// questions and gets the question JSON from the server.	  //
////////////////////////////////////////////////////////////////

var questionBlueprints =
{
	// stores question JSON
	questionJSON: new Object(),
	
	// DESC: gets question blueprints using an AJAX request to the API
	// PARAMETER: questionIds is an array of question IDs to be requested
	// RETURNS: void
	getQuestionJSON: function(questionIds)
	{
		questionBlueprints.questionJSON['question101'] = 
		{
            5: [200, {
              'type': 'Equation Multiple Choice',
              'paramblueprint': [
                {'name':'trigfunc','type':'function','include':['sin','cos','tan']},
                {'name':'a_true_or_false','type':'enum','values':['TRUE','FALSE']},
                {'name':'a','type':'integer','lowerbound':1,'upperbound':10},
                {'name':'b','type':'integer','lowerbound':2,'upperbound':4}
              ],
              'answerfieldparamblueprint': [
                {'name':'c','type':'enum','values':[-2,2]}
              ],
              'ILOContents': [
                {'index':237,'value':'\frac{\mathrm{d} }{\mathrm{d} x} \`trigfunc`(`a`x^`b`)'},
                {'index':238,'value':'``d/dx(```trigfunc`(`a`x^`b`)`` / `b`)``'},
                {'index':239,'value':'``d/dx(```trigfunc`(`a`x^`b`)`` / (`b`*`a`*x^(`b`-1)))``'},
                {'index':242,'value':'``d/dx(```trigfunc`(`a`x^`b`)`` / `b`)``*`c`'},
                {'index':252,'value':'``d/dx(`trigfunc`(`a`x^`b`))``'}
              ],
              'content': '<p>Evaluate the following expression:</p><span class="ilo" id="ilo237" data-ilotype="equation"></span>',
              'correctanswer': '<span class="ilo" id="ilo252" data-ilotype="equation"></span>',
              'answerfieldblueprint': {
                'attributes':{'type':'multiplechoice','numanswers':4},
                'contents': [
                  {'content':'<span class="ilo" id="ilo238" data-ilotype="equation"></span>'},
                  {'content':'<span class="ilo" id="ilo239" data-ilotype="equation"></span>'},
                  {'content':'<span class="ilo" id="ilo242" data-ilotype="equation"></span>'},
                  {'attributes': {
                    'positionfromlast': 0,
                    'forceinclude': true,
                    'type':'noneoftheabove'
                  },'content':'None of the above'}
                ]
              }
            }]
        };
    
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
	},
	
	// DESC: sets the ILO JSON of the ILO in question
	// PARAMETER: QuestionId is the question ID to be changed
	// PARAMETER: JSON is the question JSON
	// RETURNS: void
	setQuestionJSON: function(QuestionId, JSON)
	{
		questionJSON.questionJSON[QuestionId] = JSON;
	}
}