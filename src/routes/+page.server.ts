/** @type {import('./$types').Actions} */
export const actions = {
	formatJSON: async ({ request }) => {
		const data = await request.formData();
		try {
			console.log(data);
			return { ok: true, json: JSON.stringify(data) };
		} catch (error) {
			return { ok: false, error };
		}
	}
};
