	
        <nav id="coursenav" data-navPosition={$navPosition}>
        	<div>
                <h2>{$navbartitle}</h2>
{if $navlevel!="fields"}                
                <div id="upToPreviousNavLevel" data-link="{$navCurrPosition}">{html_image file='img/back_button.png'}</div>
{/if}
                <ul>
{foreach from=$navbarcontents item="itemarray"}
                    <li data-img="{$itemarray.img}" data-link="{$itemarray.link}">{$itemarray.name}</li>
{/foreach}
                </ul>
            </div>
        </nav>