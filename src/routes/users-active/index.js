import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import UsersRouteWrapper from '../../components/users-route-wrapper'

import 'antd/dist/antd.css';
import style from './style'

import { getCategories } from '../../store/actions/data'
import { getActiveUsers, clearActiveUsers, 
	chooseSelectedUser, clearSelectedUser, editUser, deleteUser,
	changeActiveUserStatus, getUsActivities, getUsProsList, getUsClients, getUsMoney, addFreeCredits } from '../../store/actions/user'

import { getCookie } from '../../helpers/cookie'
import { tableColumns as columns } from '../../helpers/table-data'


class ActiveUsers extends Component{
	

	componentDidMount(){
		this.userAuth = this.props.userData.userAuth || getCookie('USER_AUTH');
		this.userAuth && (
			Object.keys(this.props.serverData).length || this.props.getCategories(this.userAuth)
		);
		this.userAuth && this.props.getActiveUsers(this.userAuth);
	};

	componentWillUnmount(){
		this.props.clearActiveUsers();
		this.props.clearSelectedUser();
	}

	onEditUser = (newData) => this.props.editUser(newData, newData.id, this.userAuth);
	chooseSelectedUser = (user) => this.props.chooseSelectedUser(user, this.userAuth);

	render() {
		const {activeUsers = []} = this.props.uArrays;
		const accControlsFunc = {
			changeStatus: (id, value) => this.props.changeActiveUserStatus(id, value, this.userAuth),
			getActivities: (id) => this.props.getUsActivities(id, this.userAuth),
			getProsList: (id) => this.props.getUsProsList(id, this.userAuth),
			getClients: (id) => this.props.getUsClients(id,this.userAuth),
			getUsMoney: (id, page, size) => this.props.getUsMoney(id, page, size, this.userAuth),
			addFreeCredits: (amount, id) => this.props.addFreeCredits(amount, id, this.userAuth),
			deleteUser: (id) => this.props.deleteUser(id, true, this.userAuth),
		};

		return <UsersRouteWrapper 
			chooseSelectedUser={this.chooseSelectedUser}
			clearSelectedUser={this.props.clearSelectedUser}
			selectedUser={this.props.selectedUser}

			serverData={this.props.serverData}
			
			usersArr={activeUsers}
			uArrays={this.props.uArrays}

			isIndividual={false}

			columns={columns}
			withFilter = {true}

			onEditUser={this.onEditUser}
			accControlsFunc={accControlsFunc}/>
	}
	
};

const mapStateToProps = (state) => ({
	userData: state.loggedInUser,
	serverData: state.serverData,
	uArrays: state.usersArrays,
	selectedUser: state.selectedUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getCategories,
	getActiveUsers,
	clearActiveUsers,
	clearSelectedUser,
	chooseSelectedUser,
	editUser,
	changeActiveUserStatus,
	getUsActivities,
	getUsProsList,
	getUsClients,
	getUsMoney,
	addFreeCredits,
	deleteUser,
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ActiveUsers);