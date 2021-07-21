import React, { forwardRef } from "react";
import { useStyles } from './style'

export const Form = forwardRef(({ children, ...props }, ref) => {

	const styles = useStyles()

	return (
		<form
			{...props}
			inputRef={ref}
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
});
