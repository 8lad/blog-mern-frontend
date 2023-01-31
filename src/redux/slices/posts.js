import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../axios";
import { APP_ROUTE_POSTS, APP_ROUTE_TAGS } from "../../constants";

const initialState = {
	posts: {
		items: [],
		postsStatus: "loading",
		sorting: "new"
	},
	tags: {
		items: [],
		tagsStatus: "loading",
	},
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (sortingType) => {
	const { data } = await axios.get(`${APP_ROUTE_POSTS}?sorting=${sortingType}`);
	return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
	const { data } = await axios.get(APP_ROUTE_TAGS);
	return data;
});

export const fetchRemovePost = createAsyncThunk(
	"posts/fetchRemovePost",
	async (id) => {
		axios.delete(`${APP_ROUTE_POSTS}/${id}`);
	}
);

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		setPostSorting: (state, action) => {
			state.posts.sorting = action.payload;
		}
	},
	extraReducers: {
		[fetchPosts.pending]: (state) => {
			state.posts.items = [];
			state.posts.postsStatus = "loading";
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload;
			state.posts.postsStatus = "loaded";
		},
		[fetchPosts.rejected]: (state) => {
			state.posts.items = [];
			state.posts.postsStatus = "error";
		},

		[fetchTags.pending]: (state) => {
			state.tags.items = [];
			state.tags.tagsStatus = "loading";
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.items = action.payload;
			state.tags.tagsStatus = "loaded";
		},
		[fetchTags.rejected]: (state) => {
			state.tags.items = [];
			state.tags.tagsStatus = "error";
		},
		[fetchRemovePost.pending]: (state, action) => {
			state.posts.items = state.posts.items.filter(
				(post) => post._id !== action.meta.arg
			);
		},
	},
});

export const postsReducer = postSlice.reducer;
export const { setPostSorting } = postSlice.actions;
