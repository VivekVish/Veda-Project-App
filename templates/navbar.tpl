	
        <nav id="coursenav" data-navPosition={$navPosition}>
        	<div>
                <h2>{$navbartitle}</h2>
{if $navlevel!="fields"}                
                <div id="upToPreviousNavLevel" data-link="{$navCurrPosition}">{html_image file='img/back_button.png'}</div>
{/if}
                <ul>

                </ul>
            </div>
        </nav>