import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Container } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"

	}
}))

export const MainConteiner = ({ children, ...props }) => {
	const style = useStyles()

	return (

		<Container
			className={style.root}
			container='main' maxWidth="xs"
			{...props}>
			{children}
		</Container>

	)


}