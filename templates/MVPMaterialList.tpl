{if $myModules|@count > 0 or $contentprovider or $admin or $teacher}
<div id="materialContainer" class="hasModules">
    <div class="materialList modulesAfter">
{else}
<div id="materialContainer">
    <div class="materialList">  
{/if}
        <h2>{$materialHeader}</h2>
        <ul>
{foreach from=$materialList->children item="material"}
            <li data-path="{$material->path}">
                <a href="{$material->link}">
                    <img src="img/navIcons/{$material->img}.png" />
                    <h3>{$material->name}</h3>
                    <p>{$material->description}</p>
                </a>    
            </li>
{/foreach}
        </ul>
    </div>
{if $myModules|@count > 0 or $contentprovider or $admin or $teacher}
    <div id="myModules">
        <div id="myModulesHeader">
            <h2>My Modules</h2>
        </div>
        <ul>
{foreach from=$myModules item="material"}
            <li data-lessonplanid="{$material->id}">
                <a href="index.php?type=lessonPlan&id={$material->id}&section={$material->image}&lesson={$material->image}">
                    <img src="img/navIcons/{$material->image}.png" />
                    <div class="moduleContent">
                        <h3>{$material->name}</h3>
                        <p class="notes">{$material->notes}</p>
                        <p class="tags"><strong>Tags:</strong> {$material->tagText}</p>
                    </div>
                </a>
            </li>
{/foreach}
{foreach from=$myAddedModules item="material"}
{if $material->type=="custom"}
            <li data-userlessonplanid="{$material->id}" data-lessonplanid="{$material->lessonplanid}">
                <a href="index.php?type=lessonPlan&id={$material->lessonplanid}&section={$material->image}&lesson={$material->image}">
                    <img src="img/navIcons/{$material->image}.png" />
                    <div class="moduleContent">
                        <h3>{$material->name}</h3>
                        <p class="notes">{$material->notes}</p>
                        <p class="tags"><strong>Tags:</strong> {$material->tagText}</p>
                    </div>
                </a>
            </li>
{elseif $material->type=="standard"}
            <li data-userlessonplanid="{$material->id}" data-coursepath="{$material->path}">
                <a href="{$material->link}">
                    <img src="img/navIcons/{$material->image}.png" />
                    <div class="moduleContent">
                        <h3>{$material->name}</h3>
                        <p class="notes">{$material->description}</p>
                    </div>
                </a>
            </li>
{/if}
{/foreach}
        </ul>
        <button id="addModule">Add</button>
    </div>
{/if}
</div>