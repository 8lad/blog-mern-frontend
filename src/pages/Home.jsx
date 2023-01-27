import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";

import NoImage from "../assets/no-image.png";
import { CommentsBlock } from "../components/CommentsBlock";
import { CustomTabs } from "../components/CustomTabs/CustomTabs";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";

export const Home = () => {
	const dispatch = useDispatch();
	const { posts, tags } = useSelector((state) => state.posts);
	const { sorting } = posts;
	const userData = useSelector((state) => state.auth.data);
	const isPostsLoading = posts.status === "loading";
	const isTagsLoading = tags.status === "loading";

	useEffect(() => {
		dispatch(fetchPosts(sorting));
		dispatch(fetchTags());
	}, [dispatch, sorting]);

	return (
		<>
			<CustomTabs />
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{(isPostsLoading ? [...Array(5)] : posts.items).map(
						(obj, index) =>
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
									commentsCount={3}
									tags={obj.tags}
									isEditable={userData?._id === obj.user._id}
								/>
							)
					)}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock items={tags.items} isLoading={isTagsLoading} />
					<CommentsBlock
						items={[
							{
								user: {
									fullName: "James Rodrigues",
									avatarUrl:
										"https://mui.com/static/images/avatar/1.jpg",
								},
								text: "This is the text comment",
							},
							{
								user: {
									fullName: "Michel Kean",
									avatarUrl:
										"https://mui.com/static/images/avatar/2.jpg",
								},
								text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
							},
						]}
						isLoading={false}
					/>
				</Grid>
			</Grid>
		</>
	);
};
