import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import Card from '../../components/card'
import FilterArea from '../../components/user-table-controls/filter-area'
import SearchArea from '../../components/user-table-controls/search-area'
import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';

import { getTransactions, clearTransactions, } from '../../store/actions/user'

import { getCookie } from '../../helpers/cookie'
import { transactionsColumns as columns } from '../../helpers/table-data'
import { PAGE_SIZE, statusArrs } from '../../helpers/consts'
import { countItemsByStatus } from '../../helpers'

const searchItemsArr = [{
	label: 'User info:',
	name: 'userGeneral',
},{
	label: 'Date interval:',
	name: 'startDate',
	isDate: true,
},{
	label: '-',
	name: 'endDate',
	isDate: true,
},]

class Transactions extends Component{
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
			trByStatus: [],
		}
	}

	componentDidMount(){
		this.userAuth = this.props.userData.userAuth || getCookie('USER_AUTH');
		this.userAuth && this.props.getTransactions(this.userAuth);
	};

	componentWillUnmount(){
		this.props.clearTransactions();
	}

	onChange = (pagination, filters, sorter) => {
		this.setState({ sortedInfo: sorter, });
	}

	onFilter = (statusFilter, generalLength, isReceived, _tr = []) => {
		const { transactions = [] } = this.props.uArrays;
		const tr = _tr.length ? _tr : transactions;
		if (statusFilter.length === generalLength){
			this.setState({ 
				filteredData: [], 
				statusFilter: [],
				isFiltered: false 
			});
			Object.keys(this.state.searchFields).length && this.onSearch({...this.state.searchFields}, isReceived, _tr);
		} else {
			let newData = tr.filter(el => statusFilter.indexOf(el.transactionType) != -1 );
			this.setState({ 
				filteredData: newData, 
				statusFilter,
				isFiltered: true
			});
			Object.keys(this.state.searchFields).length && this.onSearch({...this.state.searchFields}, isReceived, newData);
		}
	}
	
	onSearch = (searchFields, isReceived, _trArr = []) => {
		const { transactions = [] } = this.props.uArrays;
		const trArr = _trArr.length ? 
			_trArr : this.state.isFiltered ? 
				[...this.state.filteredData] : [...transactions];

		if (!Object.keys(searchFields).length){
			this.setState({ searchedData: [], isSearched: false });
		} else {
			if((searchFields.startDate || searchFields.endDate) && !isReceived){
				this.props.getTransactions(this.userAuth, 
					searchFields.startDate && new Date(searchFields.startDate).toISOString(), 
					searchFields.endDate && new Date(searchFields.endDate).toISOString());
				this.setState({ isSearched: true, searchFields: { ...searchFields } });
			} else {
				let newData = trArr.filter(transaction => {
					const {userEmail = '', userFullName = '', userId = '', } = transaction;
		
					if(searchFields.userGeneral){
						if(
							(userEmail.toLowerCase().indexOf(searchFields.userGeneral) + 1)
							|| (userFullName.toLowerCase().indexOf(searchFields.userGeneral) + 1)
							|| (userId.toString().indexOf(searchFields.userGeneral) + 1)
						) return true;
						else return false;
					}
	
					return true;
				})
	
				this.setState({ searchedData: newData, isSearched: true, searchFields: { ...searchFields } });
			}
		}
	}

	componentWillReceiveProps(nextProps){
		const {transactions = []} = nextProps.uArrays;
		const { transactions: prev_transactions = []} = this.props.uArrays;

		(prev_transactions.length !== transactions.length 
			&& transactions.length !== 0)
			&& this.setState({ 
				trByStatus: countItemsByStatus(transactions, 'transactionType'),
			});
		
		(!this.props.uArrays.load  && nextProps.uArrays.load && transactions.length )
			&& this.state.isFiltered ? 
				this.onFilter(this.state.statusFilter, statusArrs.transactions.length, true, [...transactions])
				: this.state.isSearched && this.onSearch(this.state.searchFields, true, [...transactions]);
	}

	render(){
		const {isSearched, searchedData, isFiltered, filteredData, 
			sortedInfo = {}, trByStatus } = this.state;

		const {load : isLoaded = false, error : isError = false, message : errorMsg = '', transactions = []} = this.props.uArrays;

		const dataSource = isSearched ? 
			searchedData : isFiltered 
				? filteredData : transactions;

		return (
			<Card cardClass='route-content'>
				<p>Total number of transactions: {transactions.length}</p>
				<p style={{marginBottom: 5}}>Transaction types:</p>
				<ul class='typesDescription'>
					<li><span>SYS_CHARGE</span>		Charge from customers credit card (captured money from customer for call (calls))</li>
					<li><span>CALL_PAY_USER</span>		payment from CUSTOMER for call	</li>
					<li><span>CALL_PAY_PRO</span>		payment to PRO for call	</li>
					<li><span>PAYOUT</span>		PRO payout request from Stripe account to bank account	</li>
					<li><span>ADD_CARD</span>		Bonus for card added	</li>
					<li><span>ADD_FRIEND</span>		Bonus for invitation friend	</li>
					<li><span>ADD_PRO</span>		Bonus for invitation pro	</li>
					<li><span>SYSTEM_BONUS</span>		Bonus from system by administrator	</li>
					<li><span>REGISTRATION</span>		Bonus for registration	</li>
				</ul>
				<FilterArea onFilter={this.onFilter} usersByStatus={trByStatus} statuses={statusArrs.transactions}/>
				<SearchArea onSearch={this.onSearch} searchItemsArr={searchItemsArr}/>
				{isLoaded ? 
					!isError ? [
						<Table columns={columns(sortedInfo)} 
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getTransactions,
	clearTransactions,
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Transactions);
