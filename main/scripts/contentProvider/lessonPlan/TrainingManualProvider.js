ContentProvider.prototype.openInfoBoxLightbox = function()
{
    var thisObject = this;
    
    var caretPositionRange = rangeTraverse.getCurrentRange();
    var insertInfoBoxBox = $('<div id="insertInfoBoxBox"><ul></ul></div>');
    insertInfoBoxBox.children('ul').append('<li><select></select></li>');
    insertInfoBoxBox.find('ul>li>select').append('<option value="definition">Definition</option>').
                                          append('<option value="theorem">Theorem</option>').
                                          append('<option value="warning">Warning</option>').   
                                          append('<option value="information">Information</option>').
                                          append('<option value="teacher">Teacher\'s Manual</option>').
                                          append('<option value="roleplay">Roleplay</option>').
                                          append('<option value="jobaide">Job Aide</option>').
                                          append('<option value="studentparticipation">Student Participation</option>').
                                          append('<option value="discussion">Discussion</option>');
    insertInfoBoxBox.children('ul').append('<li><button class="cancel">Cancel</button><button class="create">Create</button></li>');

    if($(caretPositionRange.startContainer).parents('.infoBox').size()==0)
    {
        createLightBox('html','Create Info Box',insertInfoBoxBox);

        $('#insertInfoBoxBox button.create').click(function()
        {
            thisObject.insertInfoBox($('#insertInfoBoxBox').find('select').val(),caretPositionRange);
            $('#lightbox').fadeOut('fast',function() {$(this).remove();});
            $('#overlay').fadeOut('fast',function() {$(this).remove();});
        });
    }
    else
    {
        createLightBox('html','Change Info Box',insertInfoBoxBox);

        $('#insertInfoBoxBox button.create').click(function()
        {
            thisObject.changeInfoBoxType($('#insertInfoBoxBox').find('select').val(),$(caretPositionRange.startContainer).parents('.infoBox').first());
            $('#lightbox').fadeOut('fast',function() {$(this).remove();});
            $('#overlay').fadeOut('fast',function() {$(this).remove();});
        });
    }

    $('#insertInfoBoxBox button.cancel').click(function()
    {
        $('#lightbox').fadeOut('fast',function() {$(this).remove();});
        $('#overlay').fadeOut('fast',function() {$(this).remove();});
    });
}