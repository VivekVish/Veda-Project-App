QuestionProvider.prototype = new ContentProvider();
QuestionProvider.prototype.constructor = QuestionProvider;
QuestionProvider.prototype.parent = new ContentProvider();

// DESC: Submits the content to the database through the API using an AJAX call
// RETURNS: void
QuestionProvider.prototype.submitContent = function()
{
    $('p>br').remove();
    var questionPayload = this.getPayload();

    $.ajax({url : "resources/submitQuestion.php", type: 'POST', data: questionPayload, success:function(data)
    {
        new Message(data);
    }});
}

// DESC: Gets payload for a submit or autosave
// RETURNS: Object literal including path, content, and ILOs
QuestionProvider.prototype.getPayload = function()
{
    ilo.checkForRepeatILOs();

    var tempILOArray = $.extend({},ILOContents.ILOArray);
    delete tempILOArray['ilo-1'];
    
    var tempCitationsArray = $.extend({},citations.citationArray);

    $('div#bibliography li').each(function(index)
    {
        if($('#'+$(this).attr('data-citationid')).size()==0)
        {
            delete tempCitationsArray[$(this).attr('data-citationid')];
        }
    });
    
    var contentClone = $('.questionContent').clone();
    contentClone.find('.ilo').empty();
    contentClone.find('.citation').empty();
    var answerChoicesHTML = contentClone.find('ol,ul').last().children();
    contentClone.find('ol,ul').last().remove();
    
    var responseClone = $('.questionResponse').clone();
    responseClone.find('.ilo').empty();
    responseClone.find('.citation').empty();
    
    var answerChoicesArray = [];
    
    $(answerChoicesHTML).each(function()
    {
        answerChoicesArray.push($(this).html());
    });
    
    var correctAnswer = $('.correctAnswer').val();
    
    var contentHTML = contentClone.html();
    var responseHTML = responseClone.html();
    
    var locationArray = $('#content').attr('data-location').replace(/^\/data\/material\/|\/$/g,'').split('/');
    var questionName = $('#questionName').val();
    contentClone.remove();
    responseClone.remove();

    var contentPayload = {lesson: locationArray[4], section:locationArray[3],course:locationArray[2], subject:locationArray[1],field:locationArray[0],content:contentHTML,response:responseHTML,ilos:tempILOArray,citations:tempCitationsArray, answerChoices:answerChoicesArray, correctAnswer: correctAnswer, questionId: locationArray[6], name:questionName};
    
    return contentPayload;
}

// DESC: Calls the parent construct function and sets event handlers
// RETURNS: void
QuestionProvider.prototype.construct = function()
{
    var thisObject=this;
    
    this.parent.construct();
    
     // Submit Content
    $('#submitContent').click(function()
    {
        thisObject.submitContent();
    });
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
    $('.questionResponse')[0].contentEditable = true;
    
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