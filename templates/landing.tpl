<div id="content">
    <section>
        <h1>Welcome to the Veda Project</h1>
        <p>Welcome to The Veda Project!  The Veda Project is a <strong>free, non-profit, open source, online educational platform</strong> that aims 
           to rigorously teach and test users on all the subjects one would expect in well-funded, accredited  educational institutions of all levels. 
           We aim to provide the best possible education to our users and the most powerful tools and platform to our educators to ensure the best possible 
           experience for our users . Our goal is to take you one step closer to becoming the best engineers, doctors, and scientists in the world.</p>
        <p>Our first course, <a href="index.php?field=Mathematics_and_Statistics&subject=Mathematics&course=Calculus">Calculus</a>, is complete.
           It covers both proofs and practical usage. If you plan to take the Calculus advanced placement exam&mdash;AB or BC&mdash;
           this course should be perfect for you.</p>
        <p>If you'd like to leave us any feedback, please email us at <a href="mail-to:veda@vedaproject.org">veda@vedaproject.org</a>.</p>
        <p>Content providers who have yet to contact us should probably do so at <a href="mail-to:veda@vedaproject.org">veda@vedaproject.org</a>.
           We have now begun a massive push to add content.  If you are interested in adding content to any course, please email us.</p>
        {if $contentprovider}
            <p>You can watch a video on how to add content below.</p>
            <p>If you notice any bugs, please email me.  We still have a long way to go.  Thank you for your patience!</p>
            <iframe width="560" height="315" src="http://www.youtube.com/embed/M7IPxBb3Pgw?rel=0&amp;hd=1" frameborder="0" allowfullscreen></iframe>
        {/if}
        {if !$loggedIn}
            <form action="index.php" method="get">
                <input type="hidden" name="login" value="true">
                <button id="loginbutton" type="submit">Login</button>
            </form>
        {/if}
    </section>
</div>