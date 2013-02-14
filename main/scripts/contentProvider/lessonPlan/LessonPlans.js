$(document).ready(function()
{
    lessonPlans = new LessonPlans();
})

// DESC: If an action is started, is set to true.  when completed, it is set to false.
//       If actionStarted is true, a new action like a sort cannot start
LessonPlans.prototype.actionStarted = false;

LessonPlans.prototype.openAddLessonPlanLightbox = function()
{
    var thisObject = this;
        
    if(this.actionStarted===false)
    {
        this.actionStarted=true;
        
        var createLessonPlan = $('<div id="createLessonPlan"><ul></ul></div>');
        createLessonPlan.children('ul').append('<li><label for="newLessonPlanName">Lesson Plan Name</label><input id="newLessonPlanName"></input></li>');
        createLessonPlan.children('ul').append('<li><button class="cancel">Cancel</button><button class="create">Create</button></li>');
        createLightBox('#content','Create Lesson Plan',createLessonPlan);
        $('#newLessonPlanName').focus();
        
        function addLessonPlan(lessonName)
        {
            var lessonPlan = $('<a href="index.php?lessonPlanId=1">'+lessonName+'</a>');
            $('#lessonplans').append(lessonPlan);
            $('#lightbox').fadeOut('fast',function() {$(this).remove();});
            $('#overlay').fadeOut('fast',function() {$(this).remove();});
        }

        function cancel()
        {
            $('#lightbox').fadeOut('fast',function() {$(this).remove();});
            $('#overlay').fadeOut('fast',function() {$(this).remove();});
        }

        $('#newLessonPlanName').bind('keyup', function(e)
        {
            // Enter
            if(e.keyCode==13)
            {
               addLessonPlan($('#newLessonPlanName').val().replace(/_/g,' ')); 
            }
            // Escape
            else if(e.keyCode==27)
            {
                cancel();
            }
        });

        $('#createLessonPlan button.create').click(function()
        {
            addLessonPlan($('#newLessonPlanName').val().replace(/_/g,' '));
        });

        $('#createLessonPlan button.cancel').click(function()
        {
            cancel();
        });
    }
    
    this.actionStarted=false;
}

function LessonPlans()
{
    var thisObject = this;
    
    $('#addLessonPlan').click(function()
    {
        thisObject.openAddLessonPlanLightbox();
    });
}