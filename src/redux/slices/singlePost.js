import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../axios";
import { APP_ROUTE_POSTS, APP_ROUTE_UPLOAD } from "../../constants";

const initialState = {
	singlePostStatus: "loading",
	post: {
		_id: "",
		title: "",
		text: "",
		tags: [],
		viewsCount: 0,
		imageUrl: "",
		user: {},
		createdAt: "",
		updatedAt: "",
		__v: 0
	}
};

export const fetchSinglePost = createAsyncThunk(
	"singlePost/fetchSinglePost",
	async (id) => {
		const { data } = await axios.get(`${APP_ROUTE_POSTS}/${id}`);
		return data;
	}
);

export const fetchSinglePostData = createAsyncThunk(
	"singlePost/fetchSinglePostData",
	async (postData) => {
		const { data } = postData._id
			? await axios.patch(`${APP_ROUTE_POSTS}/${postData._id}`, postData)
			: await axios.post(APP_ROUTE_POSTS, postData);
		return data;
	}
);

export const fetchImageUrl = createAsyncThunk(
	"singlePost/fetchImageUrl",
	async (formData) => {
		const { data } = await axios.post(APP_ROUTE_UPLOAD, formData);
		return data.url;
	}
);

const singlePost = createSlice({
	name: "singlePost",
	initialState,
	reducers: {
		setText: (state, action) => {
			state.post.text = action.payload;
			state.singlePostStatus = "loaded";
		},
		setTitle: (state, action) => {
			state.post.title = action.payload;
			state.singlePostStatus = "loaded";
		},
		setTags: (state, action) => {
			state.post.tags = action.payload;
			state.singlePostStatus = "loaded";
		},
		removeImageUrl: (state) => {
			state.post.imageUrl = "";
			state.singlePostStatus = "loaded";
		},
		removeSinglePost: (state) => {
			state.post = { ...initialState.post };
			state.singlePostStatus = "loaded";
		},
	},
	extraReducers: {
		[fetchSinglePost.pending]: (state) => {
			state.post = { ...initialState.post };
			state.singlePostStatus = "loading";
		},
		[fetchSinglePost.fulfilled]: (state, action) => {
			state.post = action.payload;
			state.singlePostStatus = "loaded";
		},
		[fetchSinglePost.rejected]: (state) => {
			state.post = { ...initialState.post };
			state.singlePostStatus = "error";
		},
		[fetchSinglePostData.pending]: (state) => {
			state.post = { ...initialState.post };
			state.singlePostStatus = "loading";
		},
		[fetchSinglePostData.fulfilled]: (state) => {
			state.singlePostStatus = "loaded";
		},
		[fetchSinglePostData.rejected]: (state) => {
			state.post = { ...initialState.post };
			state.singlePostStatus = "error";
		},
		[fetchImageUrl.pending]: (state) => {
			state.post.imageUrl = "";
			state.singlePostStatus = "loading";
		},
		[fetchImageUrl.fulfilled]: (state, action) => {
			state.post.imageUrl = action.payload;
			state.singlePostStatus = "loaded";
		},
		[fetchImageUrl.rejected]: (state) => {
			state.post.imageUrl = "";
			state.singlePostStatus = "error";
		},
	},
});

export const isReadyToSend = ({
	singlePost: {
		post: { text, title, tags },
	},
}) => Boolean(text && title && tags.length);
export const singlePostReducer = singlePost.reducer;
export const { setText, setTitle, setTags, removeImageUrl, removeSinglePost } =
	singlePost.actions;
