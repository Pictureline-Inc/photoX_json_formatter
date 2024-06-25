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
		<hgroup class="p-2 border-b-[1px] mb-2 border-primary">JSON Formatter</hgroup>

		<ul class="menu menu-vertical">
			<li>
				<a href="/" class:bg-black={currentRoute === '/'} class="hover:cursor-pointer">
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 448 512"
							width="16"
							class="fill-primary"
						>
							<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
							<path
								d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
							/>
						</svg>
					</span>
					Create
				</a>
			</li>
			<li>
				<a
					href="/recents"
					class:bg-black={currentRoute === '/recents'}
					class="hover:cursor-pointer"
				>
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 576 512"
							width="16"
							class="fill-primary"
							><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
								d="M384 480h48c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224H144c-11.4 0-21.9 6-27.6 15.9L48 357.1V96c0-8.8 7.2-16 16-16H181.5c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8H416c8.8 0 16 7.2 16 16v32h48V160c0-35.3-28.7-64-64-64H298.5c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H87.7 384z"
							/></svg
						>
					</span>
					Recent
				</a>
			</li>
			<li>
				<a href="/upload" class:bg-black={currentRoute === '/upload'} class="hover:cursor-pointer">
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							width="16"
							class="fill-primary"
						>
							<!-- <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
							<path
								d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
							/></svg
						>
					</span>
					Upload
				</a>
			</li>
		</ul>
	</div>
</div>

<!-- Slot -->
<main class="p-8 w-full">
	<slot />
</main>
