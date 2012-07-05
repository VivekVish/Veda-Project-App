<div id="content" data-location="{$location}">
    <section>
        <h1>{$name}</h1>
{if $video=="none"}
        <p>I'm sorry. No video has been uploaded yet.</p>
{else}
        <iframe width="640" height="360" src="http://www.youtube.com/embed/{$video}?rel=0" frameborder="0" allowfullscreen></iframe>
{/if}
        <br />
{if $contentprovider}
        <label for="videoInput">Video Input</label><input id="videoInput"></input>
        <button id="setVideoButton">Set Video</button>
{/if}
        
    </section>
</div>