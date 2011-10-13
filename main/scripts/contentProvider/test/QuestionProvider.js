$(document).ready(function()
{
	document.execCommand("enableObjectResizing", false, 'false');
	$('#content h1')[0].contentEditable = false;
	
	baseProvider.preloadEquationEditor();
	questionBlueprints.getQuestionXML();
	
	var counter = 0;
	
	$.each(questionBlueprints.questionXML, function(index, value)
	{
		questionEditor = new QuestionEditor($('.question')[counter],value);
		counter++;
	});
	
	
	baseContent.refreshILOs();
	$('.ilo').attr('contenteditable',false);
	
	MathJax.Hub.Config(
	{    
		extensions: ["tex2jax.js","TeX/bbox.js"]
	})
	
	$('#questionEditorViewer').tabs();
});