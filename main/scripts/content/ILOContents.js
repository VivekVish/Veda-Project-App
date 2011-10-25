////////////////////////////////////////////////////////////////
// The ILOContents namespace stores the XML of ILOs and gets  //
// ILO XML from the server.  It is used by the content        //
// providing ILO namespaces to edit ILOs.					  //
////////////////////////////////////////////////////////////////

var ILOContents =
{
	// stores ILO information
	ILOArray: new Object(),
	
	
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
	
	setILOArray: function(ILOId, arrayContents)
	{
		ILOContents.ILOArray[ILOId] = arrayContents;
	}
}