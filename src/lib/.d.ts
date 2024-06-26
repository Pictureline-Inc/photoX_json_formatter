export type PhotoXDay = {
	id: number;
	date: string | Date;
	events: {
		label: string;
		time: string[];
		photowalk: boolean;
	}[];
};

export type PhotoXJSON = {
	id: string;
	name: string;
	data: PhotoXDay[];
};
