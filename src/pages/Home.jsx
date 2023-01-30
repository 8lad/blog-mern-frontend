import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";

import NoImage from "../assets/no-image.png";
import { CommentsBlock } from "../components/CommentsBlock";
import { CustomTabs } from "../components/CustomTabs/CustomTabs";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { fetchComments } from "../redux/slices/comments";
import { fetchPosts, fetchTags } from "../redux/slices/posts";

export const Home = () => {
	const dispatch = useDispatch();
	const { posts, tags } = useSelector((state) => state.posts);
	const userData = useSelector((state) => state.auth.data);
	const { comments } = useSelector((state) => state.comments);
	const { sorting } = posts;
	const isPostsLoading = posts.status === "loading";
	const isTagsLoading = tags.status === "loading";

	useEffect(() => {
		dispatch(fetchPosts(sorting));
		dispatch(fetchTags());
		dispatch(fetchComments());
	}, [dispatch, sorting]);


	return (
		<>
			<CustomTabs />
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
						isPostsLoading ? (
							<Post key={index} isLoading />
						) : (
							<Post
								key={obj._id}
								id={obj._id}
								title={obj.title}
								imageUrl={
									obj.imageUrl
										? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
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
					<CommentsBlock />
				</Grid>
			</Grid>
		</>
	);
};
