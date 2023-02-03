import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "../../axios";
import { APP_ROUTE_POSTS, APP_ROUTE_TAGS } from "../../constants";
import { postsSorting, requestStatuses, singlePost } from "../reduxTypes";

interface InitialState {
	posts: {
		items: singlePost[];
		postsStatus: requestStatuses;
		sorting: postsSorting;
	};
	tags: {
		items: string[];
		tagsStatus: requestStatuses;
	};
}

const initialState: InitialState = {
	posts: {
		items: [],
		postsStatus: "loading",
		sorting: "new",
	},
	tags: {
		items: [],
		tagsStatus: "loading",
	},
};

export const fetchPosts = createAsyncThunk(
	"posts/fetchPosts",
	async (sortingType?: string) => {
		const { data } = await axios.get(
			`${APP_ROUTE_POSTS}?sorting=${sortingType}`
		);
		return data;
	}
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
	const { data } = await axios.get(APP_ROUTE_TAGS);
	return data;
});

export const fetchRemovePost = createAsyncThunk(
	"posts/fetchRemovePost",
	async (id: string) => {
		axios.delete(`${APP_ROUTE_POSTS}/${id}`);
	}
);

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
		});
		builder.addCase(
			fetchPosts.fulfilled,
			(state, action: PayloadAction<singlePost[]>) => {
				state.posts.items = action.payload;
				state.posts.postsStatus = "loaded";
			}
		);
		builder.addCase(fetchPosts.rejected, (state) => {
			state.posts.items = [];
			state.posts.postsStatus = "error";
		});
		builder.addCase(fetchTags.pending, (state) => {
			state.tags.items = [];
			state.tags.tagsStatus = "loading";
		});
		builder.addCase(
			fetchTags.fulfilled,
			(state, action: PayloadAction<string[]>) => {
				state.tags.items = action.payload;
				state.tags.tagsStatus = "loaded";
			}
		);
		builder.addCase(fetchTags.rejected, (state) => {
			state.tags.items = [];
			state.tags.tagsStatus = "error";
		});
		builder.addCase(fetchRemovePost.pending, (state, action) => {
			state.posts.items = state.posts.items.filter(
				(post) => post._id !== (action.meta.arg as unknown as string)
			);
		});
	},
});

export const postsReducer = postSlice.reducer;
export const { setPostSorting } = postSlice.actions;
