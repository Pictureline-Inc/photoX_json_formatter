<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	$: recents = [] as any[];

	onMount(() => {
		recents = JSON.parse(localStorage.getItem('photoXJSON') || '[]');
	});
</script>

<section class="max-w-[1000px]">
	<hgroup class="mb-4 flex justify-between items-center">
		<h1 class="text-2xl font-medium">Recently Created Schedules</h1>
		<button
			class="btn btn-neutral"
			disabled={recents.length === 0}
			on:click={() => {
				localStorage.removeItem('photoXJSON');
				recents = [];
			}}
		>
			Clear
		</button>
	</hgroup>

	<div class="overflow-x-auto">
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
							<td>
								{data.name}
							</td>
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
				</tbody>
			</table>
		{:else}
			<p>No recent schedules found.</p>
		{/if}
	</div>
</section>
