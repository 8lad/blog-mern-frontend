import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { ErrorBlock } from "../components/ErrorBlock/ErrorBlock";
import { Post } from "../components/Post";
import { PostSkeleton } from "../components/Post/Skeleton";
import { TagsBlock } from "../components/TagsBlock";
import { fetchPosts } from "../redux/slices/posts";
import { fetchTags } from "../redux/slices/posts";
import { RootState, useAppDispatch } from "../redux/store";
import { getImageUrl } from "../utils/getImageUrl";

export const TagSortedPostsPage = () => {
	const dispatch = useAppDispatch();
	const { posts, tags } = useSelector((state: RootState) => state.posts);
	const { comments } = useSelector((state: RootState) => state.comments);
	const { tag } = useParams();
	const currentPageTag = tag ? tag.toUpperCase() : "No tag title";
	const isPostsLoading = posts.postsStatus === "loading";
	const isTagsLoading = tags.tagsStatus === "loading";
	const currentTagPosts = posts.items.filter(({ tags }) =>
		tags.some((item) => item === tag)
	);
	const userData = useSelector((state: RootState) => state.auth.data);
	const { errorMessage } = useSelector(
		(state: RootState) => state.posts.posts
	);

	useEffect(() => {
		dispatch(fetchPosts());
		dispatch(fetchTags());
	}, [dispatch]);

	if (errorMessage) {
		return <ErrorBlock title={errorMessage} />;
	}

	return (
		<>
			<Typography
				variant="h3"
				component="h4"
				sx={{
					padding: "10px 20px 30px 15px",
				}}
			>
				#{currentPageTag}
			</Typography>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{(isPostsLoading ? [...Array(5)] : currentTagPosts).map(
						(obj, index) =>
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
				<Grid xs={4} item>
					<TagsBlock items={tags.items} isLoading={isTagsLoading} />
				</Grid>
			</Grid>
		</>
	);
};
