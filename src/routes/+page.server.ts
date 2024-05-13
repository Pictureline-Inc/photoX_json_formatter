/** @type {import('./$types').Actions} */
export const actions = {
	formatJSON: async ({ request }) => {
		const data = await request.formData();

		const res = structureFD(data);

		return { success: true };
	}
};

function structureFD(data: FormData) {
	const arr: unknown = [];
	const tree: {
		[key: string]: unknown;
	} = {};

	for (const [k, v] of data.entries()) {
		const [id, label, index] = k.split('-');
		console.log(id, label, index);

		// Check if the day exists in the array
		if (!tree[`Day-${id}`]) {
			tree[`Day-${id}`] = {};
		}

		// Add date to the day object
		if (label === 'date') {
			tree[`Day-${id}`]['date'] = v;
		}

		// Add events to the day object
	}

	console.log(tree);
	console.log(arr);
	return arr;
}
