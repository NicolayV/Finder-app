import { AUTH_LOGOUT, AUTH_SUCCES } from "./actionTypes"

export const authSucces = (userLogPsw) => {
	return (dispatch) => {
		dispatch({
			type: AUTH_SUCCES,
			auth: true,
			payload: userLogPsw,
		})
	}
}

export const authLogOut = (userLogPsw) => {
	return (dispatch) => {
		dispatch({
			type: AUTH_LOGOUT,
			auth: false,
			payload: userLogPsw,
		})
	}
}