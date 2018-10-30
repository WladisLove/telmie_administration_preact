import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import Card from '../../components/card'
import { Table, Spin } from 'antd';
import UserInfo from '../../components/user-info';
import FilterArea from '../../components/user-table-controls/filter-area'
import 'antd/dist/antd.css';
import style from './style'

import { getCategories } from '../../store/actions/data'
import { getActiveUsers, clearActiveUsers, getSelectedUser, clearSelectedUser, editUser } from '../../store/actions/user'

import { getCookie } from '../../helpers/cookie'
import { PAGE_SIZE } from '../../helpers/consts'
import { tableColumns as columns } from '../../helpers/table-data'


class ActiveUsers extends Component{
	constructor(props){
		super(props);

		this.state = {
			isFiltered: false,
			filteredData: [],

			selected: false,
		}
	}


	onFilter = (statusFilter, generalLength) => {
		const {activeUsers = []} = this.props;
		if (statusFilter.length === generalLength){
			this.setState({ filteredData: [], isFiltered: false });
		} else {
			let newData = activeUsers.filter(el => statusFilter.indexOf(el.status) != -1 );
			this.setState({ filteredData: newData, isFiltered: true });
		}
	}

	onSearch = () => {
		
	}

	onRow = (record) => ({
		onClick: () => {
			this.setState({ selected : true });
			this.props.getSelectedUser(record.id, this.userAuth);
		},
	});

	onBackToList = () => {
		this.props.clearSelectedUser();
		this.setState({ selected: false });
	};

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

	onEditUser = (newData) => {
		this.props.editUser(newData, newData.id, this.userAuth);
	}

	render(){
		const {isFiltered, filteredData, selected} = this.state;
		const {isLoaded = false, isError = false, errorMsg = '', activeUsers = []} = this.props;
		const {selectedUser = null, error: isUserError, message : errorMessage} = this.props.selectedUser;

		const dataSource = isFiltered ? filteredData : activeUsers;

		return (
			<Card cardClass='route-content'>
				{isLoaded ? 
					!isError ? (
						selected ? 
							<UserInfo user={selectedUser}
								isError={isUserError}
								errorMessage={errorMessage}
								serverData={this.props.serverData}
								backToList={this.onBackToList}
								isIndividual={false}
								isPending={false}
								editUserFunc={this.onEditUser}/>
								:
							[
								(<FilterArea onFilter={this.onFilter}/>) ,
								(<Table columns={columns} 
									rowKey={(record) => record.id} 
									onRow={this.onRow}
									pagination={{pageSize: PAGE_SIZE}}
									dataSource={dataSource} />)
							]
					) : (
					<div class="errorContainer">
						Error! 
						<div class="errorMsg">{errorMsg}</div>
					</div>) 
					: (<div class='spinContainer'><Spin size='large'/></div>)}
					{/*
						
													
						*/}
				
			</Card>
		)
	}
	
};

const mapStateToProps = (state) => ({
	userData: state.loggedInUser,
	serverData: state.serverData,
	activeUsers: state.usersArrays.activeUsers,
	isLoaded: state.usersArrays.load,
	isError: state.usersArrays.error,
	errorMsg: state.usersArrays.message,
	selectedUser: state.selectedUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getCategories,
	getActiveUsers,
	clearActiveUsers,
	getSelectedUser,
	clearSelectedUser,
	editUser,
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ActiveUsers);