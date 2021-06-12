import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
	root: { flexGrow: 1, },
	menuButton: { marginRight: theme.spacing(2), },
	title: { flexGrow: 1, },
}));

export const Navbar = () => {
	const classes = useStyles();

	return (
		<AppBar
			position="static">
			<Toolbar>
				<IconButton
					edge="start"
					className={classes.menuButton}
					color="inherit"
					aria-label="menu">
					<MenuIcon />
				</IconButton>
				<Typography
					variant="h6"
					className={classes.title}>
					Movie Finder App
				</Typography>
				<Button component={Link} to="/signin" color="inherit">Signin</Button>
				<Button component={Link} to="/login" color="inherit">Login</Button>
			</Toolbar>
		</AppBar>

	)
}