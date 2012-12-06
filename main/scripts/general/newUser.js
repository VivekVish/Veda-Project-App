////////////////////////////////////////////////////////////////
// This file handles the interface for new user registration. //
////////////////////////////////////////////////////////////////

$(document).ready(function()
{
    function checkUsername(newUsername)
    {
        if(newUsername.length<3)
		{
			$('#newUserMessageBox').html('<p class="error">The username is not 3 characters long.</p>');
            return false;
		}
		else if(newUsername.search(/[^a-zA-Z0-9]/)>-1)
		{
			$('#newUserMessageBox').html('<p class="error">The username contains invalid characters.</p>');
            return false;
		}
		else
		{
			$('#newUserMessageBox').html('');
			
			var usernamePayload = {username:$('#newUsername').val()};
			
			$.ajax({url: 'resources/usernameCheck.php', data: usernamePayload, success: function(data)
			{
				if(data=="<user>User Not Found.</user>")
				{
					$('#newUserMessageBox').html('<p class="valid">This username is available! Feel free to register.</p>');
				}
				else
				{
					$('#newUserMessageBox').html('<p class="error">Sorry.  This username has been taken.</p>');
				}
			}});
		}
    }
    
	// Logs out if user is idle for 10 minutes
	setTimeout(function()
	{
		var lightBoxContent = $("<div><ul></ul></div>");
		
		lightBoxContent.children('ul').append('<li>You were idle on this page for 10 minutes.  For security reasons, we have logged you out.  Please log back in.  Sorry for the inconvenience</li>');
		lightBoxContent.children('ul').append('<li><button id="okay">Okay</button></li>');
		
		$('#okay').live('click',function()
		{
			window.location = 'resources/logout.php';
		});
		
		createLightBox('html','Your session has timed out.',lightBoxContent);
	}, 600000);
	
	// Checks for the validity of the username being typed
	$('#newUsername').keyup(function(e)
	{
		var newUsername = $('#newUsername').val();
		
		if(newUsername.length<3)
		{
			$('#newUserMessageBox').html('<p class="error">The username is not 3 characters long.</p>');
		}
		else if(newUsername.search(/[^a-zA-Z0-9_]/)>-1)
		{
			$('#newUserMessageBox').html('<p class="error">The username contains invalid characters.</p>');
		}
		else
		{
			$('#newUserMessageBox').html('<p class="valid">The username is valid!  Check whether it\'s available.</p>');
		}
	});
	
	// checks if the username is available and valid
	$('#checkAvailableUsername').click(function(e)
	{
		var newUsername = $('#newUsername').val();
		
		checkUsername(newUsername);
	});
	
	// submits the username
	$('#submitNewUsername').click(function(e)
	{
		var newUsername = $('#newUsername').val();
		
		if(newUsername.length<3)
		{
			$('#newUserMessageBox').html('<p class="error">The username is not 3 characters long.</p>');
		}
		else if(newUsername.search(/[^a-zA-Z0-9]/)>-1)
		{
			$('#newUserMessageBox').html('<p class="error">The username contains invalid characters.</p>');
		}
		else
		{
			var usernamePayload = {username:$('#newUsername').val()};
            
            $.ajax({url: 'resources/usernameCheck.php', data: usernamePayload, success: function(data)
			{
				if(data=="<user>User Not Found.</user>")
				{
                    $.ajax({url: 'resources/submitUsername.php', data: usernamePayload, success: function(data)
                    {
                        if(data=="Success.")
                        {
                            window.location.reload();
                        }
                    }});
				}
				else
				{
					$('#newUserMessageBox').html('<p class="error">Sorry.  This username has been taken.</p>');
				}
			}});
		}
	});
});