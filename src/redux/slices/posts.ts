import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "../../axios";
import { APP_ROUTE_POSTS, APP_ROUTE_TAGS } from "../../constants/routes";
import { PostsSorting, RequestStatuses, SinglePost } from "../reduxTypes";

interface InitialState {
	posts: {
		items: SinglePost[];
		postsStatus: RequestStatuses;
		sorting: PostsSorting;
		errorMessage: string;
	};
	tags: {
		items: string[];
		tagsStatus: RequestStatuses;
		errorMessage: string;
	};
}

const initialState: InitialState = {
	posts: {
		items: [],
		postsStatus: "loading",
		sorting: "new",
		errorMessage: "",
	},
	tags: {
		items: [],
		tagsStatus: "loading",
		errorMessage: "",
	},
};

export const fetchPosts = createAsyncThunk<
	SinglePost[],
	string | void,
	{ rejectValue: string }
>("posts/fetchPosts", async (sortingType, thunkApi) => {
	try {
		const { data } = await axios.get(
			`${APP_ROUTE_POSTS}?sorting=${sortingType}`
		);
		return data;
	} catch (error) {
		return thunkApi.rejectWithValue((error as Error).message);
	}
});

export const fetchTags = createAsyncThunk<
	string[],
	void,
	{ rejectValue: string }
>("posts/fetchTags", async (_, thunkApi) => {
	try {
		const { data } = await axios.get(APP_ROUTE_TAGS);
		return data;
	} catch (error) {
		return thunkApi.rejectWithValue((error as Error).message);
	}
});

export const fetchRemovePost = createAsyncThunk<
	void,
	string,
	{ rejectValue: string }
>("posts/fetchRemovePost", async (id: string, thunkApi) => {
	try {
		axios.delete(`${APP_ROUTE_POSTS}/${id}`);
	} catch (error) {
		return thunkApi.rejectWithValue((error as Error).message);
	}
});

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		setPostSorting: (state, action) => {
			state.posts.sorting = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPosts.pending, (state) => {
			state.posts.items = [];
			state.posts.postsStatus = "loading";
			state.posts.errorMessage = "";
		});
		builder.addCase(
			fetchPosts.fulfilled,
			(state, action: PayloadAction<SinglePost[]>) => {
				state.posts.items = action.payload;
				state.posts.postsStatus = "loaded";
				state.posts.errorMessage = "";
			}
		);
		builder.addCase(
			fetchPosts.rejected,
			(state, action: PayloadAction<unknown>) => {
				state.posts.items = [];
				state.posts.postsStatus = "error";
				state.posts.errorMessage = action.payload as string;
			}
		);
		builder.addCase(fetchTags.pending, (state) => {
			state.tags.items = [];
			state.tags.tagsStatus = "loading";
			state.tags.errorMessage = "";
		});
		builder.addCase(
			fetchTags.fulfilled,
			(state, action: PayloadAction<string[]>) => {
				state.tags.items = action.payload;
				state.tags.tagsStatus = "loaded";
				state.tags.errorMessage = "";
			}
		);
		builder.addCase(
			fetchTags.rejected,
			(state, action: PayloadAction<unknown>) => {
				state.tags.items = [];
				state.tags.tagsStatus = "error";
				state.tags.errorMessage = action.payload as string;
			}
		);
		builder.addCase(fetchRemovePost.pending, (state, action) => {
			state.posts.items = state.posts.items.filter(
				(post) => post._id !== (action.meta.arg as unknown as string)
			);
		});
	},
});

export const postsReducer = postSlice.reducer;
export const { setPostSorting } = postSlice.actions;
