////////////////////////////////////////////////////////////////
// The citations object holds all the citations for the       //
// current content as well as functions to manipulate         //
// citations.                                                 //
////////////////////////////////////////////////////////////////

var citations =
{
    // Stores citations
    citationArray: new Object(),
    
    getCitations: function(citationIds)
    {
        if(citationIds.length>0)
        {
            var citationPayload = {'citationIds':citationIds};
            $.ajax({url : 'resources/getCitations.php', type: 'GET', data: citationPayload, async: false, success: function(data)
            {
                ILOContents.citationArray = $.parseJSON(data);
            }});
        }
    },
	
	setCitationsArray: function(citationId, arrayContents)
	{
		citations.citationArray[citationId] = arrayContents;
	}
}