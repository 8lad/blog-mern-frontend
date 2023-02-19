import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";

import NoAvatar from "../../assets/hacker.png";
import { MIN_COMMENT_LENGTH } from "../../constants/baseValues";
import { fetchSingleCommentData } from "../../redux/slices/comments";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import styles from "./AddComment.module.scss";

interface AddCommentProps {
	postId: string;
}

interface CommentDataInterface {
	singleComment: string;
}

export const AddComment: React.FC<AddCommentProps> = ({ postId }) => {
	const dispatch = useAppDispatch();
	const { fullName, avatarUrl } = useAppSelector((state) => state.auth.data);
	const schema = yup
		.object({
			singleComment: yup.string().trim().min(MIN_COMMENT_LENGTH),
		})
		.required();
	const {
		register,
		handleSubmit,
		formState: { isValid, isDirty },
		reset,
	} = useForm<CommentDataInterface>({
		mode: "onChange",
		resolver: yupResolver(schema),
	});
	const onSubmit = (data: CommentDataInterface) => {
		const commentData = {
			postId,
			text: data.singleComment,
			user: {
				fullName,
				avatarUrl,
			},
		};
		dispatch(fetchSingleCommentData(commentData));
		reset();
	};

	const avatarImage = avatarUrl
		? `${import.meta.env.VITE_API_URL}${avatarUrl}`
		: NoAvatar;

	return (
		<>
			<div className={styles.root}>
				<Avatar classes={{ root: styles.avatar }} src={avatarImage} />
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<TextField
						label="Left a comment"
						variant="outlined"
						maxRows={10}
						multiline
						fullWidth
						{...register("singleComment")}
					/>
					<Button
						variant="contained"
						type="submit"
						disabled={!isDirty || !isValid}
					>
						Send
					</Button>
				</form>
			</div>
		</>
	);
};
