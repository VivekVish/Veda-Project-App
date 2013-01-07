<div id="content">
	<span style="font-size: 15pt; font-weight: bold; text-decoration: underline;">Score: {$results->score}%</span>
{if $results->corrections|@count > 0}
	<div style="font-size: 15pt; font-weight: bold; padding: 10px 0px 10px 0px; text-decoration: underline;">Corrections:</div>
{foreach from=$results->corrections item=correction}
	<div style="padding-bottom: 10px;">
		<div style="font-size: 12pt; font-weight: bold; padding: 0px 0px 5px 10px;">
			<span style="padding-right: 5px;">- {$correction->question}</span>
		</div>
		<div style="font-size: 12pt; padding: 0px 0px 5px 20px;">
			<span style="padding-right: 10px;"><img style="height: 15px; width: 15px;" src="/img/incorrect.png"></span>
			<span>{$correction->submitted_answer}</span>
		</div>
		<div style="font-size: 12pt; padding: 0px 0px 5px 20px;">
			<span style="padding-right: 10px;"><img style="height: 15px; width: 15px;" src="/img/correct.png"></span>
			<span>{$correction->correct_answer}</span>
		</div>
	</div>
{/foreach}
{/if}
</div>
