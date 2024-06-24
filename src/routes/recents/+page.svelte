<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	$: recents = [] as any[];
	$: console.log(recents);

	onMount(() => {
		recents = JSON.parse(localStorage.getItem('photoXJSON') || '[]');
	});
</script>

<section>
	<hgroup class="mb-4">
		<h1 class="text-2xl font-medium">Recently Created Schedules</h1>
	</hgroup>

	<div class="overflow-x-auto max-w-[1000px]">
		{#if recents.length > 0}
			<table class="table bg-neutral rounded-lg">
				<!-- head -->
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Days</th>
						<th>Starts</th>
					</tr>
				</thead>
				<tbody>
					{#each recents as data, i}
						<tr
							on:click={async () => {
								await goto(`/recents/${data.name}`);
							}}
							class="hover:cursor-pointer hover:bg-base-200 transition-colors duration-200 ease-in-out"
						>
							<th>{i}</th>
							<td>{data.name}</td>
							<td>{data.data.length}</td>
							<td>
								{new Intl.DateTimeFormat(navigator.language, {
									year: 'numeric',
									month: 'short',
									day: 'numeric'
								}).format(new Date(data.data[0].date))}
							</td>
						</tr>
					{/each}
					<!-- row 1
					<tr>
						<th>1</th>
						<td>Cy Ganderton</td>
						<td>Quality Control Specialist</td>
						<td>Blue</td>
					</tr> -->
				</tbody>
			</table>
		{:else}
			<p>No recent schedules found.</p>
		{/if}
	</div>
</section>
