import { h } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { logOff, checkIfLoggedIn } from '../../store/actions/user'

import style from './style';

const Header = (props) => (
	<header class={style.header}>
		<h1>Header</h1>
		{ (Object.keys(props.userData).length !== 0 
			|| checkIfLoggedIn()) && (
				<button class={style.logoutBtn} onClick={props.logOff}>Log out</button>
			) }
	</header>
);

const mapStateToProps = (state) => ({
    userData: state.loggedInUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	logOff
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
