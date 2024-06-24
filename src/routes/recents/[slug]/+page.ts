import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	if (!browser) return;

	const [photoXJSON] = JSON.parse(localStorage.getItem('photoXJSON') || '[]').filter(
		(item) => item.name === params.slug
	);

	console.log(photoXJSON);

	if (photoXJSON) {
		return photoXJSON;
	}

	error(404, 'Not found');
}
