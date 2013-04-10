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
                                          append('<option value="other">Other</option>');
    insertInfoBoxBox.children('ul').append('<li><button class="cancel">Cancel</button><button class="create">Create</button></li>');

    insertInfoBoxBox.find('ul>li>select').change(function()
    {
        if($(this).children(':selected').val()=="other")
        {
            insertInfoBoxBox.find('ul>li:first-of-type').after('<li><label for="infoBoxLabel">Label</label><input id="infoBoxLabel" type="text" /></li>');
            $("#infoBoxLabel").keyup(function(e)
            {
                $(this).val($(this).val().replace(/[^a-zA-Z]/g,''));
            });
        }
        else
        {
            insertInfoBoxBox.find('ul>li:first-of-type').next().remove();
        }
    });
    
    if(typeof(caretPositionRange)!="undefined")
    {
        if($(caretPositionRange.startContainer).parents('.infoBox').size()==0)
        {
            createLightBox('html','Create Info Box',insertInfoBoxBox);

            $('#insertInfoBoxBox button.create').click(function()
            {
                if($('#insertInfoBoxBox').find('select').val()=="other")
                {
                    $("#infoBoxLabel").val($("#infoBoxLabel").val().replace(/[^a-zA-Z]/g,''));
                    var infoBoxVal = $("#infoBoxLabel").val();
                }
                else
                {
                    infoBoxVal = $('#insertInfoBoxBox').find('select').val();
                }
                
                thisObject.insertInfoBox(infoBoxVal,caretPositionRange);
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
    }
    
    $('#insertInfoBoxBox button.cancel').click(function()
    {
        $('#lightbox').fadeOut('fast',function() {$(this).remove();});
        $('#overlay').fadeOut('fast',function() {$(this).remove();});
    });
}