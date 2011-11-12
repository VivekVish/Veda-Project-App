////////////////////////////////////////////////////////////////
// The citations object holds all the citations for the       //
// current content as well as functions to manipulate         //
// citations.                                                 //
////////////////////////////////////////////////////////////////

var citations =
{
    // Stores citations
    citationArray: new Object(),
    
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
	
	setCitationsArray: function(citationId, arrayContents)
	{
        var tempParagraph = $('<p>').append(arrayContents);
        tempParagraph.find('*:not(i,b,u)').remove();
        var citationText = tempParagraph.remove().html();
        
		citations.citationArray[citationId] = citationText;
	}
}