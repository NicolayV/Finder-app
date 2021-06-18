import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/actions/allActionCreators';
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
	root: {
		width: "88%",
		marginTop: theme.spacing(1),
		paddingLeft: 20,
		paddingBottom: 20,

	}
}))


export const LoginForm = () => {

	const state = useSelector(state => state)
	const dispatch = useDispatch()

	const { authLogOut, authSucces } = bindActionCreators(actionCreators, dispatch)


	const styles = useStyles()

	const { register, formState: { errors }, handleSubmit } = useForm();

	//console.log("Errors", errors)

	const onSubmit = (data) => {

		const loginedUser = data
		//console.log(loginedUser.login)

		const getLocalStorage = () => {
			const getArryUsers = JSON.parse(localStorage.getItem("arryUsers"))
			const arryOfUserLog = getArryUsers.map((user) => user.login)
			//console.log(arryOfUserLog)
			return arryOfUserLog

		}
		const regLocalStore = getLocalStorage()
		const checkСontains = regLocalStore.filter(filterLog => (filterLog === loginedUser.login && true))
		if (checkСontains.length > 0) {
			console.log('Пользователь зарегистрирован')
			authSucces(data)
			//console.log(data)
			console.log('state', state)
		}
		if (checkСontains.length === 0) {
			//проверить параметры
			authLogOut(loginedUser.login)
			console.log('Указаный пользователь не зарегистрирован')
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
			<Box>

				<div>
					<TextField
						{...register("login", { required: true })}
						label="Login:" placeholder="Enter your login" variant="outlined" margin="normal" multiline fullWidth
					></TextField>
				</div>
				{errors.login && "Обязательное поле для заполнения"}

				<div>
					<TextField
						{...register("password", { required: true, minLength: 6, maxLength: 12 })}
						type="number" label="Password:" placeholdeßr="Enter your password" variant="outlined" margin="normal" multiline fullWidth
					></TextField>
				</div>
				{errors.password?.type === 'required' && "Обязательное поле для заполнения"}
				{errors.password?.type === 'minLength' && "Пароль должен быть длиннее 6 символов и короче 12"}
				{errors.password?.type === 'maxLength' && "Пароль должен быть длиннее 6 символов и короче 12"}

				<div>
					<TextField
						{...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, })}
						label="E-mail:" placeholder="Eemail@example.com" variant="outlined" margin="normal" multiline fullWidth
					></TextField>
				</div>
				{errors.email?.type === 'pattern' && "Неправильный адрес электронной почты"}
				{errors.email?.type === 'required' && "Обязательное поле для заполнения"}

				<div>
					<Button fullWidth variant="contained" color="primary" type="submit">Submit</Button>
				</div>
				{/* {errors && console.log()} */}
			</Box>
		</form>

	)
}


