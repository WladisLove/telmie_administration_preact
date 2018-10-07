import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

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
import LogIn from '../routes/log-in'

import Redirect from '../components/redirect'

import { logIn, checkIfLoggedIn } from '../store/actions/user'

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
	PERMISSIONS: '/permissions',
	LOGIN: '/log-in',
}

const getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
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
				{isAuth && <SideNav />}

				<Router onChange={this.handleRoute}>
					<Home path={routes.HOME} />
					<Invites path={routes.INVITES}/>
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
	logIn
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);