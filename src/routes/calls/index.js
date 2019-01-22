import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import Card from '../../components/card'
import UserInfo from '../../components/user-info';
import SearchArea from '../../components/user-table-controls/search-area'
import FilterArea from '../../components/user-table-controls/filter-area'
import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';

import { getCalls, clearCalls, 
	chooseSelectedUser, clearSelectedUser, 
	editUser, deleteUser,
	changeActiveUserStatus,	getUsActivities, getUsProsList,	getUsClients, getUsMoney, addFreeCredits, changeProStatus,
} from '../../store/actions/user'

import { getCookie } from '../../helpers/cookie'
import { callsColumns as columns } from '../../helpers/table-data'
import { PAGE_SIZE, statusArrs } from '../../helpers/consts'

const searchItemsArr = [{
	label: 'Pro info:',
	name: 'proGeneral',
},{
	label: 'Client info:',
	name: 'clGeneral',
},{
	label: 'Date interval:',
	name: 'startDate',
	isDate: true,
},{
	label: '-',
	name: 'endDate',
	isDate: true,
},]

class Invites extends Component{
	constructor(props){
		super(props);

		this.state= {
			isFiltered: false,
			filteredData: [],
			statusFilter: [],

			isSearched: false,
			searchedData: [],
			searchFields: {},

			sortedInfo: {},
			callsByStatus: [],
		}
	}

	componentDidMount(){
		this.userAuth = this.props.userData.userAuth || getCookie('USER_AUTH');
		this.userAuth && this.props.getCalls(this.userAuth);
	};

	componentWillUnmount(){
		this.props.clearCalls();
	}

	onChange = (pagination, filters, sorter) => {
		this.setState({ sortedInfo: sorter, });
	}

	countCallsByStatus = (calls) => {
		let callsByStatus = calls.reduce((acc, call) => {
			let stat = call.status;
			acc[stat] = (acc[stat] || 0) + 1;
			return acc;
		}, {});
		this.setState({ callsByStatus });
	}

	onFilter = (statusFilter, generalLength, isReceived, _calls = []) => {
		const { calls = [] } = this.props.uArrays;
		const cl = _calls.length ? _calls : calls;
		if (statusFilter.length === generalLength){
			this.setState({ 
				filteredData: [], 
				statusFilter: [],
				isFiltered: false 
			});
			Object.keys(this.state.searchFields).length && this.onSearch({...this.state.searchFields}, isReceived, _calls);
		} else {
			let newData = cl.filter(el => statusFilter.indexOf(el.status) != -1 );
			this.setState({ 
				filteredData: newData, 
				statusFilter,
				isFiltered: true
			});
			Object.keys(this.state.searchFields).length && this.onSearch({...this.state.searchFields}, isReceived, newData);
		}
	}
	
	onSearch = (searchFields, isReceived, _clArr = []) => {
		const { calls = [] } = this.props.uArrays;
		const clArr = _clArr.length ? 
			_clArr : this.state.isFiltered ? 
				[...this.state.filteredData] : [...calls];
		
		if (!Object.keys(searchFields).length){
			this.setState({ searchedData: [], isSearched: false });
		} else {
			if((searchFields.startDate || searchFields.endDate) && !isReceived){
				this.props.getCalls(this.userAuth, 
					searchFields.startDate && new Date(searchFields.startDate).toISOString(), 
					searchFields.endDate && new Date(searchFields.endDate).toISOString());
				this.setState({ isSearched: true, searchFields: { ...searchFields } });
			} else {

				let newData = clArr.filter(call => {
					const {consultantEmail = '', consultantFullName = '', consultantId = '',
						consultedEmail = '', consultedFullName = '', consultedId = '',
						startDate,
					} = call;
		
					if(searchFields.proGeneral){
						if(
							(consultantEmail.toLowerCase().indexOf(searchFields.proGeneral) + 1)
							|| (consultantFullName.toLowerCase().indexOf(searchFields.proGeneral) + 1)
							|| (consultantId.toString().indexOf(searchFields.proGeneral) + 1)
						) return true;
						else return false;
					}
	
					if(searchFields.clGeneral){
						if(
							(consultedEmail.toLowerCase().indexOf(searchFields.clGeneral) + 1)
							|| (consultedFullName.toLowerCase().indexOf(searchFields.clGeneral) + 1)
							|| (consultedId.toString().indexOf(searchFields.clGeneral) + 1)
						) return true;
						else return false;
					}
	
					return true;
				})
	
				this.setState({ searchedData: newData, isSearched: true, searchFields: { ...searchFields}});
			}
		}
	}

	componentWillReceiveProps(nextProps){
		const { calls = []} = nextProps.uArrays;
		const { calls: prev_calls = []} = this.props.uArrays;

		(prev_calls.length !== calls.length && calls.length !== 0)
			&& this.countCallsByStatus(calls);

		(!this.props.uArrays.load  && nextProps.uArrays.load && calls.length)
			&& this.state.isFiltered ? 
				this.onFilter(this.state.statusFilter, statusArrs.calls.length, true, [...calls])
				: this.state.isSearched && this.onSearch(this.state.searchFields, true, [...calls]);
	}

	onUserSelect = (id) => () => {
		this.setState({ selected: true, });
		this.props.chooseSelectedUser({id}, this.userAuth);
	}
	onBackToList = () => {
		this.setState({ selected: false, });
		this.props.clearSelectedUser();
	};

	accControlsFunc = {
		changeStatus: (id, value) => this.props.changeActiveUserStatus(id, value, this.userAuth, false),
		changeProStatus: (id, value) => this.props.changeProStatus(id, value, this.userAuth, false),
		getActivities: (id) => this.props.getUsActivities(id, this.userAuth),
		getProsList: (id) => this.props.getUsProsList(id, this.userAuth),
		getClients: (id) => this.props.getUsClients(id,this.userAuth),
		getUsMoney: (id, page, size) => this.props.getUsMoney(id, page, size, this.userAuth),
		addFreeCredits: (amount, id) => this.props.addFreeCredits(amount, id, this.userAuth),
		deleteUser: (id) => this.props.deleteUser(id, true, this.userAuth, false),
	};
	onEditUser = (newData) => this.props.editUser(newData, newData.id, this.userAuth, false);

	render(){
		const {isSearched, searchedData, isFiltered, filteredData, 
			sortedInfo = {}, selected, callsByStatus } = this.state;

		const {load : isLoaded = false, error : isError = false, message : errorMsg = '', calls = []} = this.props.uArrays;

		const dataSource = isSearched ? 
			searchedData : isFiltered 
				? filteredData : calls;
		
		return (
			<Card cardClass='route-content'>
				<p>Total number of calls: {calls.length}</p>
				<div style={selected && {display: 'none'}}>
					<p style={{marginBottom: 5}}>Calls types:</p>
					<ul class='typesDescription'>
						<li><span>ACTIVE</span>		call, which active now</li>
						<li><span>FAILED</span>		call, which not started (no answer or drop)</li>		
						<li><span>SUCCEED</span>		call, which successfully ended</li>
						<li><span>BREAK	</span>	call, which was broken because customer don't have enought money</li>
						<li><span>DISCONNECTED</span>		call drop because one of the participants was disconnected</li>	
						<li><span>BROKEN</span>		hung call (if call has active status duration and amount = 0 but start date was 8 hours ago)</li>
					</ul>
				</div>
				<FilterArea onFilter={this.onFilter} isShown={!!selected} usersByStatus={callsByStatus} statuses={statusArrs.calls}/>
				<SearchArea onSearch={this.onSearch} isShown={!!selected} searchItemsArr={searchItemsArr}/>
				{isLoaded ? 
					!isError ? [
						selected ?
						<UserInfo selectedUser={this.props.selectedUser}
								/*serverData={serverData}*/
								backToList={this.onBackToList}
								accControlsFunc={this.accControlsFunc}
								isIndividual={false}
								editUserFunc={this.onEditUser}/>
								:
						<Table columns={columns(sortedInfo, this.onUserSelect)} 
							rowKey={(record) => record.id} 
							onChange={this.onChange}
							pagination={{pageSize: PAGE_SIZE}}
							dataSource={dataSource} />
					] : (
					<div class="errorContainer">
						Error! 
						<div class="errorMsg">{errorMsg}</div>
					</div>) 
					: (<div class='spinContainer'><Spin size='large'/></div>)}
			</Card>
		);
	}
} 

const mapStateToProps = (state) => ({
	userData: state.loggedInUser,
	uArrays: state.usersArrays,
	selectedUser: state.selectedUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getCalls,
	clearCalls,
	chooseSelectedUser,
	clearSelectedUser, 
	editUser,

	changeActiveUserStatus,
	getUsActivities,
	getUsProsList,
	getUsClients,
	getUsMoney,
	addFreeCredits,
	deleteUser,
	changeProStatus,
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Invites);