$(document).ready(function()
{
    moduleList = new ModuleList();
});

// DESC: Creates add module button
// PARAMETERS: moduleItem is the DOM element (type li) that the add Module button should be added to
// RETURNS: void
ModuleList.prototype.createAddModuleButton = function(moduleItem)
{
    $(moduleItem).append('<div class="addToMyModulesDiv"><img title="Add To My Modules" class="addToMyModules" src="img/editorIcons/addModule_icon.png" /></div>');
    
    $(".addToMyModules[title]").tooltip({
      show: "false",
      hide: "false",
      position: {
        my: "center top+16",
        at: "center bottom",
        using: function( position, feedback ) {
          $( this ).css( position );
          $( "<div>" )
            .addClass( "arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
        }
      },
      content: function()
      {
          return "<p>"+$(this).attr('title')+"<p>";
      }
    });
}

// DESC: Removes the module button
// PARAMETERS: moduleItem is the DOM element (type li) that the add Module button should be removed from
// RETURNS: void
ModuleList.prototype.removeAddModuleButton = function(moduleItem)
{
    $(moduleItem).children('.addToMyModulesDiv').remove();
}

// DESC: Add chosen module to My Modules
// PARAMETERS: moduleItem is the DOM element (type li) that the add Module button should be removed from
// RETURNS: void
ModuleList.prototype.addModuleToMyModules = function(moduleItem)
{
    var payload = {path:$(moduleItem).attr('data-path')};
    $.ajax({url:'resources/addToMyLessonPlans.php', type: 'POST', data: payload, success: function(data)
    {
        try
        {
            var jsonArray = $.parseJSON(data);
            if(jsonArray.status=="success")
            {
                $('#myModules ul').append('<li data-userlessonplanid="'+jsonArray.id+'" data-coursepath="'+payload.path+'"></li>').children('li:last-of-type').
                                   append('<a href="'+$(moduleItem).children('a').attr('href')+'"></a>').children('a').
                                   append('<img src="'+$(moduleItem).find('a>img').attr('src')+'" />').
                                   append('<div class="moduleContent"></div>').children('div').
                                   append('<h3>'+(moduleItem).find('a>h3').text()+'</h3>').
                                   append('<p class="notes">'+(moduleItem).find('a>p').text()+'</p>');
            }
            else
            {
                new Message(data);
            }
        }
        catch(e)
        {
            new Message(data);
        }
    }});
}

function ModuleList()
{
    var thisObject = this;
    
    $('.materialList>ul>li').hover(function()
    {
        thisObject.createAddModuleButton(this);
    }, function()
    {
        thisObject.removeAddModuleButton(this);
    });
    
    $(document).on('click','.materialList>ul>li .addToMyModules',function()
    {
        thisObject.addModuleToMyModules($(this).parents('li'));
    });
}