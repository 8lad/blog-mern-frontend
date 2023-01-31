import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import NoImage from "../assets/no-image.png";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { fetchPosts } from "../redux/slices/posts";
import { fetchTags } from "../redux/slices/posts";

export const TagSortedPostsPage = () => {

	const dispatch = useDispatch();
	const { postsStatus, posts, tagsStatus, tags } = useSelector(state => state.posts);
	const { comments } = useSelector(state => state.comments);
	const { tag } = useParams();
	const currentPageTag = tag.toUpperCase();
	const isPostsLoading = postsStatus === "loading";
	const isTagsLoading = tagsStatus === "loading";
	const currentTagPosts = posts.items.filter(({ tags }) => tags.some(item => item === tag));
	const userData = useSelector((state) => state.auth.data);

	useEffect(() => {
		dispatch(fetchPosts());
		dispatch(fetchTags());
	}, [dispatch]);

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
					{(isPostsLoading ? [...Array(5)] : currentTagPosts).map((obj, index) =>
						isPostsLoading ? (
							<Post key={index} isLoading />
						) : (
							<Post
								key={obj._id}
								id={obj._id}
								title={obj.title}
								imageUrl={
									obj.imageUrl
										? `${import.meta.env.VITE_API_URL}${obj.imageUrl}`
										: NoImage
								}
								user={obj.user}
								createdAt={obj.createdAt}
								viewsCount={obj.viewsCount}
								commentsCount={comments.filter(comment => comment.postId === obj._id).length}
								tags={obj.tags}
								isEditable={userData?._id === obj.user._id}
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
