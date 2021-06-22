import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "88%",
		marginTop: theme.spacing(1),
		paddingLeft: 20,
		paddingBottom: 20,

	},
}));

export const Form = ({ children, ...props }) => {

	const styles = useStyles()

	return (
		<form
			{...props}
			type="submit"
			fullWidth={true}
			variant="contained"
			color="primary"
			className={styles.root}
			noValidate
			autoComplete="off"
		>
			{children}
		</form>
	);
};
