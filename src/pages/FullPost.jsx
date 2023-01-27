import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { Post } from "../components/Post";
import { fetchSinglePost } from "../redux/slices/singlePost";

import "react-toastify/dist/ReactToastify.css";

export const FullPost = () => {
	const { id } = useParams();
	const notify = () => toast("Loading post error");
	const dispatch = useDispatch();
	const { status, post } = useSelector(state => state.singlePost);
	const isLoading = status === "loading";
	const hasError = status === "error";

	useEffect(() => {
		if (hasError) return notify();
		if (id) dispatch(fetchSinglePost(id));
	}, [id]);

	if (isLoading) {
		return <Post isLoading={isLoading} isFullPost />;
	}

	return (
		<>
			<Post
				id={post._id}
				title={post.title}
				imageUrl={`${process.env.REACT_APP_API_URL}${post.imageUrl}`}
				user={post.user}
				createdAt={post.createdAt}
				viewsCount={post.viewsCount}
				commentsCount={3}
				tags={post.tags}
				isFullPost
			>
				<ReactMarkdown>{post.text}</ReactMarkdown>
			</Post>
			<CommentsBlock
				items={[
					{
						user: {
							fullName: "Вася Пупкин",
							avatarUrl:
								"https://mui.com/static/images/avatar/1.jpg",
						},
						text: "Это тестовый комментарий 555555",
					},
					{
						user: {
							fullName: "Иван Иванов",
							avatarUrl:
								"https://mui.com/static/images/avatar/2.jpg",
						},
						text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
					},
				]}
				isLoading={false}
			>
				<Index />
			</CommentsBlock>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</>
	);
};


// import React, { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";

// import axios from "../axios";
// import { Index } from "../components/AddComment";
// import { CommentsBlock } from "../components/CommentsBlock";
// import { Post } from "../components/Post";
// import { APP_ROUTE_POSTS } from "../constants";

// import "react-toastify/dist/ReactToastify.css";

// export const FullPost = () => {
// 	const { id } = useParams();
// 	const [data, setData] = useState();
// 	const [isLoading, setIsLoading] = useState(true);
// 	const notify = () => toast("Loading post error");

// 	useEffect(() => {
// 		axios
// 			.get(`${APP_ROUTE_POSTS}/${id}`)
// 			.then((res) => {
// 				setIsLoading(false);
// 				setData(res.data);
// 				console.log();
// 			})
// 			.catch((error) => {
// 				notify();
// 			});
// 	}, [id]);

// 	if (isLoading) {
// 		return <Post isLoading={isLoading} isFullPost />;
// 	}

// 	return (
// 		<>
// 			<Post
// 				id={data._id}
// 				title={data.title}
// 				imageUrl={`${process.env.REACT_APP_API_URL}${data.imageUrl}`}
// 				user={data.user}
// 				createdAt={data.createdAt}
// 				viewsCount={data.viewsCount}
// 				commentsCount={3}
// 				tags={data.tags}
// 				isFullPost
// 			>
// 				<ReactMarkdown>{data.text}</ReactMarkdown>
// 			</Post>
// 			<CommentsBlock
// 				items={[
// 					{
// 						user: {
// 							fullName: "Вася Пупкин",
// 							avatarUrl:
// 								"https://mui.com/static/images/avatar/1.jpg",
// 						},
// 						text: "Это тестовый комментарий 555555",
// 					},
// 					{
// 						user: {
// 							fullName: "Иван Иванов",
// 							avatarUrl:
// 								"https://mui.com/static/images/avatar/2.jpg",
// 						},
// 						text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
// 					},
// 				]}
// 				isLoading={false}
// 			>
// 				<Index />
// 			</CommentsBlock>
// 			<ToastContainer
// 				position="top-right"
// 				autoClose={5000}
// 				hideProgressBar={false}
// 				newestOnTop={false}
// 				closeOnClick
// 				rtl={false}
// 				pauseOnFocusLoss
// 				draggable
// 				pauseOnHover
// 				theme="dark"
// 			/>
// 		</>
// 	);
// };