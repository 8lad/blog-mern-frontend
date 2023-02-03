import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ConfirmationPopupProps {
	isOpen: boolean;
	setIsOpen: (arg: boolean) => void;
	actionButtonClick: () => void;
	title: string;
	text?: string;
}

export const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
	isOpen,
	setIsOpen,
	actionButtonClick,
	title,
	text,
}) => {
	const handleClickActon = () => {
		setIsOpen(false);
		actionButtonClick();
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<div>
			<Dialog
				open={isOpen}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
				{text && (
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{text}
						</DialogContentText>
					</DialogContent>
				)}
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClickActon} autoFocus>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
