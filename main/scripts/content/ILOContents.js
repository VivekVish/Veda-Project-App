////////////////////////////////////////////////////////////////
// The ILOContents namespace stores the XML of ILOs and gets  //
// ILO XML from the server.  It is used by the content        //
// providing ILO namespaces to edit ILOs.					  //
////////////////////////////////////////////////////////////////

var ILOContents =
{
	// stores ILO information
	ILOArray: new Object(),
	
	// DESC: fills the ILO array by getting ILOs from the server through an ajax request
    // PARAMETER: ILOIds is an array of ILO ids
    // PARAMETER: callback is the function to be called after the ajax request
    // RETURNS: void
	getILOArray: function(ILOIds,callback)
	{
        if(ILOIds.length>0)
        {
            var ILOPayload = {'ILOIds':ILOIds};
            $.ajax({url : 'resources/getILOs.php', type: 'GET', data: ILOPayload, async: false, success: function(data)
            {
                ILOContents.ILOArray = $.parseJSON(data);
                callback.call();
            }});
        }
	},
	
    // DESC: sets one particular ILOId's contents within the ILOArray to arrayContents
    // DESC: ILOId is the ILO id to be set
    // DESC: arrayContents is the array to put in ILOArray
    // RETURNS: void
	setILOArray: function(ILOId, arrayContents)
	{
		ILOContents.ILOArray[ILOId] = arrayContents;
	}
}