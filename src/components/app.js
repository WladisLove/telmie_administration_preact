import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { Table, Checkbox, Button, Spin } from 'antd';

import Header from './header';
import SideNav from './side-nav'

import Home from '../routes/home';
import Invites from '../routes/invites';
import Calls from '../routes/calls';
import Permissions from '../routes/permissions';
import ProRequests from '../routes/pro-requests';
import Withdrawals from '../routes/withdrawals'
import Transactions from '../routes/transactions';
import ActiveUsers from '../routes/users-active';
import ArchivedUsers from '../routes/users-archived';
import IncompleteRegUsers from '../routes/users-incomplete-reg';
import VariablesSettings from '../routes/variables-settings'
import LogIn from '../routes/log-in'

import Redirect from '../components/redirect'

import { logIn, checkIfLoggedIn, clearSelectedUser } from '../store/actions/user'
import { unselectPending } from '../store/actions/pending'
import { getCookie } from '../helpers/cookie'

export const routes = {
	HOME: '/',
	PRO_REQUESTS: '/pro-requests',
	WITHDRAWALS: '/withdrawals',
	ACTIVE_USERS: '/users-active',
	ARCHIVED_USERS: '/users-archived',
	INCOMPLETE_REGISTRATIONS: '/users-incomplete',
	TRANSACTIONS : '/transactions',
	VARIABLES_SETTINGS: '/variables-settings',
	INVITES: '/invites',
	CALLS: '/calls',
	PERMISSIONS: '/permissions',
	LOGIN: '/log-in',
}


class App extends Component {

	componentDidMount(){
		let userAuth = getCookie('USER_AUTH');
		userAuth != null &&  this.props.logIn(userAuth);
	}

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		const isAuth = Object.keys(this.props.userData).length !== 0 || checkIfLoggedIn();
		
		return (
			<div id="app">
				<Header />
				{isAuth && <SideNav 
					isUserSelected = {this.props.isUserSelected} 
					isPendingSelected={this.props.isPendingSelected}
					unselectPending = {this.props.unselectPending}
					clearSelectedUser={this.props.clearSelectedUser}/>}

				<Router onChange={this.handleRoute}>
					<Home path={routes.HOME} />
					<Invites path={routes.INVITES}/>
					<Calls path={routes.CALLS}/>
					<Permissions path={routes.PERMISSIONS}/>
					
					<ProRequests path={routes.PRO_REQUESTS}/>
					<Withdrawals path={routes.WITHDRAWALS}/>

					<Transactions path={routes.TRANSACTIONS}/>
					<VariablesSettings path={routes.VARIABLES_SETTINGS}/>
					
					<ActiveUsers path= {routes.ACTIVE_USERS}/>
					<ArchivedUsers path= {routes.ARCHIVED_USERS}/>
					<IncompleteRegUsers path= {routes.INCOMPLETE_REGISTRATIONS}/>
					<LogIn path={routes.LOGIN}/>
				</Router>

				{!isAuth && <Redirect to={routes.LOGIN}/>}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	userData: state.loggedInUser,
	isUserSelected: !!state.selectedUser.selectedUser,
	isPendingSelected: state.pending.isPendingSelected,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	logIn,
	clearSelectedUser,
	unselectPending: () => dispatch(unselectPending()),
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);