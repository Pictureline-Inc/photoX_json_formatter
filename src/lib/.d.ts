export type PhotoXDay = {
	id: number;
	date: string;
	events: {
		label: string;
		time: string[];
		photowalk: boolean;
	}[];
};

export type PhotoXJSON = {
	name: string;
	data: PhotoXDay[];
};

