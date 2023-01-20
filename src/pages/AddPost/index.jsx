import React, {
	useState,
	useMemo,
	useCallback,
	useRef,
	useEffect
} from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import axios from "../../axios";
import {
	APP_ROUTE_POSTS,
	APP_ROUTE_UPLOAD,
	APP_ROUTE_ROOT
} from "../../constants";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";

export const AddPost = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState("");
	const [text, setText] = useState("");
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState("");
	const inputFileRef = useRef(null);

	const isAuth = useSelector(selectIsAuth);
	const { id } = useParams();
	const isEditing = Boolean(id);

	const handleChangeFile = async (event) => {
		try {
			const formData = new FormData();
			const file = event.target.files[0];
			formData.append("image", file);
			const { data } = await axios.post(APP_ROUTE_UPLOAD, formData);
			setImageUrl(data.url);
		} catch (error) {
			console.warn(error);
			alert("Image loading error");
		}
	};

	const onClickRemoveImage = () => {
		setImageUrl("");
	};

	const onChange = useCallback((value) => {
		setText(value);
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
				delay: 1000
			}
		}),
		[]
	);

	const onSubmit = async () => {
		try {
			setIsLoading(true);

			const fields = { text, title, tags: tags.split(","), imageUrl };
			const { data } = isEditing
				? await axios.patch(`${APP_ROUTE_POSTS}/${id}`, fields)
				: await axios.post(APP_ROUTE_POSTS, fields);

			const _id = isEditing ? id : data._id;
			navigate(`${APP_ROUTE_POSTS}/${_id}`);
		} catch (error) {
			console.warn("Post loading error");
			alert("Post loading error");
		}
	};

	useEffect(() => {
		if (id) {
			axios
				.get(`${APP_ROUTE_POSTS}/${id}`)
				.then(({ data: { text, tags, imageUrl, title } }) => {
					setText(text);
					setTags(tags);
					setImageUrl(imageUrl);
					setTitle(title);
				})
				.catch((error) => console.log(error));
		}
	}, []);

	if (!window.localStorage.getItem("token") && !isAuth) {
		return <Navigate to="/" />;
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
						onClick={onClickRemoveImage}
					>
						Delete
					</Button>
					<img
						className={styles.image}
						src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
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
				onChange={(event) => setTitle(event.target.value)}
				fullWidth
			/>
			<TextField
				classes={{ root: styles.tags }}
				variant="standard"
				placeholder="Tags"
				value={tags}
				onChange={(event) => setTags(event.target.value)}
				fullWidth
			/>
			<SimpleMDE
				className={styles.editor}
				value={text}
				onChange={onChange}
				options={options}
			/>
			<div className={styles.buttons}>
				<Button size="large" variant="contained" onClick={onSubmit}>
					{isEditing ? "Edit" : "Publish"}
				</Button>
				<Link to={APP_ROUTE_ROOT}>
					<Button size="large">Cancel</Button>
				</Link>
			</div>
		</Paper>
	);
};
