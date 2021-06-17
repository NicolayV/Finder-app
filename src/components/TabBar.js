import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { LoginForm } from './loginForm/LoginForm';
import { RegistrationForm } from './loginForm/RegistrationForm'
import Paper from '@material-ui/core/Paper';






export const TabBar = () => {

	const [selectedTab, setSelectedTab] = React.useState(0)

	const handleChange = (event, newValue) => {
		setSelectedTab(newValue);
	}

	const paperStyle = { padding: 20, heigh: "70vh", width: 320, margin: "100px auto", }








	return (
		<>
			<Paper elevation={20} style={paperStyle}>
				<AppBar position="static">
					<Tabs variant="fullWidth" value={selectedTab} onChange={handleChange}>
						<Tab label='Log in' />
						<Tab label='register' />
					</Tabs>
				</AppBar>


				<p>{selectedTab === 0 && <LoginForm />}</p>
				<p>{selectedTab === 1 && <RegistrationForm />}</p>
			</Paper>
		</>
	);
}
