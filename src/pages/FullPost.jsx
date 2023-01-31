import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { CommentsBlock } from "../components/CommentsBlock";
import { Post } from "../components/Post";
import { fetchSinglePost } from "../redux/slices/singlePost";

import "react-toastify/dist/ReactToastify.css";

export const FullPost = () => {
	const { id } = useParams();
	const notify = () => toast("Loading post error");
	const dispatch = useDispatch();
	const { singlePostStatus, post } = useSelector(state => state.singlePost);
	const { comments } = useSelector((state) => state.comments);
	const isLoading = singlePostStatus === "loading";
	const hasError = singlePostStatus === "error";

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
				imageUrl={`${import.meta.env.VITE_API_URL}${post.imageUrl}`}
				user={post.user}
				createdAt={post.createdAt}
				viewsCount={post.viewsCount}
				commentsCount={comments.filter(comment => comment.postId === post._id).length}
				tags={post.tags}
				isFullPost
			>
				<ReactMarkdown>{post.text}</ReactMarkdown>
			</Post>
			<CommentsBlock postId={id} />
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
