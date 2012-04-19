        <div id="content">
        	<section>            	
                <h1>{$course}</h1>
                <p>Click on a lesson below to begin.</p>
				<div id="listEditorHeader" data-coursepath="{$classPath}">
					<span></span>
					<span></span>
				</div>
				<ul class="sectionList listEditor">
{foreach from=$sectionArray item="section"}
					<li>
						<span data-sectionpath={$section.path} data-sectionorder={$section.order}>
							<span class="expandedList"></span>
							<span class="sectionName">{$section.name}</span>
							<span>
                            </span>
						</span>
						<ul class="lessonList">
{foreach from=$section.lessons item="lesson"}
							<li>
								<span data-lessonpath={$lesson.path} data-lessonorder={$lesson.order}>
                                    <a href="{$lesson.link}">
                                        <span></span>
                                        <span class="lessonName">{$lesson.name}</span>
                                        <span></span>
                                    </a>
								</span>
							</li>
{/foreach}
						</ul>
					</li>
					
{/foreach}
				</ul>
            </section>
            
        </div>
