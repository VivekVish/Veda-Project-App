// DESC: forces content events that aren't in info boxes to 0
// PARAMETER: e is the object of type Event
// RETURNS: void
ContentHandler.prototype.handleContentEvent = function(e)
{
    if(!rangeTraverse.hasAncestor('.infoBox'))
    {
        e.preventDefault();
    }
    else
    {
        this.parent.handleContentEvent(e);
    }
}

// DESC: inserts the ILO into the content
// PARAMETER: insertionPoint is the range where the ILO should be inserted
// PARAMETER: ILOPlaceholder is the element in the content which holds the ILO
// PARAMETER: insertType is a string describing how the ILO should be inserted
// RETURNS: void
ilo.insertILO = function(insertionPoint,ILOPlaceholder,insertType)
{
    if(rangeTraverse.hasAncestor('.infoBox'))
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

LessonAdditionProvider.prototype.insertTable = function(rows, columns, caretPositionRange)
{
    if(rangeTraverse.hasAncestor('.infoBox'))
    {
        this.parent.insertTable(rows,columns,caretPositionRange);
    }
}