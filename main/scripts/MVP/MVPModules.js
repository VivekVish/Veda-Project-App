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
    $(".addToMyModules[title]").tooltip({position: 'bottom left', relative: true, layout: '<div></div>', onBeforeShow: function()
    {
        var tooltip = this.getTip();
        var paragraph = $('<table><tbody><tr><td vertical-align="middle"><p></p></td></tr></tbody></table>');
        paragraph.find('p').append(tooltip.text());
        tooltip.empty();
        tooltip.append(paragraph);
        
    }, events:
    {
        tooltip: ",mouseenter mouseleave"
    }});
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
        new Message(data);
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
    
    $('.materialList>ul>li .addToMyModules').live('click',function()
    {
        thisObject.addModuleToMyModules($(this).parents('li'));
    });
}