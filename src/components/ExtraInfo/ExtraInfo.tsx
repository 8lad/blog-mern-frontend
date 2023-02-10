import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import styles from "./ExtraInfo.module.scss";

interface ExtraInfoProps {
	tags: React.ReactNode;
	comments: React.ReactNode;
}

export const ExtraInfo: React.FC<ExtraInfoProps> = ({ tags, comments }) => {
	return (
		<div className={styles.root}>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography>Tags</Typography>
				</AccordionSummary>
				<AccordionDetails>{tags}</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography>Comments</Typography>
				</AccordionSummary>
				<AccordionDetails>{comments}</AccordionDetails>
			</Accordion>
		</div>
	);
};
