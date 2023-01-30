import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import NoAvatar from "../../assets/hacker.png";
import { fetchComments, fetchSingleCommentData } from "../../redux/slices/comments";

import styles from "./AddComment.module.scss";


export const Index = ({ postId }) => {

	const [commentText, setCommentText] = useState("");
	const isAbleToSend = commentText.length < 3;
	const enterTextHangler = (event) => setCommentText(event.target.value);
	const dispatch = useDispatch();
	const { fullName, avatarUrl } = useSelector(state => state.auth.data);
	const sendCommentData = () => {
		const data = {
			postId,
			text: commentText,
			user: {
				fullName,
				avatarUrl
			}
		};
		dispatch(fetchSingleCommentData(data));
		setCommentText("");
		dispatch(fetchComments());
	};

	return (
		<>
			<div className={styles.root}>
				<Avatar
					classes={{ root: styles.avatar }}
					src={NoAvatar}
				/>
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
					<Button variant="contained" disabled={isAbleToSend} onClick={sendCommentData} >Send</Button>
				</div>
			</div>
		</>
	);
};
