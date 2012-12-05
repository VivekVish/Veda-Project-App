	
        <nav id="coursenav" data-navPosition={$navPosition}>
            <div>
                <div id="coursenavheader">
                        <h2>{$navbartitle}</h2>
{if $navlevel!="fields"}                
                        <div id="upToPreviousNavLevel" data-link="{$navCurrPosition}">{html_image file='img/back_button.png'}</div>
{/if}
                </div>
                <ul>

                </ul>
            </div>
        </nav>