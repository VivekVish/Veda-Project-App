<div class="materialList">
    <h2>{$materialHeader}</h2>
    <ul>
{foreach from=$materialList->children item="material"}
        <li>
            <a href="{$material->link}">
                <img src="img/navIcons/{$material->img}.png" />
                <h3>{$material->name}</h3>
                <p>{$material->description}</p>
            </a>    
        </li>
{/foreach}
    </ul>
</div>