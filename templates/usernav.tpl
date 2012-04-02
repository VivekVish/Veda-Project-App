		<div id="usernav">
        	<ul>
            	<li>
                    {if $loggedIn}
                        <a title="logout" href="resources/logout.php">Logout</a>
                    {else}
                        <a title="login" href="{$loginURL}">Login</a>
                    {/if}
                </li>
            </ul>
        </div>