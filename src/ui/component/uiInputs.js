import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
	uiTextField: {
		marginTop: 20,
		marginBottom: 20,
		display: 'blocK'
	},
}));

export const InputLogin = ({ children, ...props }) => {

	const styles = useStyles()

	return (
		<TextField
			{...props}
			className={styles.uiTextField}
			variant="outlined"
			fullWidth={true}
			id="login"
			type="text"
			label="Login:"
			name="login"
			placeholder="Enter your login"
		>
			{children}
		</TextField>
	);
};


export const InputPassword = ({ children, ...props }) => {

	const styles = useStyles()

	return (
		<TextField
			{...props}
			className={styles.uiTextField}
			variant="outlined"
			fullWidth={true}
			id="password"
			type="password"
			label="Password:"
			name="password"
			placeholder="Enter your password"
		>
			{children}
		</TextField>
	);
};

export const InputConfirmPassword = ({ children, ...props }) => {

	const styles = useStyles()

	return (
		<TextField
			{...props}
			className={styles.uiTextField}
			variant="outlined"
			fullWidth={true}
			id="confirmPassword"
			type="password"
			label="Confirm your password:"
			name="confirmPassword"
			placeholder="Enter your password"
		>
			{children}
		</TextField>
	);
};

export const InputEmail = ({ children, ...props }) => {

	const styles = useStyles()

	return (
		<TextField
			{...props}
			className={styles.uiTextField}

			variant="outlined"
			fullWidth={true}
			id="email"
			type="email"
			label="E-mail:"
			name="email"
			placeholder="Email@example.com"
		>
			{children}
		</TextField>
	);
};