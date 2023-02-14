import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";

import { CommentsBlock } from "../components/CommentsBlock";
import { CustomTabs } from "../components/CustomTabs/CustomTabs";
import { ErrorBlock } from "../components/ErrorBlock/ErrorBlock";
import { ExtraInfo } from "../components/ExtraInfo/ExtraInfo";
import { Post } from "../components/Post/Post";
import { PostSkeleton } from "../components/Post/Skeleton";
import { TagsBlock } from "../components/TagsBlock";
import { useScreenSize } from "../hooks/useScreenSize";
import { fetchComments } from "../redux/slices/comments";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { RootState, useAppDispatch } from "../redux/store";
import { getImageUrl } from "../utils/getImageUrl";

export const Home = () => {
	const dispatch = useAppDispatch();
	const { posts, tags } = useSelector((state: RootState) => state.posts);
	const userData = useSelector((state: RootState) => state.auth.data);
	const { comments } = useSelector((state: RootState) => state.comments);
	const { sorting } = posts;
	const isPostsLoading = posts.postsStatus === "loading";
	const isTagsLoading = tags.tagsStatus === "loading";
	const { errorMessage } = useSelector(
		(state: RootState) => state.posts.posts
	);
	const { screenWidth } = useScreenSize();
	const isBigScreen = screenWidth && screenWidth >= 900;

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
