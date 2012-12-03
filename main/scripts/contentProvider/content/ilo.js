////////////////////////////////////////////////////////////////
// The ilo namespace provides base functionality for editing  //
// ILOs, including highlighting the ILO, and providing		  //
// edit and delete buttons.                                   //
//															  //
// REQUIRES: jQuery											  //
////////////////////////////////////////////////////////////////

var ilo =
{
    // holds range that will be set once ILO is loaded
    savedRange: null,
    
    // DESC: Highlights a particular ILO by overlaying a translucent div with edit and delete buttons
    // PARAMETER: ILOElement is the ILO to be selected
    // RETURNS: void
    selectILO: function(ILOElement)
    {
        if(!$(ILOElement).hasClass('selectedILO'))
        {
            $(ILOElement).addClass('selectedILO');
            highlightILO = $('<div class="highlightILO"></div>');
            editILOButton = $('<div class="editILO"></div>');
            deleteILOButton = $('<div class="deleteILO"></div>');

            $(ILOElement).prepend(deleteILOButton).prepend(editILOButton).prepend(highlightILO);
            highlightILO.css('top',$(ILOElement).css('top'));
            highlightILO.css('left',$(ILOElement).css('left'));

            editILOButton[0].contentEditable = false;
            deleteILOButton[0].contentEditable = false;

            $(editILOButton).append('<canvas></canvas>');
            $(deleteILOButton).append('<canvas></canvas>');

            var buttonLength = $(editILOButton).width();

            $(editILOButton).children('canvas').attr('width',buttonLength).attr('height',buttonLength);
            $(deleteILOButton).children('canvas').attr('width',buttonLength).attr('height',buttonLength);

            var editButtonContext = $(editILOButton).children('canvas')[0].getContext('2d');
            var deleteButtonContext = $(deleteILOButton).children('canvas')[0].getContext('2d');

            // draws edit button
            editButtonContext.fillStyle="green";
            editButtonContext.beginPath();
            editButtonContext.lineTo(0,buttonLength-Math.sqrt(Math.pow(buttonLength,2)-Math.pow((buttonLength/2),2)));
            editButtonContext.lineTo(buttonLength/2,buttonLength);
            editButtonContext.lineTo(buttonLength,buttonLength-Math.sqrt(Math.pow(buttonLength,2)-Math.pow((buttonLength/2),2)));
            editButtonContext.fill();

            // draws delete button
            deleteButtonContext.strokeStyle="red";			
            deleteButtonContext.beginPath();
            deleteButtonContext.lineTo(buttonLength/10,buttonLength/10);
            deleteButtonContext.lineTo(buttonLength*9/10,buttonLength*9/10);
            deleteButtonContext.moveTo(buttonLength/10,buttonLength*9/10);
            deleteButtonContext.lineTo(buttonLength*9/10,buttonLength/10);
            deleteButtonContext.stroke();

            $(editILOButton).click(function(e)
            {
                    eval($(ILOElement).attr('data-ilotype')+".editMode(ILOElement)");
            });

            $(deleteILOButton).click(function(e)
            {
                    ilo.deleteILO(ILOElement);
            });
        }
    },

    // DESC: deselects ILOElement
    // PARAMETER: ILOElement is the ILO to be deselected
    deselectILO: function(ILOElement)
    {
        $(ILOElement).children('.highlightILO,.editILO,.deleteILO').remove();
        $(ILOElement).removeClass('selectedILO');
    },



    // DESC: changes the ILO id of any repeat ILOs to deal with copy pasting creating non-unique ILO ids
    // RETURNS: void
    checkForRepeatILOs: function(callback)
    {
        allILOs = $('.ilo');
        for(i=0;i<allILOs.length-1;i++)
        {
            for(j=i+1;j<allILOs.length;j++)
            {
                if($(allILOs[i]).attr('id')==$(allILOs[j]).attr('id'))
                {
                    ilo.getNewILOID(function(newILOID)
                    {
                        ILOContents.ILOArray[newILOID] = ILOContents.ILOArray[$(allILOs[i]).attr('id')];
                        $('#'+$(allILOs[i]).attr('id')).attr('id',newILOID);
                    });
                }
            }
        }
    },

    // DESC: deletes the ILO and sets the cursor at the beginning of the document
    // PARAMETER: ILOElement is the ILO to be deleted
    // RETURNS: void
    deleteILO: function(ILOElement)
    {
        contentState.saveState();
        rangeTraverse.selectAfter(ILOElement);
        $(ILOElement).remove();
    },

    // DESC: gets new, unique ILO ID
    // PARAMETER: callback is the function to call once the new ILO ID received
    // PARAMETER: callbackArgs is an array of arguments to pass to the callback function
    // RETURNS: void
    getNewILOID: function(callback,callbackArgs,callbackOnFail,callbackOnFailArgs)
    {
        $.ajax({url:'resources/nextILOId.php',type:'GET',callbackFunction:callback,callbackArgs:callbackArgs,callbackOnFail:callbackOnFail,callbackOnFailArgs:callbackOnFailArgs,success: function(data)
        {
            if(data=="Access Denied.")
            {
                new Message("You must log back in.");
                this.callbackOnFail.apply(null,this.callbackOnFailArgs);
            }
            else
            {
                if(typeof(this.callbackArgs)=="undefined")
                {
                    this.callbackArgs = ["ilo"+data];
                }
                else
                {
                    this.callbackArgs.unshift("ilo"+data);
                }

                this.callbackFunction.apply(null,this.callbackArgs);
            }
        }});
    },

    // DESC: edits an ILO by changing its ID and creating a new entry in the ILO XML array but retaining the old ILO XML
    // PARAMETER: currentILOID is the ILO ID of the ILO to be edited
    // PARAMETER: newILOArray is what the ILO XML will be changed to
    // RETURNS: void
    editILO: function(currentILOID, newILOArray,callback,callbackOnFail)
    {
        var ILOExists = false;
        $.ajax({url:'resources/doesILOExist.php', type:'GET', data:{iloID:currentILOID}, async: false, success:function(data)
        {
            if(data=="no")
            {
                    ILOExists = false;
            }
            else if(data=="yes")
            {
                    ILOExists = true;
            }

            if(ILOExists)
            {	
                ilo.getNewILOID(function(newILOID,currentILOID,newILOArray,callback)
                {
                    ILOContents.setILOArray(newILOID,newILOArray);
                    $('#'+currentILOID).attr('id',newILOID);
                    delete ILOContents.ILOArray[currentILOID];
                    callback.call();
                },[currentILOID,newILOArray,callback],callbackOnFail);

            }
            else
            {
                ILOContents.setILOArray(currentILOID,newILOArray);
                callback.call();
            }
        }});
    },

    // DESC: creates a new ILO
    // PARAMETER: newILOElement is the element in which the new ILO will be added
    // PARAMETER: newILOArray is the ILO Array of the new ILO
    // RETURNS: void
    createILO: function(newILOElement,newILOArray,callback,callbackOnFail,callbackOnFailArguments)
    {
        ilo.getNewILOID(function(newILOID,newILOElement,newILOArray,callback)
        {
            ILOContents.setILOArray(newILOID,newILOArray);
            $(newILOElement).attr('id',newILOID).addClass('ilo').attr('data-ilotype',newILOArray['type']).attr('contenteditable','false');
            callback.call();
        },[newILOElement,newILOArray,callback],callbackOnFail,callbackOnFailArguments);
    },
    
    // DESC: inserts the ILO into the content
    // PARAMETER: insertionPoint is the range where the ILO should be inserted
    // PARAMETER: ILOPlaceholder is the element in the content which holds the ILO
    // PARAMETER: insertType is a string describing how the ILO should be inserted
    // RETURNS: void
    insertILO: function(insertionPoint,ILOPlaceholder,insertType)
    {
        contentState.saveState();
        switch(insertType)
        {
            case "after":
                $(insertionPoint).after(ILOPlaceholder);
                var newParagraph = $('<p></p>');
                $(ILOPlaceholder).after(newParagraph);
                rangeTraverse.selectBefore(newParagraph[0]);
                break;
            case "insertNode":
                insertionPoint.insertNode(ILOPlaceholder);
                ilo.savedRange = document.createRange();
                ilo.savedRange.setStartAfter(ILOPlaceholder);
                ilo.savedRange.setEndAfter(ILOPlaceholder);
                break;
            case "replaceWith":
                $(insertionPoint.startContainer).replaceWith(ILOPlaceholder);
                var newParagraph = $('<p></p>');
                $(ILOPlaceholder).after(newParagraph);
                rangeTraverse.selectBefore(newParagraph[0]);
                break;
        }
        contentState.saveState();
    }
}