import React from "react";
import { Link } from "react-router-dom";
import TagIcon from "@mui/icons-material/Tag";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { APP_ROUTE_TAGS } from "../constants/routes";

import { SideBlock } from "./SideBlock/SideBlock";

interface TagsBlockProps {
	items: string[];
	isLoading?: boolean;
}

export const TagsBlock: React.FC<TagsBlockProps> = ({
	items,
	isLoading = true,
}) => {
	return (
		<SideBlock title="Tags">
			<List>
				{(isLoading ? [...Array(5)] : items).map((name, i) => (
					<Link
						style={{ textDecoration: "none", color: "black" }}
						to={`${APP_ROUTE_TAGS}/${name}`}
						key={`${name}${i}`}
					>
						<ListItem key={i} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<TagIcon />
								</ListItemIcon>
								{isLoading ? (
									<Skeleton width={100} />
								) : (
									<ListItemText primary={name} />
								)}
							</ListItemButton>
						</ListItem>
					</Link>
				))}
			</List>
		</SideBlock>
	);
};
