import { h, Component } from 'preact';
import Card from '../card'
import { Table, Spin } from 'antd';
import UserInfo from '../user-info';
import FilterArea from '../user-table-controls/filter-area'
import SearchArea from '../user-table-controls/search-area'
import 'antd/dist/antd.css';

import { PAGE_SIZE, statusArrs } from '../../helpers/consts'
import { countItemsByStatus } from '../../helpers'

const searchItemsArr= [{
	label: 'General:',
	name: 'general',
},{
	label: 'Date of birth:',
	name: 'dateOfBirth',
	isDate: true,
},]

class UsersRouteWrapper extends Component{
	constructor(props){
		super(props);

		this.state = {
			selected: false,

			isFiltered: false,
			filteredData: [],

			isSearched: false,
			searchedData: [],
			searchFields: {},

			totalMesSent: this.props.uArrays && this.props.uArrays.totalMesSent,

			usersByStatus: [],

			sortedInfo: {order: "descend", field: "id", columnKey: "id"},
			pagination: { pageSize: PAGE_SIZE }
		}
	}

	componentWillReceiveProps(nextProps){
		(this.props.withFilter 
			&& this.props.usersArr.length !== nextProps.usersArr.length 
			&& nextProps.usersArr.length !== 0)
				&& (
					this.setState({ 
						usersByStatus: countItemsByStatus(nextProps.usersArr, 'status'),
					}),
					nextProps.isAU && this.setState({ totalMesSent: nextProps.uArrays && nextProps.uArrays.totalMesSent })
				);
		
		(!nextProps.selectedUser.selectedUser && !!this.props.selectedUser.selectedUser)
			&& this.setState({ selected: false, });
	}

	onFilter = (statusFilter, generalLength) => {
		const {usersArr = []} = this.props;
		if (statusFilter.length === generalLength){
			this.setState({ 
				filteredData: [], 
				totalMesSent: this.props.isAU && this.props.uArrays && this.props.uArrays.totalMesSent, 
				isFiltered: false 
			});
			Object.keys(this.state.searchFields).length && this.onSearch({...this.state.searchFields});
		} else {
			let newData = usersArr.filter(el => statusFilter.indexOf(el.status) != -1 );
			this.setState({ 
				filteredData: newData, 
				totalMesSent: this.props.isAU && newData.reduce((prevVal, el) => prevVal + el.totalTextOutgoing, 0) , 
				isFiltered: true
			});
			Object.keys(this.state.searchFields).length && this.onSearch({...this.state.searchFields});
		}
	}

	onSearch = (searchFields) => {
		let usersArr = this.state.isFiltered ? [...this.state.filteredData] : [...this.props.usersArr];

		if (!Object.keys(searchFields).length){
			this.setState({ 
				searchedData: [], 
				totalMesSent: this.props.isAU && this.props.uArrays && this.props.uArrays.totalMesSent, 
				isSearched: false, 
				searchFields: {} 
			});
		} else {
			let newData = usersArr.filter(user => {
				const {name = '', lastName = '', email = '', pro,
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
			
			this.setState({ 
				searchedData: newData, 
				totalMesSent: this.props.isAU && newData.reduce((prevVal, el) => prevVal + el.totalTextOutgoing, 0) , 
				isSearched: true, 
				searchFields: {...searchFields} 
			});
		}
	}

	onRow = (record) => ({
		onClick: () => {
			this.setState({ selected: true, });
			this.props.chooseSelectedUser(record);
		},
	});

	onBackToList = () => {
		this.setState({ selected: false, });
		this.props.clearSelectedUser();
	};

	onChange = (pagination, filters, sorter) => {
		this.setState({ sortedInfo: sorter, pagination });
	}

	render(){
        const {isFiltered, filteredData, isSearched, searchedData, sortedInfo = {}, selected, usersByStatus} = this.state;
        const {
			accControlsFunc, serverData, isIndividual, isPending, isForDelete, selectedUser, columns, onEditUser, scroll = {}
		} = this.props;
        const {load : isLoaded = false, error : isError = false, message : errorMsg = '', totalMesSent} = this.props.uArrays;
		const {usersArr = [], withFilter = false} = this.props;
		
		const dataSource = isSearched ? 
			searchedData : isFiltered 
				? filteredData : usersArr;

		return (
			<Card cardClass='route-content route-user-table'>
				{isLoaded ? 
					!isError ? [
						<p style={{display: 'inline-block', marginRight: 30}}>Total number of users: {usersArr.length}</p>,
						this.props.isAU && <p style={{display: 'inline-block',}}>Total number of messages sent: {this.state.totalMesSent}</p>,
						withFilter && <FilterArea onFilter={this.onFilter} isShown={!!selected} usersByStatus={usersByStatus} statuses={statusArrs.users}/>,
						<SearchArea onSearch={this.onSearch} isShown={!!selected} searchItemsArr={searchItemsArr}/>,
						selected ? 
							<UserInfo selectedUser={selectedUser}
								serverData={serverData}
								backToList={this.onBackToList}
								isIndividual={isIndividual}
								isPending={isPending}
								isForDelete={isForDelete}
								accControlsFunc={accControlsFunc}
								editUserFunc={onEditUser}/>
								:
							<Table columns={columns(sortedInfo)} 
									rowKey={(record) => record.id} 
									onChange={this.onChange}
									onRow={this.onRow}
									pagination={this.state.pagination}
									dataSource={dataSource} 
									scroll={scroll}/>
					] : (
					<div class="errorContainer">
						Error! 
						<div class="errorMsg">{errorMsg}</div>
					</div>) 
					: (<div class='spinContainer'><Spin size='large'/></div>)}
			</Card>
		)
	}
	
};

export default UsersRouteWrapper;