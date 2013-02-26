$(document).ready(function()
{
	////////////
	// EVENTS //
	////////////
	
	// EVENT: Content Provider clicks the Reassign Quiz Question Button to change the topic of the particular quiz question
	$('.reassignQuizQuestion').click(function()
	{
		var buttonPressed = this;
		var lightBoxContents = $('<div id="reassignQuestionLightBox"><ul></ul><div><button class="nobutton">No</button><button class="yesbutton">Yes</button></div></div>');
		lightBoxContents.children('ul').append('<li><label>Field</label><select class="topicFieldSelect"></select></li>');
		lightBoxContents.children('ul').append('<li><label>Subject</label><select class="topicSubjectSelect"></select></li>');
		lightBoxContents.children('ul').append('<li><label>Class</label><select class="topicCourseSelect"></select></li>');
		lightBoxContents.children('ul').append('<li><label>Section</label><select class="topicSectionSelect"></select></li>');
		lightBoxContents.children('ul').append('<li><label>Lesson</label><select class="topicLessonSelect"></select></li>');
		var topicPathArray = $(this).attr('data-questiontopicpath').replace(/^\/data\/material\/|\/$/g,'').split('/');
		
		var navList = lightBoxContents.children('ul');
		
		for(i=0;i<topicPathArray.length;i++)
		{
			var tempArray = new Array();
			for(j=0;j<=i-1;j++)
			{
				tempArray.push(topicPathArray[j].replace(/ /g,'_'));
			}

			var navPosition = {lesson:tempArray[4], section:tempArray[3], course:tempArray[2], subject:tempArray[1],field:tempArray[0]};
			
			quizOverview.setTopicSelects(i,navPosition,navList,topicPathArray);
		}
		
		$(navList).find('select').change(function()
		{
			$(this).parent('li').nextAll().children('select').empty();
			for(k=$(this).parent('li').prevAll().size();k<$(this).parent('li').siblings().size();k++)
			{
				var tempArray = new Array();
				for(j=0;j<=k;j++)
				{
					tempArray.push(navList.find('li:nth-child('+eval(j+1)+')>select>option:selected').val());
					if(typeof(tempArray[j])!='undefined')
					{
						tempArray[j] = tempArray[j].replace(/ /g,'_')	
					}
				}
				
				var navPosition = {lesson:tempArray[4], section:tempArray[3], course:tempArray[2], subject:tempArray[1],field:tempArray[0]};
				
				quizOverview.setTopicSelects(k+1,navPosition,navList);
			}
		});
				
		createLightBox("#content","Re-assign Question Topic",lightBoxContents);
		var buttonPressed = this;
		
		$('#reassignQuestionLightBox .yesbutton').click(function()
		{
			$.ajax({url : 'resources/reassignQuizQuestion.php', type: 'GET',
					data:
				   	{
					   'quizBlueprintId':$(buttonPressed).attr('data-quizblueprintid'),
					   'questionBlueprintId':$(buttonPressed).attr('data-questionblueprintid'),
					   'field': $('.topicFieldSelect option:selected').val().replace(/ /g,'_'),
					   'subject': $('.topicSubjectSelect option:selected').val().replace(/ /g,'_'),
					   'course': $('.topicCourseSelect option:selected').val().replace(/ /g,'_'),
					   'section': $('.topicSectionSelect option:selected').val().replace(/ /g,'_'),
					   'lesson': $('.topicLessonSelect option:selected').val().replace(/ /g,'_')
				   	},
				   	success:function(data)
				    {
						if(data!="failure")
						{
							$(buttonPressed).parents('tr').children('td.topicEntry').html($('.topicLessonSelect option:selected').val());
							var newPath = '/data/material/'+$('.topicFieldSelect option:selected').val().replace(/ /g,'_')+'/'+$('.topicSubjectSelect option:selected').val().replace(/ /g,'_')+
										  '/'+$('.topicCourseSelect option:selected').val().replace(/ /g,'_')+'/'+$('.topicSectionSelect option:selected').val().replace(/ /g,'_')
										  '/'+$('.topicLessonSelect option:selected').val().replace(/ /g,'_')+'/';
							$(buttonPressed).attr('data-questiontopicpath',newPath);
						}
				    },
					complete:function()
					{
						$('#lightbox').fadeOut('fast', function() { $(this).remove() } );
						$('#overlay').fadeOut('fast', function() { $(this).remove() } );
				    }
				   });
		});
		
		$('#reassignQuestionLightBox .nobutton').click(function()
		{
			$('#lightbox').fadeOut('fast', function() { $(this).remove() } );
			$('#overlay').fadeOut('fast', function() { $(this).remove() } );	
		});
	});
	
	// EVENT: Content Provider clicks the Detach Quiz Question Button to detach a question from the quiz in question
	$('.detachQuizQuestion').click(function()
	{
		var lightBoxContents = $('<div id="detachQuestionLightBox">Are you sure you want to detach this question from this quiz?<div><button class="nobutton">No</button><button class="yesbutton">Yes</button></div></div>');
		createLightBox("#content","Detach Question",lightBoxContents);
		var buttonPressed = this;
		
		$('#detachQuestionLightBox .yesbutton').click(function()
		{
			$.ajax({url : 'resources/detachQuizQuestion.php', type: 'POST',data:{'quizBlueprintId':$(this).attr('data-quizblueprintid'),'questionBlueprintId':$(this).attr('data-questionblueprintid')},success:function(data)
			{
				if(data!="failure")
				{
					$(buttonPressed).parents('tr').first().remove();
				}
			},complete:function()
			{
				$('#lightbox').fadeOut('fast', function() { $(this).remove() } );
				$('#overlay').fadeOut('fast', function() { $(this).remove() } );
			}});
		});
		
		$('#detachQuestionLightBox .nobutton').click(function()
		{
			$('#lightbox').fadeOut('fast', function() { $(this).remove() } );
			$('#overlay').fadeOut('fast', function() { $(this).remove() } );	
		});
	});
	
	// EVENT: Content Provider clicks the Delete Quiz Question Button to permanently delete a question, detaching it frm not only the current quiz but all quizzes
	$('.deleteQuizQuestion').click(function()
	{
        var questionId = $(this).parents('tr').children('td').first().html();
		var lightBoxContents = $('<div id="deleteQuestionLightBox">Are you sure you want to permanently delete this question from not only this quiz but all quizzes?  If you just want to remove it from this quiz, simply detach it.<div><button class="nobutton">No</button><button class="yesbutton" data-questionblueprintid="'+questionId+'">Yes</button></div></div>');
		createLightBox("#content","Delete Question",lightBoxContents);
		var buttonPressed = this;
		
		$('#deleteQuestionLightBox .yesbutton').click(function()
		{
			$.ajax({url : 'resources/deleteQuizQuestion.php', type: 'POST',data:{'quizBlueprintId':$(this).attr('data-quizblueprintid'),'questionBlueprintId':$(this).attr('data-questionblueprintid')},success:function(data)
			{
				if(data!="failure")
				{
					$(buttonPressed).parents('tr').first().remove();
				}
			},complete:function()
			{
				$('#lightbox').fadeOut('fast', function() { $(this).remove() } );
				$('#overlay').fadeOut('fast', function() { $(this).remove() } );
			}});
		});
		
		$('#deleteQuestionLightBox .nobutton').click(function()
		{
			$('#lightbox').fadeOut('fast', function() { $(this).remove() } );
			$('#overlay').fadeOut('fast', function() { $(this).remove() } );	
		});
	});
	
	// EVENT: Content provider clicks the Attach Question Button to tie an already made question to a quiz
	$('#attachQuestion').click(function()
	{
            var lightBoxContents = $('<div id="attachQuestionLightBox"><ul></ul><div><button class="nobutton">No</button><button class="yesbutton">Yes</button></div></div>');
            lightBoxContents.children('ul').append('<li><label>Field</label><select class="topicFieldSelect"></select></li>');
            lightBoxContents.children('ul').append('<li><label>Subject</label><select class="topicSubjectSelect"></select></li>');
            lightBoxContents.children('ul').append('<li><label>Class</label><select class="topicCourseSelect"></select></li>');
            lightBoxContents.children('ul').append('<li><label>Section</label><select class="topicSectionSelect"></select></li>');
            lightBoxContents.children('ul').append('<li><label>Lesson</label><select class="topicLessonSelect"></select></li>');
            lightBoxContents.children('ul').append('<li><label>Question</label><select class="questionSelect"></select></li>');

            var topicPathArray = $('#quizOverview').attr('data-quizpath').replace(/^\/data\/material\/|\/$/g,'').split('/');

            var navList = lightBoxContents.children('ul');

            for(i=0;i<topicPathArray.length;i++)
            {
                var tempArray = new Array();
                for(j=0;j<=i-1;j++)
                {
                        tempArray.push(topicPathArray[j].replace(/ /g,'_'));
                }

                var navPosition = {lesson:tempArray[4], section:tempArray[3], course:tempArray[2], subject:tempArray[1],field:tempArray[0]};

                quizOverview.setTopicSelects(i,navPosition,navList,topicPathArray);
            }

            $(navList).find('select').change(function()
            {
                $(this).parent('li').nextAll().children('select').empty();
                for(k=$(this).parent('li').prevAll().size();k<$(this).parent('li').siblings().size()-1;k++)
                {
                    var tempArray = new Array();
                    for(j=0;j<=k;j++)
                    {
                        tempArray.push(navList.find('li:nth-child('+eval(j+1)+')>select>option:selected').val());
                        if(typeof(tempArray[j])!='undefined')
                        {
                            tempArray[j] = tempArray[j].replace(/ /g,'_')	
                        }
                    }

                    var navPosition = {lesson:tempArray[4], section:tempArray[3], course:tempArray[2], subject:tempArray[1],field:tempArray[0]};

                    quizOverview.setTopicSelects(k+1,navPosition,navList);
                }

                var tempArray = new Array();
                for(j=0;j<=$(this).parent('li').siblings().size();j++)
                {
                    tempArray.push(navList.find('li:nth-child('+eval(j+1)+')>select>option:selected').val());
                    if(typeof(tempArray[j])!='undefined')
                    {
                        tempArray[j] = tempArray[j].replace(/ /g,'_')	
                    }
                }

                $.ajax({url : 'resources/getQuestionBlueprint.php', type: 'GET', data: tempArray, async: false,
                    success: function(data)
                    {
                        $(data).find('questionBlueprint').each(function(index)
                        {
                            var questionContent = $(this).children('content').html();
                            navList.find('li:last-child>select').append('<option value="'+questionContent+'">'+questionContent+'</option>');
                            if(index==0)
                            {
                                navList.find('li:last-child>select option:last-child').attr('selected','selected');
                            }
                        });
                    }
               });
            });

            createLightBox("#content","Re-assign Question Topic",lightBoxContents);

            $('#attachQuestionLightBox .yesbutton').click(function()
            {
                    $.ajax({url : 'resources/attachQuizQuestion.php', type: 'GET',
                                data:
                                {
                                   'quizBlueprintId':$(buttonPressed).attr('data-quizblueprintid'),
                                   'questionBlueprintId':$(buttonPressed).attr('data-questionblueprintid'),
                                   'field': $('.topicFieldSelect option:selected').val().replace(/ /g,'_'),
                                   'subject': $('.topicSubjectSelect option:selected').val().replace(/ /g,'_'),
                                   'course': $('.topicCourseSelect option:selected').val().replace(/ /g,'_'),
                                   'section': $('.topicSectionSelect option:selected').val().replace(/ /g,'_'),
                                   'lesson': $('.topicLessonSelect option:selected').val().replace(/ /g,'_'),
                                   'question_id': $('').val()
                                },
                                success:function(data)
                                {
                                    if(data!="failure")
                                    {
                                            // FILL IN LATER
                                    }
                                },
                                complete:function()
                                {
                                    $('#lightbox').fadeOut('fast', function() { $(this).remove() } );
                                    $('#overlay').fadeOut('fast', function() { $(this).remove() } );
                                }
                               });
            });

            $('#attachQuestionLightBox .nobutton').click(function()
            {
                $('#lightbox').fadeOut('fast', function() { $(this).remove() } );
                $('#overlay').fadeOut('fast', function() { $(this).remove() } );	
            });
	});
    
    // EVENT: Content provider clicks the add question button
    $('#addQuestion').click(function()
    {
        var quizPath = $('#content #quizOverview').attr('data-quizpath').replace(/^\/data\/material\/|\/$/g,'').split('/');
        window.location = "index.php?field="+quizPath[0]+"&subject="+quizPath[1]+"&course="+quizPath[2]+"&section="+quizPath[3]+"&lesson="+quizPath[4]+"&type=questionBlueprint&id=new";
    });
    
    $('#viewFullQuiz').click(function()
    {
        var quizPath = $('#content #quizOverview').attr('data-quizpath').replace(/^\/data\/material\/|\/$/g,'').split('/');
        window.location = "index.php?field="+quizPath[0]+"&subject="+quizPath[1]+"&course="+quizPath[2]+"&section="+quizPath[3]+"&lesson="+quizPath[4]+"&type=printableQuiz";
    });
    
    $('#viewQuizAnswers').click(function()
    {
        var quizPath = $('#content #quizOverview').attr('data-quizpath').replace(/^\/data\/material\/|\/$/g,'').split('/');
        window.location = "index.php?field="+quizPath[0]+"&subject="+quizPath[1]+"&course="+quizPath[2]+"&section="+quizPath[3]+"&lesson="+quizPath[4]+"&type=printableQuizAnswers";
    });
});


var quizOverview = 
{
    setTopicSelects: function(i, navPosition, navList, defaultPath)
    {
        $.ajax({url : 'resources/getCourseNav.php', type: 'GET', data: navPosition, async: false,
                success: function(data)
                {
                    $(data).find('field,subject,course,section,lesson').each(function(index)
                    {
                        var addedName = $(this).children('name').html();
                        navList.find('li:nth-child('+eval(i+1)+')>select').append('<option value="'+addedName+'">'+addedName+'</option>');
                        if(typeof(defaultPath)!='undefined')
                        {
                            if(addedName==defaultPath[i].replace(/_/g,' '))
                            {
                                    navList.find('li:nth-child('+eval(i+1)+')>select option:last-child').attr('selected','selected');
                            }
                        }
                        else
                        {
                            if(index==0)
                            {
                                    navList.find('li:nth-child('+eval(i+1)+')>select option:last-child').attr('selected','selected');
                            }
                        }
                    });
                }
        });
    }
}