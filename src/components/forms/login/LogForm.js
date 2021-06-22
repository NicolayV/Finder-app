import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { InputLogin, InputPassword } from '../../../ui/component/uiInputs';
import { UiButton } from "../../../ui/component/uiButton"
import { Form } from "../../../ui/component/uiForm"

import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../store/actions/allActionCreators';
import { useHistory } from 'react-router-dom';


export const LoginForm = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const { authLogOut, authSucces } = bindActionCreators(actionCreators, dispatch)

	const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();

	const [stateBtn, setStateBtn] = useState(false)
	const isDisabled = (toggle) => setStateBtn(true)

	const onSubmit = ({ login, password }) => {
		login ? isDisabled(true) : isDisabled(false)

		const getUsers = () => JSON.parse(localStorage.getItem("users"))
		const users = getUsers()
		const currentUser = users && users.find((user) => user.login === login && user.password === password)

		currentUser ? authSucces({ login }) : (authLogOut({ login } && setError("auth")))
		if (currentUser) setTimeout(() => history.push("/step2"), 2000) //setTimeout для примера button disable, стр - 20, 21, 24, 48
	}


	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<InputLogin
				{...register("login", { required: true })}
				error={!!errors.login || errors.auth}
				helperText={errors.login && <span>Обязательное поле</span>}
			/>
			<InputPassword
				{...register("password", { required: true })}
				error={!!errors.password || errors.auth}
				helperText={(errors.password?.type === 'required' && <span>Обязательное поле</span>)
					|| (errors.auth && <span>Неверный логин или пароль</span>)}
			/>
			<UiButton disabled={stateBtn} onClick={() => clearErrors("auth")}>Submit</UiButton>
		</Form>
	)
}


