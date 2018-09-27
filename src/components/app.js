import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import SideNav from './side-nav'

import Home from '../routes/home';
import Invites from '../routes/invites';
import Permissions from '../routes/permissions';
import Requests from '../routes/requests';
import Transactions from '../routes/transactions';
import Users from '../routes/users';
import ActiveUsers from '../routes/users-active';
import ArchivedUsers from '../routes/users-archived';
import IncompleteRegUsers from '../routes/users-incomplete-reg';

export const routes = {
	REQUESTS: '/requests',
	USERS: '/users',
	ACTIVE_USERS: '/users/active',
	ARCHIVED_USERS: '/users/archived',
	INCOMPLETE_REGISTRATIONS: '/users/incomplete',
	TRANSACTIONS : '/transactions',
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
					<Requests path={routes.REQUESTS}/>
					<Transactions path={routes.TRANSACTIONS}/>
					<Users path={routes.USERS}/>
					<ActiveUsers path= {routes.ACTIVE_USERS}/>
					<ArchivedUsers path= {routes.ARCHIVED_USERS}/>
					<IncompleteRegUsers path= {routes.INCOMPLETE_REGISTRATIONS}/>
				</Router>
			</div>
		);
	}
}
