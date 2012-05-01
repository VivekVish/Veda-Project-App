QuestionProvider.prototype = new ContentProvider();
QuestionProvider.prototype.constructor = QuestionProvider;
QuestionProvider.prototype.parent = new ContentProvider();

// DESC: Submits the content to the database through the API using an AJAX call
// RETURNS: void
QuestionProvider.prototype.submitContent = function()
{
    console.log('yes');
}

// DESC: Calls the parent construct function and sets event handlers
// RETURNS: void
QuestionProvider.prototype.construct = function()
{
    this.parent.construct();
}

function QuestionProvider()
{
    
}

$(document).ready(function()
{
    materialProvider = new QuestionProvider();
    materialProvider.construct();
    
	document.execCommand("enableObjectResizing", false, 'false');
	$('#content')[0].contentEditable = false;
    $('#content section')[0].contentEditable = false;
    $('.questionContent')[0].contentEditable = true;
	questionBlueprints.getQuestionXML($('#content').attr('data-questionid'));
	
	var counter = 0;
	
	$.each(questionBlueprints.questionXML, function(index, value)
	{
		questionEditor = new QuestionEditor($('.question')[counter],value);
		counter++;
	});
    
    MathJax.Hub.Config(
	{    
		extensions: ["tex2jax.js","TeX/bbox.js"]
	})
	
	baseContent.refreshILOs();
	$('.ilo').attr('contenteditable',false);
	
	$('#questionEditorViewer').tabs();
});