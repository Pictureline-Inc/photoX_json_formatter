// place files you want to import through the `$lib` alias in this folder.
import { writable } from 'svelte/store';
import type { PhotoXJSON } from './.d.ts';

export const jsonToBeEdited = writable<PhotoXJSON>();
