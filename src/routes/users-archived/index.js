import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import Card from '../../components/card'
import { Table, Spin } from 'antd';
/*import UserInfo from '../../components/user-info';
import FilterArea from '../../components/user-table-controls/filter-area'
import SearchArea from '../../components/user-table-controls/search-area'*/
import 'antd/dist/antd.css';
/*import style from './style'

import { getCategories } from '../../store/actions/data'*/
//import { getActiveUsers, chooseSelectedUser, clearActiveUsers, clearSelectedUser, editUser, changeActiveUserStatus } from '../../store/actions/user'
import { getArchivedUsers, clearArchivedUsers, clearSelectedUser } from '../../store/actions/user'

import { getCookie } from '../../helpers/cookie'
/*import { PAGE_SIZE } from '../../helpers/consts'
import { tableColumns as columns } from '../../helpers/table-data'*/

class ArchivedUsers extends Component{
	
	componentDidMount(){
		this.userAuth = this.props.userData.userAuth || getCookie('USER_AUTH');
		/*this.userAuth && (
			Object.keys(this.props.serverData).length || this.props.getCategories(this.userAuth)
		);*/
		this.userAuth && this.props.getArchivedUsers(this.userAuth);
	};

	componentWillUnmount(){
		this.props.clearArchivedUsers();
		this.props.clearSelectedUser();
	}

	render(){

		const {load : isLoaded = false, error : isError = false, message : errorMsg = '', archivedUsers = []} = this.props.uArrays;

		return (
			<Card cardClass='route-content'>
			
						<div class='route-content'>
							<h1>ArchivedUsers</h1>
							<p>This is the ArchivedUsers component.</p>
						</div>
					
			</Card>
		)
	}
};

const mapStateToProps = (state) => ({
	userData: state.loggedInUser,
	uArrays: state.usersArrays,
	/*
	serverData: state.serverData,
	activeUsers: state.usersArrays.activeUsers,
	isLoaded: state.usersArrays.load,
	isError: state.usersArrays.error,
	errorMsg: state.usersArrays.message,
	selectedUser: state.selectedUser,*/
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getArchivedUsers,
	clearArchivedUsers,
	clearSelectedUser,
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArchivedUsers);
