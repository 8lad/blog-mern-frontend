import React, { useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import NoAvatar from "../../assets/hacker.png";
import { fetchSingleCommentData } from "../../redux/slices/comments";
import { RootState, useAppDispatch } from "../../redux/store";

import styles from "./AddComment.module.scss";

interface AddCommentProps {
	postId: string;
}

export const AddComment: React.FC<AddCommentProps> = ({ postId }) => {
	const [commentText, setCommentText] = useState<string>("");
	const isAbleToSend: boolean = commentText.length < 3;
	const enterTextHangler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCommentText(event.target.value);
	};
	const dispatch = useAppDispatch();
	const { fullName, avatarUrl } = useSelector(
		(state: RootState) => state.auth.data
	);
	const sendCommentData = () => {
		const data = {
			postId,
			text: commentText,
			user: {
				fullName,
				avatarUrl,
			},
		};
		dispatch(fetchSingleCommentData(data));
		setCommentText("");
	};

	const avatarImage = avatarUrl
		? `${import.meta.env.VITE_API_URL}${avatarUrl}`
		: NoAvatar;

	return (
		<>
			<div className={styles.root}>
				<Avatar classes={{ root: styles.avatar }} src={avatarImage} />
				<div className={styles.form}>
					<TextField
						label="Left a comment"
						variant="outlined"
						maxRows={10}
						multiline
						fullWidth
						value={commentText}
						onChange={enterTextHangler}
					/>
					<Button
						variant="contained"
						disabled={isAbleToSend}
						onClick={sendCommentData}
					>
						Send
					</Button>
				</div>
			</div>
		</>
	);
};
