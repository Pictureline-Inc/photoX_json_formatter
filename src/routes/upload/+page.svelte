<script lang="ts">
	import { goto } from '$app/navigation';
	import { jsonToBeEdited } from '$lib';

	$: jsonPresent = false; // State managment for UI
	$: jsonSTR = '';
	$: jsonFile = undefined;
	$: errorMessage = '';

	$: if (jsonFile || jsonSTR) {
		jsonPresent = true;
	} else {
		jsonPresent = false;
	}

	$: if (jsonSTR) {
		try {
			if (jsonSTR) JSON.parse(jsonSTR);
		} catch (error) {
			errorMessage = 'Invalid JSON';
			jsonPresent = false;
		}
	} else {
		errorMessage = '';
	}

	async function handleJSONParse() {
		if (jsonSTR) {
			const json = JSON.parse(jsonSTR);
			$jsonToBeEdited = json;
		}

		if (jsonFile) {
			const file = jsonFile[0];
			const reader = new FileReader();
			reader.onload = (e: any) => {
				const json = JSON.parse(e.target.result);
				$jsonToBeEdited = json;
			};
			reader.readAsText(file);
		}

		await goto('/?uploadJSON=true');
	}
</script>

<section>
	<hgroup class="mb-8">
		<h1 class="text-xl font-bold">Upload JSON To Edit</h1>
	</hgroup>

	<div class="flex flex-col">
		<section class="flex">
			<div class="card bg-neutral p-4 flex-1">
				<label for="jsonString" class="w-full">
					<span class="sr-only">JSON String</span>
					<textarea
						class="textarea textarea-primary resize-none w-full overflow-auto"
						placeholder="Paste JSON text here..."
						rows="20"
						name="jsonString"
						id="jsonString"
						disabled={jsonFile}
						on:change={() => {
							jsonFile = undefined;
						}}
						bind:value={jsonSTR}
					></textarea>
				</label>
			</div>
			<div class="divider divider-horizontal">OR</div>
			<div class="card bg-neutral p-4 flex-1 h-fit">
				<label for="jsonFile">
					<span class="sr-only">JSON File</span>
					<input
						name="jsonFile"
						id="jsonFile"
						type="file"
						class="file-input file-input-bordered file-input-primary w-full h-20"
						accept=".json"
						multiple={false}
						disabled={jsonSTR ? true : false}
						on:change={() => {
							jsonSTR = '';
						}}
						bind:files={jsonFile}
					/>
				</label>
			</div>
		</section>

		<footer class="mt-8 flex justify-between items-center">
			<aside>
				{#if errorMessage}
					<span class="font-medium text-error">
						{errorMessage}
					</span>
				{/if}
			</aside>
			<aside>
				<button class="btn btn-link">Cancel</button>
				<button class="btn btn-primary" on:click={handleJSONParse} disabled={!jsonPresent}>
					Start Editing
				</button>
			</aside>
		</footer>
	</div>
</section>
