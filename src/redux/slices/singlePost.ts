import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "../../axios";
import { APP_ROUTE_POSTS, APP_ROUTE_UPLOAD } from "../../constants";
import { baseSinglePost, requestStatuses, singlePost } from "../reduxTypes";
import { RootState } from "../store";

interface InitialState {
	singlePostStatus: requestStatuses;
	post: singlePost;
}

const initialState: InitialState = {
	singlePostStatus: "loading",
	post: {
		_id: "",
		title: "",
		text: "",
		tags: [],
		viewsCount: 0,
		imageUrl: "",
		user: {
			email: "",
			avatarUrl: "",
			_id: "",
			fullName: "",
		},
		createdAt: "",
		updatedAt: "",
		__v: 0,
	},
};

export const fetchSinglePost = createAsyncThunk(
	"singlePost/fetchSinglePost",
	async (id: string) => {
		const { data } = await axios.get(`${APP_ROUTE_POSTS}/${id}`);
		return data;
	}
);

export const fetchSinglePostData = createAsyncThunk(
	"singlePost/fetchSinglePostData",
	async (postData: baseSinglePost) => {
		const { data } = postData._id
			? await axios.patch(`${APP_ROUTE_POSTS}/${postData._id}`, postData)
			: await axios.post(APP_ROUTE_POSTS, postData);
		return data;
	}
);

export const fetchImageUrl = createAsyncThunk(
	"singlePost/fetchImageUrl",
	async (formData: FormData) => {
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
	extraReducers: (builder) => {
		builder.addCase(fetchSinglePost.pending, (state) => {
			state.post = { ...initialState.post };
			state.singlePostStatus = "loading";
		});
		builder.addCase(
			fetchSinglePost.fulfilled,
			(state, action: PayloadAction<singlePost>) => {
				state.post = action.payload;
				state.singlePostStatus = "loaded";
			}
		);
		builder.addCase(fetchSinglePost.rejected, (state) => {
			state.post = { ...initialState.post };
			state.singlePostStatus = "error";
		});
		builder.addCase(fetchSinglePostData.pending, (state) => {
			state.post = { ...initialState.post };
			state.singlePostStatus = "loading";
		});
		builder.addCase(fetchSinglePostData.fulfilled, (state) => {
			state.singlePostStatus = "loaded";
		});
		builder.addCase(fetchSinglePostData.rejected, (state) => {
			state.post = { ...initialState.post };
			state.singlePostStatus = "error";
		});
		builder.addCase(fetchImageUrl.pending, (state) => {
			state.post.imageUrl = "";
			state.singlePostStatus = "loading";
		});
		builder.addCase(fetchImageUrl.fulfilled, (state, action) => {
			state.post.imageUrl = action.payload;
			state.singlePostStatus = "loaded";
		});
		builder.addCase(fetchImageUrl.rejected, (state) => {
			state.post.imageUrl = "";
			state.singlePostStatus = "error";
		});
	},
});

export const isReadyToSend = ({
	singlePost: {
		post: { text, title, tags },
	},
}: RootState) => Boolean(text && title && tags.length);
export const singlePostReducer = singlePost.reducer;
export const { setText, setTitle, setTags, removeImageUrl, removeSinglePost } =
	singlePost.actions;
