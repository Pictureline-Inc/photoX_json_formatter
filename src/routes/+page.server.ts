/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
	formatJSON: async ({ cookies, request }) => {
		console.log('Format JSON');

		return { success: true };
	}
};
