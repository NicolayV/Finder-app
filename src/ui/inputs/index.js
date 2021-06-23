import React, { forwardRef } from "react";
import { useStyles } from './style'

import TextField from '@material-ui/core/TextField';



export const Input = forwardRef(({ children, ...props }, ref) => {

	const styles = useStyles()

	return (
		<TextField
			{...props}
			inputRef={ref}
			className={styles.uiTextField}
			variant="outlined"
			fullWidth={true}
		/>
	);
});

