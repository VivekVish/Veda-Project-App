$(document).ready(function()
{
    
    ContentProvider.prototype = new BaseProvider();
    ContentProvider.prototype.constructor = ContentProvider;
    materialProvider = new ContentProvider();
    
	document.execCommand("enableObjectResizing", false, 'false');
	$('#content h1')[0].contentEditable = false;
    
	questionBlueprints.getQuestionXML();
	
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