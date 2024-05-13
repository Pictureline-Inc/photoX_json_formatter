export type PhotoXDay = {
	id: string;
	date: string;
	events: {
		label: string;
		time: string[];
	}[];
};

export type PhotoXJSON = PhotoXDay[];
