import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/actions/allActionCreators';


const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		marginTop: theme.spacing(1),
	}
}))


export const RegistrationForm = () => {

	const state = useSelector(state => state)
	const dispatch = useDispatch()

	const { authLogOut, authSucces } = bindActionCreators(actionCreators, dispatch)


	const styles = useStyles()
	const { register, formState: { errors }, handleSubmit, watch } = useForm();

	const password = useRef({});
	password.current = watch("password", "");

	//console.log("Errors", errors)



	const getLocalStorage = () => {
		const getArryUsers = JSON.parse(localStorage.getItem("arryUsers"))
		return getArryUsers
	}

	const onSubmit = (data) => {
		const arryUsers = JSON.parse(localStorage.getItem("arryUsers")) || []

		if (arryUsers.length === 0) {
			arryUsers.push(data)
			localStorage.setItem("arryUsers", JSON.stringify(arryUsers))
			authSucces(data)
		}

		if (arryUsers.length > 0) {
			const regUser = data
			const allRegUsers = getLocalStorage()
			const check = allRegUsers.filter(user => (user.login === regUser.login && user.password === regUser.password))
			//	console.log('check', check.length)

			if (check.length === 0) {
				console.log('Пользователь не зарегистрирован')
				arryUsers.push(data)
				localStorage.setItem("arryUsers", JSON.stringify(arryUsers))
				authSucces(data)
			} else {
				console.log('Пользователь уже зарегистрирован')
				authLogOut(data)

			}

		}
	}


	return (

		<form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
			<div>
				<TextField
					{...register("login", { required: true, minLength: 6, })}
					label="Login:" placeholder="Enter your login" variant="outlined" margin="normal" multiline name="login" id="login"
				></TextField>
			</div>
			{errors.login?.type === 'required' && "Обязательное поле для заполнения"}
			{errors.login?.type === 'minLength' && "Логин должен быть длиннее 6 символов"}

			<div>
				<TextField
					{...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, })}
					label="E-mail:" placeholder="Eemail@example.com" variant="outlined" margin="normal" multiline name="email" id="email"
				></TextField>
			</div>

			{errors.email?.type === 'pattern' && "Неправильный адрес электронной почты"}
			{errors.email?.type === 'required' && "Обязательное поле для заполнения"}

			<div>
				<TextField
					{...register("password", { required: true, minLength: 6, maxLength: 12 })}
					type="number" label="Password:" placeholder="Enter your password" variant="outlined" margin="normal" multiline name="password" id="password"
				></TextField>
			</div>
			{errors.password?.type === 'required' && "Обязательное поле для заполнения"}
			{errors.password?.type === 'minLength' && "Пароль должен быть длиннее 6 символов и короче 12"}
			{errors.password?.type === 'maxLength' && "Пароль должен быть длиннее 6 символов и короче 12"}


			<div>
				<TextField
					{...register("confirmPassword",
						{
							required: true, minLength: 6, maxLength: 12,
							validate: value =>
								value === password.current || "Пароль не совпадает"
						})}
					type="number" label="Confirm Password:" placeholder="Confirm your password" variant="outlined" margin="normal" multiline name="confirmPassword" id="confirmPassword"
				></TextField>
			</div>
			{errors.confirmPassword?.type === 'required' && "Обязательное поле для заполнения"}
			{errors.confirmPassword?.type === 'minLength' && "Пароль должен быть длиннее 6 символов и короче 12"}
			{errors.confirmPassword?.type === 'maxLength' && "Пароль должен быть длиннее 6 символов и короче 12"}
			{errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

			<div>
				<Button variant="contained" color="primary" type="submit">Submit</Button>
			</div>



		</form >
	)
}
