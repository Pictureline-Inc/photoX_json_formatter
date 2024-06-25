<script lang="ts">
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
			JSON.parse(jsonSTR);
		} catch (error) {
			errorMessage = 'Invalid JSON';
			jsonPresent = false;
		}
	} else {
		errorMessage = '';
	}

	function handleJSONParse() {
		console.log('Parsing JSON');
		console.log(jsonFile, jsonSTR);
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
						bind:value={jsonFile}
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

<!-- 
{
  "name": "Test",
  "data": [
    {
      "id": 0,
      "date": "2024-06-25T17:45:00.000Z",
      "events": [
        {
          "label": "test",
          "time": [
            "2024-06-25T12:45:00.000Z",
            "2024-06-25T12:45:00.000Z"
          ],
          "photowalk": false
        },
        {
          "label": "teata",
          "time": [
            "2024-06-25T13:45:00.000Z",
            "2024-06-25T13:45:00.000Z"
          ],
          "photowalk": true
        }
      ]
    }
  ]
}
-->
