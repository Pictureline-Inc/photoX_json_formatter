<script lang="ts">
	export let data;

	$: console.log(data);

	$: coppied = false;
	async function copyClipboard() {
		coppied = true;
		navigator.clipboard.writeText(JSON.stringify(data)).then(() => {
			setTimeout(() => {
				coppied = false;
			}, 1000);
		});
	}
</script>

<a href="/recents" class="inline-flex justify-center items-center gap-4 mb-4 group">
	<span>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-4 fill-primary">
			<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
			<path
				d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
			/>
		</svg>
	</span>
	<span class="group-hover:underline"> Go Back to Recents </span>
</a>

{#if data}
	<section class="max-w-[1200px]">
		<hgroup class="bg-neutral p-4 rounded-lg mb-4 flex justify-between items-start">
			<div>
				<span>PhotoX Event</span>
				<h1 class="text-2xl font-medium">{data.name}</h1>
			</div>

			<div class="tooltip tooltip-primary" data-tip={!coppied ? 'Copy JSON' : 'Coppied'}>
				<button class="btn fill-base-content" on:click={copyClipboard}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w-4 h-4">
						<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
						<path
							d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
						/>
					</svg>
				</button>
			</div>
		</hgroup>

		<div class="flex gap-8">
			{#if data.data?.length}
				{#each data.data as day, i}
					<div class="bg-neutral min-h-96 w-1/2 rounded-lg overflow-hidden">
						<hgroup class="p-4 border-b-[0.5px] border-primary">
							<h2>
								PhotoX Day {i + 1} — {new Intl.DateTimeFormat(navigator.language, {
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								}).format(new Date(day.date))}
							</h2>
						</hgroup>
						<ul class="p-4">
							{#each day.events as e, i}
								<li>
									<div
										class="flex items-center justify-between border-neutral-400 py-2 {i === 0 &&
											'pt-0'}"
										class:border-b-[1px]={day.events.length - 1 !== i && true}
									>
										<p>
											{e.label}
											{#if e.photowalk}
												— <span class="text-primary">Photowalk</span>
											{/if}
										</p>
										<p class="flex gap-2">
											{#each e.time as time, ti}
												<span>
													{new Intl.DateTimeFormat(navigator.language, {
														hour: 'numeric',
														minute: 'numeric',
														hour12: true
													}).format(new Date(time))}
												</span>
												{#if ti === 0}
													—
												{/if}
											{/each}
										</p>
									</div>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			{/if}
		</div>
	</section>
{/if}
