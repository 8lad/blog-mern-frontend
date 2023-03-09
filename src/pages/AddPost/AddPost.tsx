import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import * as yup from "yup";

import { APP_ROUTE_POSTS, APP_ROUTE_ROOT } from "../../constants/routes";
import { selectIsAuth } from "../../redux/slices/auth";
import {
	fetchImageUrl,
	fetchSinglePost,
	fetchSinglePostData,
	fetchSinglePostDataPatch,
	removeImageUrl,
	removeSinglePost,
	setText,
} from "../../redux/slices/singlePost";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getArrayFromString } from "../../utils/getArrayFromString";
import { getStringFromArray } from "../../utils/getStringFromArray";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";

interface AddPostFormData {
	tags: string;
	title: string;
}

export const AddPost: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const { imageUrl, text, title, tags } = useAppSelector(
		(state) => state.singlePost.post
	);

	const schema = yup
		.object({
			title: yup
				.string()
				.trim()
				.required("This field is required")
				.min(3, "Please enter more information")
				.matches(
					/^[a-z | A-Z | 0-9 | ? | . | , | ! | : ]+$/,
					"Please enter only letters or numbers, without special symbols"
				),
			tags: yup
				.string()
				.trim()
				.required("This field is required")
				.min(3, "Please enter more information")
				.matches(
					/^[a-z | A-Z | 0-9 ]+$/,
					"Please enter only letters or numbers, without special symbols"
				),
		})
		.required();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: title,
			tags: getStringFromArray(tags),
		},
		mode: "onChange",
		resolver: yupResolver(schema),
	});

	const isAuth = useAppSelector(selectIsAuth);
	const { id } = useParams();
	const isEditing = Boolean(id);

	const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		const formData = new FormData();
		if (event.target.files) {
			const file = event.target.files[0];
			formData.append("image", file);
			dispatch(fetchImageUrl(formData));
		}
	};

	const removeImage = () => {
		dispatch(removeImageUrl());
	};

	const removePost = () => {
		dispatch(removeSinglePost());
	};

	const onSetText = useCallback((value: string) => {
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
				uniqueId: id ?? Date.now().toString(),
			},
		}),
		[]
	);

	const onSubmit = (data: AddPostFormData) => {
		const fields = {
			text,
			title: data.title,
			tags: getArrayFromString(data.tags),
			imageUrl,
			_id: id ?? "",
		};

		dispatch(
			id ? fetchSinglePostDataPatch(fields) : fetchSinglePostData(fields)
		);

		id ? navigate(`${APP_ROUTE_POSTS}/${id}`) : navigate(APP_ROUTE_ROOT);
	};

	useEffect(() => {
		id ? dispatch(fetchSinglePost(id)) : dispatch(removeSinglePost());
	}, [dispatch, id]);

	useEffect(() => {
		setValue("title", title);
		setValue("tags", getStringFromArray(tags));
	}, [setValue, tags, title]);

	if (!window.localStorage.getItem("token-mern") && !isAuth) {
		return <Navigate to={APP_ROUTE_ROOT} />;
	}

	return (
		<Paper style={{ padding: 20 }}>
			<div className={styles.topButtons}>
				<Button
					variant="outlined"
					size="large"
					onClick={() =>
						inputFileRef.current
							? inputFileRef.current.click()
							: false
					}
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
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					classes={{ root: styles.title }}
					variant="standard"
					placeholder="The post title..."
					fullWidth
					{...register("title")}
					error={Boolean(errors?.title)}
					helperText={errors?.title && errors?.title?.message}
				/>
				<TextField
					classes={{ root: styles.tags }}
					variant="standard"
					placeholder="Tags"
					fullWidth
					{...register("tags")}
					error={Boolean(errors?.tags)}
					helperText={errors?.tags && errors?.tags.message}
				/>
				<SimpleMDE
					className={styles.editor}
					value={text}
					onChange={onSetText}
					options={options}
				/>
				<div className={styles.buttons}>
					<Button type="submit" size="large" variant="contained">
						{isEditing ? "Edit" : "Publish"}
					</Button>
					<Link to={APP_ROUTE_ROOT}>
						<Button onClick={removePost} size="large">
							Cancel
						</Button>
					</Link>
				</div>
			</form>
		</Paper>
	);
};
