export type PhotoXDay = {
	id: number;
	date: string | Date | number;
	events: {
		label: string;
		time: any[];
		photowalk: boolean;
	}[];
};

export type PhotoXJSON = {
	id: string;
	name: string;
	data: PhotoXDay[];
};
