export type RequestStatuses = "loading" | "loaded" | "error";
export type PostsSorting = "new" | "popular";

interface ExtraResponseData {
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
}

export interface UserDataInterface extends ExtraResponseData {
	_id: string;
	fullName: string;
	email: string;
	avatarUrl: string;
}

export interface CommentData extends ExtraResponseData {
	user: {
		fullName: string;
		avatarUrl: string;
	};
	_id?: string;
	postId: string;
	text: string;
}

export interface SinglePost extends ExtraResponseData {
	_id: string;
	title: string;
	text: string;
	tags: string[];
	imageUrl: string;
	user: UserDataInterface;
	viewsCount: number;
}

export interface BaseSinglePost {
	text: string;
	title: string;
	tags: string[];
	imageUrl: string;
	_id: string;
}
