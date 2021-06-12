import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { MainConteiner } from '../components/MainContainer'


const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

export const Login = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState('');
	console.log('Login:', value)
	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<MainConteiner>

			<form className={classes.root} noValidate autoComplete="off">
				<div>
					<TextField
						onChange={handleChange}
						id="standard-textarea"
						label="Login:"
						placeholder="Enter your login"
						multiline
					/>
				</div>
				<div>
					<TextField
						id="standard-textarea"
						label="E-mail:"
						placeholder="Enter your e-mail"
						multiline
					/>
				</div>
				<div>
					<TextField
						id="standard-textarea"
						label="Password:"
						placeholder="Enter your password"
						multiline
					/>
				</div>
				<div>
					<TextField
						id="standard-textarea"
						label="Confirm password:"
						placeholder="Enter your password"
						multiline
					/>
				</div>
				<ButtonGroup fullWidth disableElevation variant="contained" color="primary">
					<Button>Submit</Button>
					<Button>Return</Button>
				</ButtonGroup>
			</form>
		</MainConteiner>
	)
}