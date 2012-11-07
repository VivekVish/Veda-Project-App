{if $myModules|@count > 0}
<div id="myModules" class="materialList">
    <h2>My Modules</h2>
    <ul>
{foreach from=$myModules item="material"}
        <li data-lessonplanid="{$material->id}">
            <a href="index.php?type=lessonPlan&id={$material->id}">
                <img src="img/navIcons/Cough.png" />
                <h3>{$material->name}</h3>
                <p class="notes">{$material->notes}</p>
                <p class="tags">Tags: {$material->tags}</p>
            </a>
            <button class="editModule">Edit</button>
            <button class="deleteModule">Delete</button>
        </li>
{/foreach}
    </ul>
    <button id="addModule">Add</button>
</div>
{/if}