import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";

import { CommentsBlock } from "../components/CommentsBlock/CommentsBlock";
import { CustomTabs } from "../components/CustomTabs/CustomTabs";
import { ErrorBlock } from "../components/ErrorBlock/ErrorBlock";
import { ExtraInfo } from "../components/ExtraInfo/ExtraInfo";
import { Post } from "../components/Post/Post";
import { PostSkeleton } from "../components/Post/Skeleton";
import { TagsBlock } from "../components/TagsBlock/TagsBlock";
import { MIDDLE_SCREEN_SIZE } from "../constants/baseValues";
import { useScreenSize } from "../hooks/useScreenSize";
import { fetchComments } from "../redux/slices/comments";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getImageUrl } from "../utils/getImageUrl";

export const Home = () => {
	const dispatch = useAppDispatch();
	const { posts, tags } = useAppSelector((state) => state.posts);
	const userData = useAppSelector((state) => state.auth.data);
	const { comments } = useAppSelector((state) => state.comments);
	const { sorting } = posts;
	const isPostsLoading = posts.postsStatus === "loading";
	const isTagsLoading = tags.tagsStatus === "loading";
	const { errorMessage } = useAppSelector((state) => state.posts.posts);
	const { screenWidth } = useScreenSize();
	const isBigScreen = screenWidth && screenWidth >= MIDDLE_SCREEN_SIZE;
	const hasNoPosts = Boolean(!posts.items.length) && !isPostsLoading;

	useEffect(() => {
		dispatch(fetchPosts(sorting));
		dispatch(fetchTags());
		dispatch(fetchComments());
	}, [dispatch, sorting]);

	if (errorMessage) {
		return <ErrorBlock title={errorMessage} />;
	}

	return (
		<>
			<CustomTabs />
			{!isBigScreen && (
				<ExtraInfo
					tags={
						<TagsBlock
							items={tags.items}
							isLoading={isTagsLoading}
						/>
					}
					comments={<CommentsBlock />}
				/>
			)}
			<Grid container spacing={4}>
				<Grid xs={12} md={8} item>
					{hasNoPosts && (
						<h2>
							There are not any posts here 😞. Try again later, or
							sign in and create your own 😃!
						</h2>
					)}
					{(isPostsLoading ? [...Array(5)] : posts.items).map(
						(obj, index: number) =>
							isPostsLoading ? (
								<PostSkeleton key={index} />
							) : (
								<Post
									key={obj._id}
									id={obj._id}
									title={obj.title}
									imageUrl={getImageUrl(obj.imageUrl)}
									user={obj.user}
									createdAt={obj.createdAt}
									viewsCount={obj.viewsCount}
									commentsCount={
										comments.filter(
											(comment) =>
												comment.postId === obj._id
										).length
									}
									tags={obj.tags}
									isEditable={userData?._id === obj.user._id}
									isLoading={isPostsLoading}
								/>
							)
					)}
				</Grid>
				{isBigScreen && (
					<Grid xs={4} item>
						<TagsBlock
							items={tags.items}
							isLoading={isTagsLoading}
						/>
						<CommentsBlock />
					</Grid>
				)}
			</Grid>
		</>
	);
};
