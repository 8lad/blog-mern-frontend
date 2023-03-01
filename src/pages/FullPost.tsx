import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

import { CommentsBlock } from "../components/CommentsBlock/CommentsBlock";
import { ErrorBlock } from "../components/ErrorBlock/ErrorBlock";
import { Post } from "../components/Post/Post";
import { PostSkeleton } from "../components/Post/Skeleton";
import { fetchSinglePost } from "../redux/slices/singlePost";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const FullPost = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const { singlePostStatus, post } = useAppSelector(
		(state) => state.singlePost
	);
	const { comments } = useAppSelector((state) => state.comments);
	const isLoading = singlePostStatus === "loading";
	const hasError = singlePostStatus === "error";
	const { errorMessage } = useAppSelector((state) => state.singlePost);

	useEffect(() => {
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
		</>
	);
};
