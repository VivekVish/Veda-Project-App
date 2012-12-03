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
{if $myModules|@count > 0 or $contentprovider or $admin or $teacher}
    <div id="myModules">
        <div id="myModulesHeader">
            <h2>My Modules</h2>
        </div>
        <ul>
{foreach from=$myModules item="material"}
            <li data-lessonplanid="{$material->id}">
                <a href="index.php?type=lessonPlan&id={$material->id}">
                    <img src="img/navIcons/Cough.png" />
                    <div class="moduleContent">
                        <h3>{$material->name}</h3>
                        <p class="notes">{$material->notes}</p>
                        <p class="tags"><strong>Tags:</strong> {$material->tagText}</p>
                    <div>
                </a>
                <!--<button class="editModule">Edit</button>
                <button class="deleteModule">Delete</button>-->
            </li>
{/foreach}
        </ul>
        <button id="addModule">Add</button>
    </div>
{/if}
</div>