import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		marginTop: theme.spacing(1),
	}
}))


export const Form = ({ children, ...props }) => {
	const styles = useStyles()

	return (
		<div className={styles.root} noValidate {...props}>
			{children}
		</div>
	)
}

// в return form change to div - warning browse not recognized form
