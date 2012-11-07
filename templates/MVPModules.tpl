<div class="materialList">
{if $myModules|@count > 0}
    <h2>My Modules</h2>
    <ul>
{foreach from=$myModules item="material"}
        <li>
            <a href="index.php?type=lessonPlan&id={$material->id}">
                <img src="img/navIcons/Cough.png" />
                <h3>{$material->name}</h3>
                <p>{$material->notes}</p>
                <p class="tags">Tags: {$material->tags}</p>
                <button id="editModule">Edit</button>
                <button id="deleteModule">Delete</button>
            </a>    
        </li>
{/foreach}
    </ul>
{/if}
</div>