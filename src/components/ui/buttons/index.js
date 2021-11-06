import React, { forwardRef } from "react";
import Button from "@material-ui/core/Button";
import { useStyles } from './style'

export const UiButton = forwardRef(({ children, ...props }, ref) => {

	const styles = useStyles()

	return (
		<Button
			{...props}
			inputRef={ref}
			type="submit"
			fullWidth={true}
			variant="contained"
			color="primary"
			className={styles.root}
		>
			{children}
		</Button>
	);
});
