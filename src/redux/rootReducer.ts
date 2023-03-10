import { combineReducers } from "redux";

import { authReducer } from "./slices/auth";
import { commentsReducer } from "./slices/comments";
import { errorReducer } from "./slices/errors";
import { postsReducer } from "./slices/posts";
import { singlePostReducer } from "./slices/singlePost";

export const rootReducer = combineReducers({
	posts: postsReducer,
	auth: authReducer,
	comments: commentsReducer,
	singlePost: singlePostReducer,
	errors: errorReducer,
});
