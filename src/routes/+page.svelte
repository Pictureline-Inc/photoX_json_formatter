<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PhotoXDay, PhotoXJSON } from '$lib/.d.ts';

	export let form;
	const maxDays = 2;
	const photoXDay: PhotoXDay = {
		id: 0,
		date: '',
		events: [{ label: '', time: [] }]
	};

	$: jsonData = [photoXDay] as PhotoXJSON;
	$: jsonString = JSON.stringify(jsonData, null, 2);

	function addPhotoXDay() {
		if (jsonData.length >= maxDays) return;
		jsonData = [
			...jsonData,
			{
				id: jsonData.length,
				date: '',
				events: [{ label: '', time: [] }]
			}
		];
	}

	function addNestedEvent(id: number) {
		jsonData = jsonData.map((day) => {
			if (day.id === id) day.events.push({ label: '', time: [] });
			return day;
		});
	}

	function removeNestedEvent(id: number, index: number) {
		jsonData = jsonData.map((day) => {
			if (day.events.length === 1) return day;
			if (day.id === id) day.events.splice(index, 1);
			return day;
		});
	}

	function resetDay(id: number) {
		jsonData = jsonData.map((day) => {
			if (day.id === id) {
				day.date = '';
				day.events = [{ label: '', time: [] }];
				document.querySelectorAll(`#day-${id} input`).forEach((node) => {
					(node as HTMLInputElement).value = '';
				});
			}
			return day;
		});
	}

	$: coppied = false;
	async function copyClipboard() {
		const code = document.querySelector('#JSON_STRING') as HTMLElement;
		coppied = true;
		navigator.clipboard.writeText(code?.innerText).then(() => {
			setTimeout(() => {
				coppied = false;
			}, 1000);
		});
	}

	function formEnhance({ formElement, formData, action, cancel, submitter }) {
		formData = new FormData();
		formData.append('jsonData', JSON.stringify(jsonString, null, 4));
		return async ({ result, update }) => {
			update({ ok: true });
		};
	}
</script>

<section>
	<div class="bg-neutral rounded-lg overflow-hidden max-w-4xl mx-auto">
		<hgroup class="px-8 flex justify-between items-center bg-base-300 py-4">
			<h1 class="text-2xl font-medium">PhotoX JSON Formatter</h1>

			<aside>
				<button type="button" class="btn btn-sm rounded" on:click={() => {}}> Create JSON</button>
				<button type="button" class="btn btn-sm rounded" on:click={() => {}}> Upload JSON </button>
			</aside>
		</hgroup>

		{#if !form?.ok}
			<form
				id="JSON_Formatter"
				method="POST"
				action="?/formatJSON"
				class="p-8"
				use:enhance={formEnhance}
			>
				<section id="form_fields" class="mb-4">
					{#each jsonData as j, i}
						<fieldset
							id="day-{j.id}"
							class="bg-base-200 relative p-4 rounded outline outline-primary/30 shadow-md mb-4"
						>
							<button
								type="button"
								class="btn btn-sm btn-ghost rounded absolute top-4 right-4"
								on:click={() => resetDay(j.id)}
							>
								Reset
							</button>

							<legend class="sr-only">Day {i + 1}</legend>

							<label for="{j.id}-date-{i}" class="form-control w-full max-w-xs">
								<span class="label-text mb-3">PhotoX Day - {i + 1}</span>
								<input
									name="{j.id}-date-{i}"
									id="{j.id}-date-{i}"
									type="datetime-local"
									bind:value={j.date}
									class="input input-sm rounded input-bordered w-full max-w-xs"
								/>
							</label>

							<div class="divider"></div>

							<section class="ml-8">
								<ol class="list-decimal">
									{#each j.events as e, index}
										<li class="pl-4 mb-4">
											<div class="flex gap-4 items-center">
												<label for="{j.id}-event-{index}" class="form-control w-full flex-1">
													<input
														type="text"
														name="{j.id}-label-{index}"
														id="{j.id}-event-{index}"
														bind:value={e.label}
														placeholder="Event Label"
														class="input input-sm input-bordered rounded w-full max-w-[300px]"
													/>
												</label>

												<label
													for="{j.id}-event-time-{index}"
													class="form-control w-full flex-row input-bordered rounded input input-sm flex-1"
												>
													<input
														name="{j.id}-event_startDate-{index}"
														type="datetime-local"
														bind:value={e.time[0]}
														class="w-full max-w-xs"
													/>
													<div class="divider divider-horizontal"></div>
													<input
														name="{j.id}-event_endDate-{index}"
														type="datetime-local"
														bind:value={e.time[1]}
														class="w-full max-w-xs"
													/>
												</label>

												<button
													type="button"
													class="btn btn-ghost rounded-sm btn-sm"
													on:click={() => removeNestedEvent(j.id, index)}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 448 512"
														class="w-4 fill-white"
													>
														<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
														<path
															d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
														/>
													</svg>
												</button>
											</div>
										</li>
									{/each}
								</ol>

								<div class="mt-4">
									<button
										type="button"
										class="btn btn-sm btn-outline rounded"
										on:click={() => addNestedEvent(j.id)}
									>
										+ Add Event
									</button>
								</div>
							</section>
						</fieldset>
					{/each}
				</section>

				<footer class="flex justify-between items-center">
					<button
						type="button"
						disabled={jsonData.length === maxDays ? true : false}
						class="btn btn-sm rounded"
						on:click={() => addPhotoXDay()}
					>
						+ Add Day
					</button>
					<button class="btn btn-sm btn-primary rounded">Generate JSON</button>
				</footer>
			</form>
		{:else}
			<div class="p-8 relative">
				<div
					class="tooltip absolute top-4 right-4 tooltip-primary"
					data-tip={!coppied ? 'Copy JSON' : 'Coppied'}
				>
					<button class="btn fill-base-content" on:click={copyClipboard}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w-4 h-4">
							<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
							<path
								d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
							/>
						</svg>
					</button>
				</div>
				<pre><code id="JSON_STRING">{jsonString}</code></pre>
			</div>
		{/if}
	</div>
</section>
