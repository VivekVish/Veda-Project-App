<div id="header">
    <img src="/img/Logo.png" />
{if $loggedIn}
                    <a title="logout" href="resources/logout.php">LOGOUT</a>
{else}
                    <a title="login" href="{$loginURL}">LOGIN</a>
{/if}
</div>