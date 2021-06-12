import React, { useState } from 'react'
//import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { MainConteiner } from '../components/MainContainer'
import { Form } from '../components/Form';
import { Input } from '../components/Imput'
import { PrimaryButton } from '../components/PrimaryButton';
import { useForm } from 'react-hook-form';

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		'& .MuiTextField-root': {
// 			margin: theme.spacing(1),
// 			width: '25ch',
// 		},
// 	},
// }));

export const Signin = () => {
	// const classes = useStyles();
	//const [value, setValue] = React.useState('');

	const { register, handleSubmit } = useForm();
	// const { register, handleSubmit, errors } = useForm({
	// 	mode: "onBlur"
	// })

	// const handleChange = (event) => {
	// 	setValue(event.target.value);
	// };

	// const [loginConfirm, setLoginConfirm] = useState('')

	// console.log(value)
	// console.log(loginConfirm)

	const onSubmit = (data) => {
		console.log(data)
	}

	return (
		<MainConteiner>

			<Form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<TextField
						//onChange={handleChange}
						id="standard-textarea"
						label="Login:"
						placeholder="Enter your login"
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
					<Input
						ref={register}
						id="firstName"
						type="text"
						label="First Name"
						name="firsName"
					/>
				</div>
				<PrimaryButton>Next</PrimaryButton>
				<div>
					<ButtonGroup disableElevation variant="contained" color="primary">
						{/* <Button onClick={() => setLoginConfirm('Confirm')}>Confirm</Button>
						<Button onClick={() => setLoginConfirm('Return')} > Return</Button> */}
					</ButtonGroup>
				</div>
			</Form>
		</MainConteiner>
	)
}