<div id="header">
    <img src="/img/Logo.png" />
</div>
<div id="main">
    <div id="introvideo">
        <iframe width="853" height="480" src="http://www.youtube.com/embed/ScMzIvxBSi4" frameborder="0" allowfullscreen></iframe>
    </div>
    <div id="loginBoxes">
        <div id="login">
            <iframe src="http://the-veda-project.rpxnow.com/openid/embed?token_url=http%3A%2F%2F{$SITE_ROOT}%2Fresources%2Frpx.php?destination={$destination}" scrolling="no" frameBorder="no" allowtransparency="true" style="width:400px;height:240px"></iframe>
        </div>
        <div id="guest">
            <form action="index?type=home">
                <input type="text" name="type" value="home" hidden="true" />
                <button id="guestLogin">Login as Guest</button>
            </form>
        </div>
    </div>
</div>