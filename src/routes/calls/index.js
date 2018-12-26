import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import Card from '../../components/card'
import UserInfo from '../../components/user-info';
import SearchArea from '../../components/user-table-controls/search-area'
import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';

import { getCalls, clearCalls, 
	chooseSelectedUser, clearSelectedUser, 
	editUser, deleteUser,
	changeActiveUserStatus,	getUsActivities, getUsProsList,	getUsClients, getUsMoney, addFreeCredits, changeProStatus,
} from '../../store/actions/user'

import { getCookie } from '../../helpers/cookie'
import { callsColumns as columns } from '../../helpers/table-data'
import { PAGE_SIZE } from '../../helpers/consts'

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
			sortedInfo: {},
			searchFields: {},
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
	
	onSearch = (usersArr) => (searchFields, isReceived) => {
		
		if (!Object.keys(searchFields).length){
			this.setState({ searchedData: [], isSearched: false });
		} else {
			if((searchFields.startDate || searchFields.endDate) && !isReceived){
				this.props.getCalls(this.userAuth, 
					searchFields.startDate && new Date(searchFields.startDate).toISOString(), 
					searchFields.endDate && new Date(searchFields.endDate).toISOString());
				this.setState({ isSearched: true, searchFields: searchFields});
			} else {

				let newData = usersArr.filter(call => {
					const {consultantEmail = '', consultantFullName = '', consultantId = '',
						consultedEmail = '', consultedFullName = '', consultedId = '',
						startDate,
					} = call;
	
					const _date = new Date(startDate).getTime();
	
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
	
				this.setState({ searchedData: newData, isSearched: true, searchFields: searchFields});
			}
		}
	}

	componentWillReceiveProps(nextProps){
		const {calls = []} = nextProps.uArrays;
		(!this.props.uArrays.load  && nextProps.uArrays.load)
			&& Object.keys(this.state.searchFields).length && calls.length 
			&& this.onSearch([...calls])(this.state.searchFields, true)
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
		const {isSearched, searchedData, sortedInfo = {}, selected } = this.state;

		const {load : isLoaded = false, error : isError = false, message : errorMsg = '', calls = []} = this.props.uArrays;

		const dataSource = isSearched ? searchedData : calls;

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
				<SearchArea onSearch={this.onSearch([...calls])} isShown={!!selected} searchItemsArr={searchItemsArr}/>
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