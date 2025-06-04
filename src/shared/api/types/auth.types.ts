export interface IAuthForm {
	email: string
	password: string
};

export interface IUser {
	id: number
	name?: string
	email: string

	role: 'USER' | 'ADMIN';
};

export interface IAuthResponse {
	accessToken: string
	user: IUser
};

export interface IProfileResponse {
	user: IUser;
	statistics: {
	  label: string;
	  value: string;
	}[];
};

export type TypeUserForm = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'> & {
	password: string;
};