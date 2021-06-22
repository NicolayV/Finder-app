import React, { useRef } from 'react'
import { useForm } from 'react-hook-form';
import { InputConfirmPassword, InputEmail, InputLogin, InputPassword } from '../../../ui/component/uiInputs';
import { UiButton } from '../../../ui/component/uiButton';
import { Form } from "../../../ui/component/uiForm"

import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/actions/allActionCreators';


export const RegistrationForm = () => {
	const dispatch = useDispatch()
	const { authLogOut, authSucces } = bindActionCreators(actionCreators, dispatch)

	const { register, handleSubmit, setError, clearErrors, formState: { errors }, watch } = useForm();

	const password = useRef({});
	password.current = watch("password", "");

	const onSubmit = ({ login, password, email }) => {
		const getUsers = () => JSON.parse(localStorage.getItem("users"))
		const users = getUsers()
		if (users && users.find((user) => user.login === login && user.password === password)) {
			authLogOut({ login } && setError("wasLogged"))
		} else {
			users.push({ login, password, email })
			localStorage.setItem("users", JSON.stringify(users))
			authSucces({ login, email })
		}
	}


	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<InputLogin
				{...register("login", { required: true, minLength: 6, })}
				error={!!errors.login || errors.wasLogged}
				helperText={(errors.login?.type === 'required' && <span>Обязательное поле</span>) || (errors.login?.type === 'minLength' && <span>Логин больше 6 символов</span>) || (errors.wasLogged && <span>Такой пользователь уже есть</span>)}
			/>
			<InputEmail
				{...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, })}
				error={!!errors.email}
				helperText={(errors.email?.type === 'required' && <span>Обязательное поле</span>) || (errors.email?.type === 'pattern' && <span>Некорректный адрес эл.почты</span>)}
			/>

			<InputPassword
				{...register("password", { required: true, minLength: 6, maxLength: 12 })}
				error={!!errors.password}
				helperText={(errors.password?.type === 'required' && <span>Обязательное поле</span>) || (errors.password?.type === 'minLength' && <span>Пароль от 6 до 12 символов</span>) || (errors.password?.type === 'maxLength' && <span>Пароль от 6 до 12 символов</span>)}
			/>
			<InputConfirmPassword
				{...register("confirmPassword", {
					required: true,
					validate: value =>
						value === password.current || <span>Пароль не совпадает</span>
				})}
				error={!!errors.confirmPassword}
				helperText={(errors.confirmPassword?.type === 'required' && <span>Обязательное поле</span>) || (errors.confirmPassword && <span>{errors.confirmPassword.message}</span>)}
			/>
			<UiButton onClick={() => clearErrors("wasLogged")}>Submit</UiButton>
		</Form>
	)
}
