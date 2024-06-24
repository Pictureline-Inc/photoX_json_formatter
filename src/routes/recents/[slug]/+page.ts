import type { PhotoXDay } from '$lib/.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const [photoXJSON] = JSON.parse(localStorage.getItem('photoXJSON') || '[]').filter(
		(item: PhotoXDay) => item.name === params.slug
	);

	if (photoXJSON) {
		return photoXJSON;
	}

	error(404, 'Not found');
}
