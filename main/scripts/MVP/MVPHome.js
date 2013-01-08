$(document).ready(function()
{
    $('a[href="index.php?field=CHW_Training&subject=Manager_Training"],a[href="index.php?field=CHW_Training&subject=Supervisor_Training"]').click(function(e)
    {
        new Message("Coming soon...");
        e.preventDefault();
    });
});