export type PhotoXDay = {
	id: number;
	name: string;
	date: string;
	events: {
		label: string;
		time: string[];
	}[];
};

export type PhotoXJSON = {
	name: string;
	data: PhotoXDay[];
};
