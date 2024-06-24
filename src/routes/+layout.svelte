<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	$: currentRoute = $page.route.id;
</script>

<div class="bg-base-200 h-screen min-w-56 p-2">
	<div>
		<a href="https://www.pictureline.com" class="btn btn-ghost text-2xl" target="_blank">
			<img src="/pline-logo.svg" alt="Pictureline Wordmark" />
		</a>
	</div>

	<div class="flex-none">
		<ul class="menu menu-vertical">
			<li>
				<a href="/" class:bg-black={currentRoute === '/'}>Create JSON</a>
			</li>
			<li>
				<a href="/recents" class:bg-black={currentRoute === 'recents'}>Recent JSON</a>
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
