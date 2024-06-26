<script lang="ts">
	import { goto } from '$app/navigation';
	import { jsonToBeEdited } from '$lib';
	import type { PhotoXJSON } from '$lib/.d.ts';

	export let data: PhotoXJSON;

	$: coppied = false;

	async function copyClipboard() {
		coppied = true;
		navigator.clipboard.writeText(JSON.stringify(data)).then(() => {
			setTimeout(() => {
				coppied = false;
			}, 1000);
		});
	}

	function formatTimeStr(time: string) {
		const [hours, minutes] = time.split(':');
		const suffix = parseInt(hours) >= 12 ? 'PM' : 'AM';
		const formattedHours = parseInt(hours) % 12 || 12;
		return `${formattedHours}:${minutes} ${suffix}`;
	}

	async function editJSON() {
		$jsonToBeEdited = data as any;
		await goto('/?editJSON=true');
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

			<aside>
				<div class="tooltip tooltip-primary" data-tip={'Edit JSON'}>
					<button class="btn" on:click={editJSON}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							class="w-4 h-auto fill-base-content"
						>
							<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
							<path
								d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
							/>
						</svg>
					</button>
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
			</aside>
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
													{formatTimeStr(time)}
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
