import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import UsersRouteWrapper from '../../components/users-route-wrapper'
import 'antd/dist/antd.css';


import { getCategories } from '../../store/actions/data'
import { getArchivedUsers, clearArchivedUsers, 
	chooseSelectedUser, clearSelectedUser, 
	restoreArchivedUser, getArchivedUsActivities, getArchivedUsProsList, getActiveUsClients } from '../../store/actions/user'

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

	render(){
		const {archivedUsers = []} = this.props.uArrays;

		const accControlsFunc = {
			restore: (id) => this.props.restoreArchivedUser(id, this.userAuth),
			getActivities: (id) => this.props.getArchivedUsActivities(id, this.userAuth),
			getProsList: (id) => this.props.getArchivedUsProsList(id, this.userAuth),
			getClients: (id) => this.props.getActiveUsClients(id,this.userAuth),
		};


		return <UsersRouteWrapper 
			chooseSelectedUser={this.props.chooseSelectedUser}
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
	getArchivedUsActivities,
	getArchivedUsProsList,
	getActiveUsClients,
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ArchivedUsers);
