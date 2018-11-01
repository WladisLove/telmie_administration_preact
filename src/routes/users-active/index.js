import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import Card from '../../components/card'
import { Table, Spin } from 'antd';
import UserInfo from '../../components/user-info';
import FilterArea from '../../components/user-table-controls/filter-area'
import SearchArea from '../../components/user-table-controls/search-area'
import 'antd/dist/antd.css';
import style from './style'

import { getCategories } from '../../store/actions/data'
import { getActiveUsers, chooseSelectedUser, clearActiveUsers, clearSelectedUser, editUser, changeActiveUserStatus } from '../../store/actions/user'

import { getCookie } from '../../helpers/cookie'
import { PAGE_SIZE } from '../../helpers/consts'
import { tableColumns as columns } from '../../helpers/table-data'


class ActiveUsers extends Component{
	constructor(props){
		super(props);

		this.state = {
			isFiltered: false,
			filteredData: [],

			isSearched: false,
			searchedData: [],
			searchFields: {},

			selected: false,
		}
	}


	onFilter = (statusFilter, generalLength) => {
		const {activeUsers = []} = this.props;
		if (statusFilter.length === generalLength){
			this.setState({ filteredData: [], isFiltered: false });
			Object.keys(this.state.searchFields).length && this.onSearch({...this.state.searchFields});
		} else {
			let newData = activeUsers.filter(el => statusFilter.indexOf(el.status) != -1 );
			this.setState({ filteredData: newData, isFiltered: true });
			Object.keys(this.state.searchFields).length && this.onSearch({...this.state.searchFields});
		}
	}

	onSearch = (searchFields) => {
		let activeUsers = this.state.isFiltered ? [...this.state.filteredData] : [...this.props.activeUsers];

		if (!Object.keys(searchFields).length){
			this.setState({ searchedData: [], isSearched: false, searchFields: {} });
		} else {
			let newData = activeUsers.filter(user => {
				const {name = '', lastName = '', email = '', pro,
					mobile = "", 
					dateOfBirth = ""} = user;
				const { category = '', profession = '', professionDescription = '', subCategory = ''} = pro ? pro : {};
				
				if(searchFields.general)
					if ( (name ? !(name.toLowerCase().indexOf(searchFields.general) + 1) : true)
						&& (lastName ? !(lastName.toLowerCase().indexOf(searchFields.general) + 1) : true)
						&& (email ? !(email.toLowerCase().indexOf(searchFields.general) + 1) : true)
						&& (category ? !(category.toLowerCase().indexOf(searchFields.general) + 1) : true)
						&& (profession ? !(profession.toLowerCase().indexOf(searchFields.general) + 1) : true)
						&& (professionDescription ? !(professionDescription.toLowerCase().indexOf(searchFields.general) + 1) : true)
						&& (subCategory ? !(subCategory.toLowerCase().indexOf(searchFields.general) + 1) : true) ) return false;
				
				if(searchFields.mobile)
					if (mobile ? !(mobile.toLowerCase().indexOf(searchFields.mobile) + 1) : true ) return false;
				
				if(searchFields.dateOfBirth){
					let d = null, s_d = null;
					dateOfBirth && (
						d = new Date(dateOfBirth),
						s_d = new Date(searchFields.dateOfBirth)
					)
					if (dateOfBirth ? 
						!( d.getDate() === s_d.getDate() && d.getFullYear() === s_d.getFullYear() && d.getMonth() === s_d.getMonth() ) 
						: true ) return false;
				}

				return true;
			});
			
			this.setState({ searchedData: newData, isSearched: true, searchFields: {...searchFields} });
		}
	}

	onRow = (record) => ({
		onClick: () => {
			this.setState({ selected : true });
			this.props.chooseSelectedUser(record);
		},
	});

	onBackToList = () => {
		this.props.selectedUser.isEdited && 
			this.userAuth && this.props.getActiveUsers(this.userAuth);
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
		const {isFiltered, filteredData, isSearched, searchedData, selected} = this.state;
		const {isLoaded = false, isError = false, errorMsg = '', activeUsers = []} = this.props;

		const dataSource = isSearched ? 
			searchedData : isFiltered 
				? filteredData : activeUsers;
		
		const accControlsFunc = {
			changeStatus: (id) => this.props.changeActiveUserStatus(id, this.userAuth),
		};

		return (
			<Card cardClass='route-content'>
				{isLoaded ? 
					!isError ? [
						<FilterArea onFilter={this.onFilter} isShown={selected}/>,
						<SearchArea onSearch={this.onSearch} isShown={selected}/>,
						selected ? 
							<UserInfo selectedUser={this.props.selectedUser}
								serverData={this.props.serverData}
								backToList={this.onBackToList}
								isIndividual={false}
								isPending={false}
								accControlsFunc={accControlsFunc}
								editUserFunc={this.onEditUser}/>
								:
							<Table columns={columns} 
									rowKey={(record) => record.id} 
									onRow={this.onRow}
									pagination={{pageSize: PAGE_SIZE}}
									dataSource={dataSource} />
					] : (
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
	clearSelectedUser,
	chooseSelectedUser,
	editUser,
	changeActiveUserStatus,
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ActiveUsers);