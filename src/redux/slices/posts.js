import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { APP_ROUTE_POSTS, APP_ROUTE_TAGS } from "../../constants";

const initialState = {
	posts: {
		items: [],
		status: "loading"
	},
	tags: {
		items: [],
		status: "loading"
	}
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const { data } = await axios.get(APP_ROUTE_POSTS);
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
	reducers: {},
	extraReducers: {
		[fetchPosts.pending]: (state) => {
			state.posts.items = [];
			state.posts.status = "loading";
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload;
			state.posts.status = "loaded";
		},
		[fetchPosts.rejected]: (state) => {
			state.posts.items = [];
			state.posts.status = "error";
		},

		[fetchTags.pending]: (state) => {
			state.tags.items = [];
			state.tags.status = "loading";
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.status = "loaded";
			state.tags.items = action.payload;
		},
		[fetchTags.rejected]: (state) => {
			state.tags.status = "error";
			state.tags.items = [];
		},
		[fetchRemovePost.pending]: (state, action) => {
			state.posts.items = state.posts.items.filter(
				(post) => post._id !== action.meta.arg
			);
		}
	}
});

export const postsReducer = postSlice.reducer;
