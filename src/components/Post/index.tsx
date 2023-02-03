import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import IconButton from "@mui/material/IconButton";
import clsx from "clsx";

import NoImage from "../../assets/no-image.png";
import {
	APP_ROUTE_EDIT_POST,
	APP_ROUTE_POSTS,
	APP_ROUTE_TAGS,
} from "../../constants";
import { userDataInterface } from "../../redux/reduxTypes";
import { fetchRemovePost } from "../../redux/slices/posts";
import { useAppDispatch } from "../../redux/store";
import { ConfirmationPopup } from "../ConfirmationPopup/ConfirmationPopup";
import { UserInfo } from "../UserInfo";

import { PostSkeleton } from "./Skeleton";

import styles from "./Post.module.scss";

interface PostProps {
	id: string;
	title: string;
	imageUrl: string;
	user: userDataInterface;
	viewsCount: number;
	commentsCount: number;
	tags: string[];
	children?: React.ReactNode;
	isLoading: boolean;
	isEditable?: boolean;
	createdAt?: string;
	isFullPost?: boolean;
}

export const Post: React.FC<PostProps> = ({
	id,
	title,
	createdAt,
	imageUrl,
	user,
	viewsCount,
	commentsCount,
	tags,
	children,
	isFullPost,
	isLoading,
	isEditable = false,
}) => {
	const dispatch = useAppDispatch();
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	if (isLoading) {
		return <PostSkeleton />;
	}

	const onClickRemove = () => {
		setIsPopupOpen(true);
	};
	const removePostById = () => {
		dispatch(fetchRemovePost(id));
	};

	return (
		<>
			<div
				className={clsx(styles.root, { [styles.rootFull]: isFullPost })}
			>
				{isEditable && (
					<div className={styles.editButtons}>
						<Link
							to={`${APP_ROUTE_POSTS}/${id}${APP_ROUTE_EDIT_POST}`}
						>
							<IconButton color="primary">
								<EditIcon />
							</IconButton>
						</Link>
						<IconButton onClick={onClickRemove} color="secondary">
							<DeleteIcon />
						</IconButton>
					</div>
				)}
				{imageUrl ? (
					<img
						className={clsx(styles.image, {
							[styles.imageFull]: isFullPost,
						})}
						src={imageUrl}
						alt={title}
						onError={(
							event: React.SyntheticEvent<HTMLImageElement, Event>
						) => ((event.target as HTMLImageElement).src = NoImage)}
					/>
				) : (
					<img
						className={clsx(styles.image, {
							[styles.imageFull]: isFullPost,
						})}
						style={{
							maxWidth: 500,
							margin: "10px auto",
							display: "block",
						}}
						src={NoImage}
						alt={
							"https://www.freeiconspng.com/img/23492 title=from freeiconspng.com src=https://www.freeiconspng.com/uploads/no--icon-13.png"
						}
					/>
				)}
				<div className={styles.wrapper}>
					<UserInfo {...user} additionalText={createdAt} />
					<div className={styles.indention}>
						<h2
							className={clsx(styles.title, {
								[styles.titleFull]: isFullPost,
							})}
						>
							{isFullPost ? (
								title
							) : (
								<Link to={`${APP_ROUTE_POSTS}/${id}`}>
									{title}
								</Link>
							)}
						</h2>
						<ul className={styles.tags}>
							{tags.map((name) => (
								<li key={name}>
									<Link to={`${APP_ROUTE_TAGS}/${name}`}>
										#{name}
									</Link>
								</li>
							))}
						</ul>
						{children && (
							<div className={styles.content}>{children}</div>
						)}
						<ul className={styles.postDetails}>
							<li>
								<EyeIcon />
								<span>{viewsCount}</span>
							</li>
							<li>
								<CommentIcon />
								<span>{commentsCount}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<ConfirmationPopup
				isOpen={isPopupOpen}
				setIsOpen={setIsPopupOpen}
				actionButtonClick={removePostById}
				title="Do you really want to delete this post?"
			/>
		</>
	);
};
