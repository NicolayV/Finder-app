import { AUTH_LOGOUT, AUTH_SUCCES } from "../actions/actionTypes"


const initialState = {
	auth: false,
	userLogin: null,
	userPassword: null,
}


const authReducer = (state = initialState, { type, payload }) => {

	switch (type) {
		case AUTH_SUCCES:
			return {
				...state,
				auth: true,
				userLogin: payload.login,
				userPassword: payload.password
			}
		case AUTH_LOGOUT:
			return {
				...state,
				auth: false,
				userLogin: null,
				userPassword: null,
			}
		default:
			return state
	}
}

export default authReducer