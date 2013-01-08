        <div id="content" data-location="{$location}">
            <section>
                <h1>{$header}</h1>
                <ul class="revisionHistory">
{foreach from=$history item="row"}
                    <li>
                        <span><a href={$row->link}>{$row->revision_date}</a></span>
                        <span>{$row->username}</span>
                        <span>{$row->name}</span>
                        <span>
{if $row->user_notes!=''}
                            ({$row->user_notes})
{/if}
                        </span>
                    </li>
{/foreach}
                </ul>
            </section>
        </div>