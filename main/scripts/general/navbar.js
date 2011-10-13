////////////////////////////////////////////////////////////////
// The navbar object allows the user to navigate through  	  //
// content.  When a field, subject, course is clicked, the    //
// navigation bar is changed appropriately.  When a lesson is //
// clicked, it is loaded. 									  //
////////////////////////////////////////////////////////////////

$(document).ready(function()
{
	// Add images to navigation links
	navigationBar = new navbar();
});

function navbar()
{
	this.fill = function(navBarTitle, backLocation, navbarLinks,callback)
	{		
		$('nav#coursenav>div').fadeOut('fast',
			function()
			{
				$('#coursenav>div>h2').remove();
				$('#coursenav>div').prepend("<h2>"+navBarTitle+"</h2>");
				
				$('#upToPreviousNavLevel').remove();
				
				if(!navbarObject.fields)
				{
					$('#coursenav>div>h2').after('<div id="upToPreviousNavLevel" data-link="'+backLocation+'"><img src="img/back_button.png" /></div>');
				}
				
				$('#coursenav>div>ul').remove();
				$('#coursenav>div').append('<ul></ul>');
				
				if(navbarObject.lessons)
				{
					$('nav#coursenav').addClass('lessonNav');
					for(i=0;i<navbarLinks.length;i++)
					{
						$('#coursenav>div>ul').append('<li>'+navbarLinks[i]["name"]+'</li>');
						$('#coursenav>div>ul>li:last-of-type').append('<ul></ul>');
						for(j=0;j<navbarLinks[i].lessons.length;j++)
						{
							$('#coursenav>div>ul>li:last-of-type>ul').append('<li data-link="'+navbarLinks[i].lessons[j]['link']+'">'+eval(j+1)+'. '+navbarLinks[i].lessons[j]["name"]+'</li>');
						}
					}
				}
				else
				{
					$('#coursenav').removeClass('lessonNav');
					for(i=0;i<navbarLinks.length;i++)
					{
						$('#coursenav>div>ul').append('<li data-img="'+navbarLinks[i]['img']+'" data-link="'+navbarLinks[i]['link']+'">'+navbarLinks[i]["name"]+'</li>');
					}
				}
				
				if(typeof(callback)=='function')
				{
					callback.call(this);
				}
			}			
		 );
	}
	
	this.display = function()
	{
		var navlinks = $('nav#coursenav ul li');
		
		if(!navbarObject.lessons)
		{
			for(i=0;i<navlinks.length;i++)
			{
				$(navlinks[i]).prepend('<img data-loaded="false" src=img/navIcons/'+$(navlinks[i]).attr('data-img')+".png />");
			}
		
			navlinks.find('img').load(function()
			{
				if($(this).parent().siblings().children('img[data-loaded=false]').size()==0)
				{
					$('nav#coursenav>div').fadeIn('fast',function()
					{
						navbarObject.readyToProcess=true;	
					});
				}
				else
				{
					$(this).attr('data-loaded',"true");
				}
			});
		}
		else
		{
			$('nav#coursenav>div').fadeIn('fast', function()
			{
				navbarObject.readyToProcess=true;	
			});
		}
			
	}
	
	// DESC: Uses the navigation bar location to get and fill the links associated with that location
	// PARAMETER: navBarLocation is the the slash-separated level of navigation
	// RETURNS: void
	this.processPosition = function(navBarLocation)
	{
		if(navbarObject.readyToProcess)
		{
			navbarObject.readyToProcess=false;
			var linkArray = navBarLocation.replace(/^\/data\/material\/|\/$/g,'').split('/');
			var navPosition = {lesson:linkArray[4],section:linkArray[3], course:linkArray[2], subject:linkArray[1],field:linkArray[0]};
            
			$.ajax({url : 'resources/getCourseNav.php', type: 'GET', data: navPosition,success: function(data)
			{
				var backLocation = '/data/';
				currentPath = $(data).children('path').html();
				if(currentPath!==null)
				{
					var backLocationArray = $(data).children('path').html().split('/');
					backLocationArray.splice(backLocationArray.length-2,1);
					var backLocation = backLocationArray.join('/');
				}
				
				var newNavBarLinks = new Array();
				var newNavBarTitle = $(data).children('name').html()==null ? 'Fields' : $(data).children('name').html();
				
                navbarObject.fields = false;
				navbarObject.courses = false;
                navbarObject.lessons = false;
                               
				if($(data)[0].nodeName=='SUBJECT')
				{
					navbarObject.courses = true;
				}
                
				if($(data)[0].nodeName=='COURSE')
				{
					navbarObject.fields = false;
					navbarObject.lessons = true;
        
                    if($(data).find('section').size()>0)
                    {
                        $(data).find('section').each(function(index)
                        {
                            newNavBarLinks.push({link:$(this).children('path').html(),name:$(this).children('name').html(),lessons:new Array()});
                            var sectionLinkArray = newNavBarLinks[index].link.replace(/^\/data\/material\/|\/$/g,'').split('/');
                            var sectionNavPosition = {section:sectionLinkArray[3], course:sectionLinkArray[2], subject:sectionLinkArray[1],field:sectionLinkArray[0]};

                            $.ajax({url: 'resources/getCourseNav.php',type:'GET',data:sectionNavPosition,success:function(innerData)
                            {
                                $(innerData).find('lesson').each(function(innerIndex)
                                {
                                    newNavBarLinks[index].lessons.push({link:$(this).children('path').html(),name:$(this).children('name').html()});
                                });

                                if(index==$(data).find('section').size()-1)
                                {
                                    navbarObject.fill(newNavBarTitle, backLocation, newNavBarLinks,navbarObject.display);
                                }
                            }});
                        });
                    }
                    else
                    {
                        navbarObject.fill(newNavBarTitle, backLocation, newNavBarLinks,navbarObject.display);
                    }
				}
				else
				{
					if($(data)[0].nodeName=='DATA')
					{
						navbarObject.fields = true;
					}
					else
					{
						navbarObject.fields = false;
					}
					navbarObject.lessons = false;
					$(data).find('field,subject,course').each(function(index)
					{
						newNavBarLinks.push({link:$(this).children('path').html(),name:$(this).children('name').html(),img:$.trim($(this).children('name').html()).replace(/ /g,'_')});
					});	
                    
                    navbarObject.fill(newNavBarTitle, backLocation, newNavBarLinks,navbarObject.display);
				}
			
				
				$('#coursenav').attr('data-navPosition',navBarLocation);
			}});
		}
	}
	
	var navbarObject = this;
	this.fields = false;
	this.lessons = false;
	this.courses = false;
	this.readyToProcess=true;

	this.processPosition($('#coursenav').attr('data-navPosition'));
	
	$('#coursenav>div>ul>li').live('click',function(e)
	{
        if(navbarObject.readyToProcess)
        {
            if(navbarObject.courses)
            {
                navBarLocation = $(this).attr('data-link');
                var linkArray = navBarLocation.replace(/^\/data\/material\/|\/$/g,'').split('/');
                var navPosition = {course:linkArray[2], subject:linkArray[1],field:linkArray[0]};

                window.location = "index.php?field="+navPosition.field+"&subject="+navPosition.subject+"&course="+navPosition.course;
            }
            else if(!navbarObject.lessons)
            {
                navbarObject.processPosition($(this).attr('data-link'));
            }
        }
	});
	
	$('#coursenav>div>ul>li>ul>li').live('click',function(e)
	{
        if(navbarObject.readyToProcess)
        {
            navBarLocation = $(this).attr('data-link');
            var linkArray = navBarLocation.replace(/^\/data\/material\/|\/$/g,'').split('/');
            var navPosition = {lesson:linkArray[4],section:linkArray[3], course:linkArray[2], subject:linkArray[1],field:linkArray[0]};

            window.location = "index.php?field="+navPosition.field+"&subject="+navPosition.subject+"&course="+navPosition.course+"&section="+escape(navPosition.section)+"&lesson="+escape(navPosition.lesson);
        }
	});
	
	$('nav#coursenav>div>div#upToPreviousNavLevel').live('click', function(e)
	{
		navbarObject.processPosition($(this).attr('data-link'));
	});
}