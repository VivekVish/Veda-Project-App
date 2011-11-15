////////////////////////////////////////////////////////////////
// The citations object holds all the citations for the       //
// current content as well as functions to manipulate         //
// citations.                                                 //
////////////////////////////////////////////////////////////////

var citations =
{
    // Stores citations
    citationArray: new Object(),
    
    // DESC: fills the citation array by getting citations from the server through an ajax request
    // PARAMETER: citationIds is an array of citation ids
    // PARAMETER: callback is the function to be called after the ajax request
    // RETURNS: void
    getCitations: function(citationIds,callback)
    {
        if(citationIds.length>0)
        {
            var citationPayload = {'citationIds':citationIds};
            $.ajax({url : 'resources/getCitations.php', type: 'GET', data: citationPayload, async: false, success: function(data)
            {
                citations.citationArray = $.parseJSON(data);
                callback.call();
            }});
        }
    },
	
    // DESC: sets one particular citationId's contents within the citationArray to arrayContents
    // DESC: citationId is the citation id to be set
    // DESC: arrayContents is the array to put in citationArray
    // RETURNS: void
	setCitationsArray: function(citationId, arrayContents)
	{
        var tempParagraph = $('<p>').append(arrayContents);
        tempParagraph.find('*:not(i,b,u)').remove();
        var citationText = tempParagraph.remove().html();
        
		citations.citationArray[citationId] = citationText;
	}
}