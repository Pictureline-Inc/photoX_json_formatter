/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
	formatJSON: async ({ request }) => {
		const data = await request.formData();
		const body = Object.fromEntries(data);

		console.log(body);

		return { success: true };
	}
};
