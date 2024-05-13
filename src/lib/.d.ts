export type PhotoXDay = {
	id: number;
	date: string;
	events: {
		label: string;
		time: string[];
	}[];
};

export type PhotoXJSON = PhotoXDay[];
