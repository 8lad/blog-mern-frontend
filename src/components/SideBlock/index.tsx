import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useScreenSize } from "../../hooks/useScreenSize";

import styles from "./SideBlock.module.scss";

interface SideBlockProps {
	title: string;
	children: React.ReactNode;
}

export const SideBlock: React.FC<SideBlockProps> = ({ title, children }) => {
	const { screenWidth } = useScreenSize();
	const isBigScreen = screenWidth && screenWidth >= 900;
	return (
		<Paper classes={{ root: styles.root }}>
			{isBigScreen && (
				<Typography variant="h6" classes={{ root: styles.title }}>
					{title}
				</Typography>
			)}
			{children}
		</Paper>
	);
};
