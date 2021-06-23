export const delay = (ms) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const getUsers = () => JSON.parse(localStorage.getItem("users"))
			const users = getUsers()
			resolve(users)
		}, ms)
	})
}


