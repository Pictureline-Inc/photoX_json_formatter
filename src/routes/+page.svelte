<script lang="ts">
	import type { PhotoXDay, PhotoXJSON } from '$lib/.d.ts';
	import { json } from '@sveltejs/kit';

	export let form;
	const maxDays = 2;
	const photoXDay: PhotoXDay = {
		id: 0,
		date: '',
		events: [{ label: '', time: [] }]
	};

	$: jsonData = [photoXDay] as PhotoXJSON;

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
</script>

<section>
	<div class="bg-neutral rounded-lg overflow-hidden max-w-4xl mx-auto">
		<hgroup class="px-8 mb-4 flex justify-between items-center bg-base-300 py-4">
			<h1 class="text-2xl font-medium">PhotoX JSON Formatter</h1>

			<button type="button" class="btn btn-sm rounded" on:click={() => addPhotoXDay()}>
				+ Add Day
			</button>
		</hgroup>

		<form id="JSON_Formatter" method="POST" action="?/formatJSON" class="pb-4 px-8">
			<section id="form_fields" class="mb-4">
				{#each jsonData as j, i}
					<fieldset
						id="day-{j.id}"
						class="bg-base-200 p-4 rounded outline outline-primary/30 shadow-md mb-4"
					>
						<legend class="sr-only">Day {i + 1}</legend>

						<label for="{j.id}-date-{i}" class="form-control w-full max-w-xs">
							<span class="label-text mb-3">PhotoX Day - {i + 1}</span>
							<input
								name="{j.id}-date-{i}"
								id="{j.id}-date-{i}"
								type="datetime-local"
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
													class="w-full max-w-xs"
												/>
												<div class="divider divider-horizontal"></div>
												<input
													name="{j.id}-event_endDate-{index}"
													type="datetime-local"
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

			<footer class="flex justify-end">
				<button class="btn btn-md btn-primary rounded">Generate JSON</button>
			</footer>
		</form>
	</div>
</section>
