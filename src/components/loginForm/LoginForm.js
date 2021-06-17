import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
//import { connect } from 'react-redux'


const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		marginTop: theme.spacing(1),
	}
}))

//const LoginForm = () => {
export const LoginForm = () => {


	const styles = useStyles()

	const { register, formState: { errors }, handleSubmit } = useForm();

	console.log("Errors", errors)

	const onSubmit = (data) => {

		const loginedUser = data
		console.log(loginedUser)

		const getLocalStorage = () => {
			const getArryUsers = JSON.parse(localStorage.getItem("arryUsers"))
			const arryOfUserLog = getArryUsers.map((user) => user.login)
			console.log(arryOfUserLog)
			return arryOfUserLog

		}
		const regLocalStore = getLocalStorage()
		const checkСontains = regLocalStore.filter(filterLog => (filterLog === loginedUser.login && true))
		console.log('Пользователь зарегистрирован', checkСontains)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.root}>
			<div>
				<TextField
					{...register("login", { required: true })}
					label="Login:" placeholder="Enter your login" variant="outlined" margin="normal" multiline
				></TextField>
			</div>
			{errors.login && "Обязательное поле для заполнения"}

			<div>
				<TextField
					{...register("password", { required: true, minLength: 6, maxLength: 12 })}
					type="number" label="Password:" placeholdeßr="Enter your password" variant="outlined" margin="normal" multiline
				></TextField>
			</div>
			{errors.password?.type === 'required' && "Обязательное поле для заполнения"}
			{errors.password?.type === 'minLength' && "Пароль должен быть длиннее 6 символов и короче 12"}
			{errors.password?.type === 'maxLength' && "Пароль должен быть длиннее 6 символов и короче 12"}

			<div>
				<TextField
					{...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, })}
					label="E-mail:" placeholder="Eemail@example.com" variant="outlined" margin="normal" multiline
				></TextField>
			</div>
			{errors.email?.type === 'pattern' && "Неправильный адрес электронной почты"}
			{errors.email?.type === 'required' && "Обязательное поле для заполнения"}

			<div>
				<Button variant="contained" color="primary" type="submit">Submit</Button>
			</div>
		</form>

	)
}



// const mapStateToProps = state => {
// 	return {
// 		auth: state.auth.auth
// 	}
// }

// export default connect(mapStateToProps)(LoginForm)