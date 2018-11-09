import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import UsersRouteWrapper from '../../components/users-route-wrapper'


import { getCategories } from '../../store/actions/data'
import { getArchivedUsers, clearArchivedUsers, 
	chooseSelectedUser, clearSelectedUser, 
	restoreArchivedUser, getUsActivities, getUsClients, getUsProsList } from '../../store/actions/user'

import { getCookie } from '../../helpers/cookie'
import { tableColumns as columns } from '../../helpers/table-data'

class ArchivedUsers extends Component{
	
	componentDidMount(){
		this.userAuth = this.props.userData.userAuth || getCookie('USER_AUTH');
		this.userAuth && (
			Object.keys(this.props.serverData).length || this.props.getCategories(this.userAuth)
		);
		this.userAuth && this.props.getArchivedUsers(this.userAuth);
	};

	componentWillUnmount(){
		this.props.clearArchivedUsers();
		this.props.clearSelectedUser();
	}

	chooseSelectedUser = (user) => this.props.chooseSelectedUser(user, this.userAuth);

	render(){
		const {archivedUsers = []} = this.props.uArrays;

		const accControlsFunc = {
			restore: (id) => this.props.restoreArchivedUser(id, this.userAuth),
			getActivities: (id) => this.props.getUsActivities(id, this.userAuth),
			getProsList: (id) => this.props.getUsProsList(id, this.userAuth),
			getClients: (id) => this.props.getUsClients(id,this.userAuth),
		};


		return <UsersRouteWrapper 
			chooseSelectedUser={this.chooseSelectedUser}
			clearSelectedUser={this.props.clearSelectedUser}
			selectedUser={this.props.selectedUser}

			serverData={this.props.serverData}
			
			usersArr={archivedUsers}
			uArrays={this.props.uArrays}

			isIndividual={false}
			isForDelete={true}

			columns={columns}
			
			accControlsFunc={accControlsFunc}/>
	}
};

const mapStateToProps = (state) => ({
	userData: state.loggedInUser,
	uArrays: state.usersArrays,
	selectedUser: state.selectedUser,
	serverData: state.serverData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getArchivedUsers,
	clearArchivedUsers,
	chooseSelectedUser,
	clearSelectedUser,
	restoreArchivedUser,
	getCategories,
	getUsActivities,
	getUsClients,
	getUsProsList
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArchivedUsers);
