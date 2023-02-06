import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { CommentsBlock } from "../components/CommentsBlock";
import { ErrorBlock } from "../components/ErrorBlock/ErrorBlock";
import { Post } from "../components/Post";
import { PostSkeleton } from "../components/Post/Skeleton";
import { fetchSinglePost } from "../redux/slices/singlePost";
import { RootState, useAppDispatch } from "../redux/store";

import "react-toastify/dist/ReactToastify.css";

export const FullPost = () => {
	const { id } = useParams();
	const notify = () => toast("Loading post error");
	const dispatch = useAppDispatch();
	const { singlePostStatus, post } = useSelector(
		(state: RootState) => state.singlePost
	);
	const { comments } = useSelector((state: RootState) => state.comments);
	const isLoading = singlePostStatus === "loading";
	const hasError = singlePostStatus === "error";
	const { errorMessage } = useSelector(
		(state: RootState) => state.singlePost
	);

	useEffect(() => {
		hasError && notify();
		if (id && !hasError) {
			dispatch(fetchSinglePost(id));
		}
	}, [id]);

	if (errorMessage) {
		return <ErrorBlock title={errorMessage} />;
	}

	if (isLoading) {
		return <PostSkeleton />;
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
				commentsCount={
					comments.filter((comment) => comment.postId === post._id)
						.length
				}
				tags={post.tags}
				isFullPost
				isLoading={isLoading}
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
