import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import NoAvatar from "../../assets/hacker.png";
import { selectIsAuth } from "../../redux/slices/auth";
import { fetchComments } from "../../redux/slices/comments";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { AddComment } from "../AddComment/AddComment";
import { SideBlock } from "../SideBlock/SideBlock";

interface CommentsBlockProps {
	postId?: string;
}

export const CommentsBlock: React.FC<CommentsBlockProps> = ({ postId }) => {
	const dispatch = useAppDispatch();
	const { commentsStatus, comments } = useAppSelector(
		(state) => state.comments
	);
	const isLoading = commentsStatus === "loading";
	const currentComments = !postId
		? comments
		: comments.filter((comment) => comment.postId === postId);
	const isAuth = useAppSelector(selectIsAuth);
	const isShowAddCommentComponent = isAuth && postId;
	const setAvatarImage = (imageUrl: string): string => {
		return imageUrl
			? `${import.meta.env.VITE_API_URL}${imageUrl}`
			: NoAvatar;
	};

	useEffect(() => {
		dispatch(fetchComments());
	}, [dispatch]);

	return (
		<SideBlock title="Comments">
			{currentComments.length ? (
				<List sx={{ maxHeight: "500px", overflowY: "auto" }}>
					{(isLoading ? [...Array(5)] : currentComments).map(
						(obj, index) => (
							<React.Fragment key={index}>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										{isLoading ? (
											<Skeleton
												variant="circular"
												width={40}
												height={40}
											/>
										) : (
											<Avatar
												alt={obj.user.fullName}
												src={setAvatarImage(
													obj.user.avatarUrl
												)}
											/>
										)}
									</ListItemAvatar>
									{isLoading ? (
										<div
											style={{
												display: "flex",
												flexDirection: "column",
											}}
										>
											<Skeleton
												variant="text"
												height={25}
												width={120}
											/>
											<Skeleton
												variant="text"
												height={18}
												width={230}
											/>
										</div>
									) : (
										<ListItemText
											primary={obj.user.fullName}
											secondary={obj.text}
										/>
									)}
								</ListItem>
								<Divider variant="inset" component="li" />
							</React.Fragment>
						)
					)}
				</List>
			) : (
				<Typography
					variant="h5"
					component="h5"
					sx={{
						padding: "10px 20px 30px 15px",
					}}
				>
					You don`t have any comments yet
				</Typography>
			)}
			{isShowAddCommentComponent && <AddComment postId={postId} />}
		</SideBlock>
	);
};
