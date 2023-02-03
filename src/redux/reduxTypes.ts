export type requestStatuses = "loading" | "loaded" | "error";
export type postsSorting = "new" | "popular";

interface extraResponseData {
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
}

export interface userDataInterface extends extraResponseData {
	_id: string;
	fullName: string;
	email: string;
	avatarUrl: string;
}

export interface commentData extends extraResponseData {
	user: {
		fullName: string;
		avatarUrl: string;
	};
	_id?: string;
	postId: string;
	text: string;
}

export interface singlePost extends extraResponseData {
	_id: string;
	title: string;
	text: string;
	tags: string[];
	imageUrl: string;
	user: userDataInterface;
	viewsCount: number;
}

export interface baseSinglePost {
	text: string;
	title: string;
	tags: string[];
	imageUrl: string;
	_id: string;
}
