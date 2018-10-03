import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Table, Checkbox, Button } from 'antd';


import Header from './header';
import SideNav from './side-nav'

import Home from '../routes/home';
import Invites from '../routes/invites';
import Permissions from '../routes/permissions';
import ProRequests from '../routes/pro-requests';
import Withdrawals from '../routes/withdrawals'
import Transactions from '../routes/transactions';
import ActiveUsers from '../routes/users-active';
import ArchivedUsers from '../routes/users-archived';
import IncompleteRegUsers from '../routes/users-incomplete-reg';
import VariablesSettings from '../routes/variables-settings'

export const routes = {
	PRO_REQUESTS: '/pro-requests',
	WITHDRAWALS: '/withdrawals',
	ACTIVE_USERS: '/users-active',
	ARCHIVED_USERS: '/users-archived',
	INCOMPLETE_REGISTRATIONS: '/users-incomplete',
	TRANSACTIONS : '/transactions',
	VARIABLES_SETTINGS: '/variables-settings',
	INVITES: '/invites',
	PERMISSIONS: '/permissions',
}

export default class App extends Component {

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				<SideNav />

				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Invites path={routes.INVITES}/>
					<Permissions path={routes.PERMISSIONS}/>
					
					<ProRequests path={routes.PRO_REQUESTS}/>
					<Withdrawals path={routes.WITHDRAWALS}/>

					<Transactions path={routes.TRANSACTIONS}/>
					<VariablesSettings path={routes.VARIABLES_SETTINGS}/>
					
					<ActiveUsers path= {routes.ACTIVE_USERS}/>
					<ArchivedUsers path= {routes.ARCHIVED_USERS}/>
					<IncompleteRegUsers path= {routes.INCOMPLETE_REGISTRATIONS}/>
				</Router>
			</div>
		);
	}
}
