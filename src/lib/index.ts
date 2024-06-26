// place files you want to import through the `$lib` alias in this folder.
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultVal = browser ? localStorage.getItem('jsonToBeEdited') : '';

export const jsonToBeEdited = writable(defaultVal ? defaultVal : undefined);

jsonToBeEdited.subscribe((value) => {
	if (!browser) return;
	const storedValue = localStorage.getItem('jsonToBeEdited') as string;
	if (storedValue === 'undefined' || !storedValue) {
		localStorage.setItem('jsonToBeEdited', JSON.stringify(value));
		return;
	} else {
		localStorage.setItem('jsonToBeEdited', JSON.stringify(value));
	}
});
