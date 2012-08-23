		<div id="usernav">
        	<ul>
                <li>
                    <a href="index.php?type=lessonPlanManager">Lesson Plans</a>
                </li>
            	<li> 
{if $loggedIn}
                    <a title="logout" href="resources/logout.php">Logout</a>
{else}
                    <a title="login" href="{$loginURL}">Login</a>
{/if}
                </li>
            </ul>
        </div>