<script lang="ts">
	import '../app.css';
</script>

<div class="navbar bg-base-100 max-w-[1400px] mx-auto">
	<div class="flex-1">
		<a href="https://www.pictureline.com" class="btn btn-ghost text-2xl" target="_blank">
			<img src="/pline-logo.svg" alt="Pictureline Wordmark" />
		</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li>
				<a href="/">Create JSON</a>
			</li>
			<li>
				<details>
					<summary> Tools </summary>
					<ul class="p-2 bg-base-100 rounded-t-none">
						<li>
							<a href="/upload-json">Upload JSON</a>
						</li>
						<li>
							<a href="/recents">Recent JSON</a>
						</li>
					</ul>
				</details>
			</li>
		</ul>
	</div>
</div>

<!-- Slot -->
<main class="max-w-7xl mx-auto px-8 2xl:px-0 pt-4">
	<slot />
</main>
