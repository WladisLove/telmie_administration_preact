import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import Card from '../../components/card'
import { Table, Checkbox, Button, Spin } from 'antd';
import UserInfo from '../../components/user-info'
import 'antd/dist/antd.css';
import style from './style'

import { getCategories } from '../../store/actions/data'
import { getActiveUsers, clearActiveUsers, getSelectedUser, clearSelectedUser, editUser } from '../../store/actions/user'

import { getCookie } from '../../helpers/cookie'
import { PAGE_SIZE } from '../../helpers/consts'
import { tableColumns as columns } from '../../helpers/table-data'


const statusArr = [{
	name: 'Registered',
}, {
	name: 'Suspended',
}, {
	name: 'Started Pro Appl',
}, {
	name: 'Pending Approval',
}, {
	name: 'Approved as Pro',
}, {
	name: 'Suspended as Pro',
}];

const getDefaultStatuses = () => statusArr.map(el => el.name);


class ActiveUsers extends Component{
	constructor(props){
		super(props);

		this.state = {
			statusFilter: getDefaultStatuses() || [],
			isFiltered: false,
			filteredData: [],

			selected: false,
		}
	}

	onChange = (checkedValues) => this.setState({statusFilter: [...checkedValues]});

	onFilter = () => {
		/*const {data = [], statusFilter} = this.state;
		if (statusFilter.length === statusArr.length){
			this.setState({ filteredData: [], isFiltered: false });
		} else {
			let newData = data.filter(el => statusFilter.indexOf(el.status) != -1 );
			this.setState({ filteredData: newData, isFiltered: true });
		}*/
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
		const {statusFilter, isFiltered, filteredData, selected} = this.state;
		const {isLoaded = false, isError = false, errorMsg = '', activeUsers = []} = this.props;
		const {selectedUser = null, error: isUserError, message : errorMessage} = this.props.selectedUser;

		const dataSource = /*isFiltered ? filteredData :*/ activeUsers;

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
								/*(<div class={style.filterGroup}>
									<div class={style.filterGroupLabel}> Status filter: </div>
									
									<Checkbox.Group onChange={this.onChange} value={statusFilter}	>
										{statusArr.map(({name}) => (<Checkbox className={statusFilter.indexOf(name) != -1 && style.checked} 
																						key={name} value={name}>{name}</Checkbox>))}
									</Checkbox.Group>
									
									<Button size='small' onClick={this.onFilter} className={style.filterBtn}>Filter</Button>
								</div>) ,*/
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