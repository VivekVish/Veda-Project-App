////////////////////////////////////////////////////////////////
// The Message object sends error, success, warning, or info //
// messages to the user.                                      //
////////////////////////////////////////////////////////////////

Message.prototype.display = function()
{
    var opts = this.opts;
    var messageDiv = $('<div class="message">');
    messageDiv.append('<img src="img/messageIcons/'+opts.type+'.png" />');
    messageDiv.append('<p>'+this.messageContent+'</p>');
    
    $(opts.container).append(messageDiv);
    
    var leftPosition = ($(window).width() - messageDiv.width()) * opts.positionX;
    var topPosition = ($(window).height() - messageDiv.height()) * opts.positionY;
    messageDiv.css('left',leftPosition+'px');
    messageDiv.css('top',topPosition+'px');
    
    $(messageDiv).hide();
    
    $(messageDiv).children('img').load(function()
    {
        $(messageDiv).show();
    })
    
    function fadeDivOut()
    {
        messageDiv.fadeOut(opts.fadeOutTime,function(){$(this).remove()});
    }

    setTimeout(fadeDivOut,opts.fadeOutDelay)
}

function Message(messageContent,opts)
{
    opts = (typeof(opts)=='undefined') ? {} : opts;
    opts.displayNow = (typeof(opts.displayNow)=='undefined') ? true : opts.displayNow;
    opts.positionX = (typeof(opts.positionX)=='undefined') ? '0.5' : opts.positionX;
    opts.positionY = (typeof(opts.positionY)=='undefined') ? '0.25' : opts.positionY;
    opts.container = (typeof(opts.container)=='undefined') ? 'body' : opts.container;
    opts.fadeOutDelay = (typeof(opts.fadeOutDelay)=='undefined') ? 1000 : opts.fadeOutDelay;
    opts.fadeOutTime = (typeof(opts.fadeOutTime)=='undefined') ? 2000 : opts.fadeOutTime;
    
    // Checks whether the message is an array from the API.  If so, parses it.
    try
    {
        var messageArray = $.parseJSON(messageContent);
        opts.type = 'error';
        
        this.opts = opts;
        this.messageContent = messageArray['message'];
    }
    // If not, deliver the message straight.
    catch(e)
    {
        if(messageContent=="Success.")
        {
            opts.type = (typeof(opts.type)=='undefined') ? 'success' : opts.type;
            
            this.opts = opts;
            this.messageContent = "Success";
        }
        else
        {
            opts.type = (typeof(opts.type)=='undefined') ? 'error' : opts.type;

            this.opts = opts;
            this.messageContent = messageContent;
        }
    }

    if(opts.displayNow)
    {
        this.display();
    }
}