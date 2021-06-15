import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { LoginForm } from './loginForm/LoginForm';
import { RegistrationForm } from './loginForm/RegistrationForm'

export const TabBar = () => {

	const [selectedTab, setSelectedTab] = React.useState(0)

	const handleChange = (event, newValue) => {
		setSelectedTab(newValue);
	}


	return (
		<>
			<AppBar position="static">
				<Tabs value={selectedTab} onChange={handleChange}>
					<Tab label='авторизация' />
					<Tab label='регистрация' />
				</Tabs>
			</AppBar>

			<p>{selectedTab === 0 && <LoginForm />}</p>
			<p>{selectedTab === 1 && <RegistrationForm />}</p>
		</>
	);
}
