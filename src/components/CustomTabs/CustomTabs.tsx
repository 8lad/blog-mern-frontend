import React from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { TABS_SORT_NEW, TABS_SORT_POPULAR } from "../../constants/baseValues";
import { setPostSorting } from "../../redux/slices/posts";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export const CustomTabs: React.FC = () => {
	const dispatch = useAppDispatch();
	const { sorting } = useAppSelector((state) => state.posts.posts);
	const sortingValue: number =
		sorting === "new" ? TABS_SORT_NEW : TABS_SORT_POPULAR;

	return (
		<Tabs
			style={{ marginBottom: 15 }}
			value={sortingValue}
			aria-label="basic tabs example"
		>
			<Tab label="New" onClick={() => dispatch(setPostSorting("new"))} />
			<Tab
				label="Popular"
				onClick={() => dispatch(setPostSorting("popular"))}
			/>
		</Tabs>
	);
};
