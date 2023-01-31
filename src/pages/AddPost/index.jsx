import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import { APP_ROUTE_POSTS, APP_ROUTE_ROOT } from "../../constants";
import { selectIsAuth } from "../../redux/slices/auth";
import {
	fetchImageUrl,
	fetchSinglePost,
	fetchSinglePostData,
	isReadyToSend,
	removeImageUrl,
	removeSinglePost,
	setTags,
	setText,
	setTitle,
} from "../../redux/slices/singlePost";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";

export const AddPost = () => {
	const navigate = useNavigate();
	const inputFileRef = useRef(null);
	const dispatch = useDispatch();
	const { imageUrl, text, title, tags } = useSelector(
		(state) => state.singlePost.post
	);

	const isAuth = useSelector(selectIsAuth);
	const isPostAbleToSend = useSelector(isReadyToSend);
	const { id } = useParams();
	const isEditing = Boolean(id);
	const handleChangeFile = (event) => {
		const formData = new FormData();
		const file = event.target.files[0];
		formData.append("image", file);
		dispatch(fetchImageUrl(formData));
	};

	const removeImage = () => {
		dispatch(removeImageUrl());
	};

	const removePost = () => {
		dispatch(removeSinglePost());
	};

	const onSetText = useCallback((value) => {
		dispatch(setText(value));
	}, []);

	const options = useMemo(
		() => ({
			spellChecker: false,
			maxHeight: "400px",
			autofocus: true,
			placeholder: "Write a text...",
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
				uniqueId: id ?? Date.now(),
			},
		}),
		[]
	);

	const onSubmit = () => {
		const fields = { text, title, tags: Array.isArray(tags) ? tags : tags.replaceAll(",", " ").split(" "), imageUrl, _id: id };

		dispatch(fetchSinglePostData(fields));

		id ? navigate(`${APP_ROUTE_POSTS}/${id}`) : navigate(APP_ROUTE_ROOT);
	};

	useEffect(() => {
		id ? dispatch(fetchSinglePost(id)) : dispatch(removeSinglePost());
	}, [dispatch, id]);

	if (!window.localStorage.getItem("token") && !isAuth) {
		return <Navigate to={APP_ROUTE_ROOT} />;
	}

	return (
		<Paper style={{ padding: 30 }}>
			<Button
				variant="outlined"
				size="large"
				onClick={() => inputFileRef.current.click()}
			>
				Upload an image
			</Button>
			<input
				ref={inputFileRef}
				type="file"
				onChange={handleChangeFile}
				hidden
			/>
			{imageUrl && (
				<>
					<Button
						variant="contained"
						color="error"
						size="large"
						onClick={removeImage}
						sx={{ ml: "10px" }}
					>
						Delete
					</Button>
					<img
						className={styles.image}
						src={`${import.meta.env.VITE_API_URL}${imageUrl}`}
						alt="Uploaded"
					/>
				</>
			)}
			<br />
			<br />
			<TextField
				classes={{ root: styles.title }}
				variant="standard"
				placeholder="The post title..."
				value={title}
				onChange={(event) => dispatch(setTitle(event.target.value))}
				fullWidth
			/>
			<TextField
				classes={{ root: styles.tags }}
				variant="standard"
				placeholder="Tags"
				value={Array.isArray(tags) ? tags.join(" ") : tags}
				onChange={(event) => dispatch(setTags(event.target.value))}
				fullWidth
			/>
			<SimpleMDE
				className={styles.editor}
				value={text}
				onChange={onSetText}
				options={options}
			/>
			<div className={styles.buttons}>
				<Button
					size="large"
					variant="contained"
					onClick={onSubmit}
					disabled={!isPostAbleToSend}
				>
					{isEditing ? "Edit" : "Publish"}
				</Button>
				<Link to={APP_ROUTE_ROOT}>
					<Button onClick={removePost} size="large">
						Cancel
					</Button>
				</Link>
			</div>
		</Paper>
	);
};
