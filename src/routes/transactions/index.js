import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import Card from '../../components/card'
import SearchArea from '../../components/user-table-controls/search-area'
import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';

import { getTransactions, clearTransactions, } from '../../store/actions/user'

import { getCookie } from '../../helpers/cookie'
import { transactionsColumns as columns } from '../../helpers/table-data'
import { PAGE_SIZE } from '../../helpers/consts'

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
			sortedInfo: {},
			searchFields: {},
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
	
	onSearch = (usersArr) => (searchFields, isReceived) => {

		if (!Object.keys(searchFields).length){
			this.setState({ searchedData: [], isSearched: false });
		} else {
			if((searchFields.startDate || searchFields.endDate) && !isReceived){
				this.props.getTransactions(this.userAuth, 
					searchFields.startDate && new Date(searchFields.startDate).toISOString(), 
					searchFields.endDate && new Date(searchFields.endDate).toISOString());
				this.setState({ isSearched: true, searchFields: searchFields});
			} else {

				let newData = usersArr.filter(transaction => {
					const {userEmail = '', userFullName = '', userId = '',
						date,
					} = transaction;
	
					const _date = new Date(date).getTime();
	
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
	
				this.setState({ searchedData: newData, isSearched: true, searchFields: searchFields });
			}
		}
	}

	componentWillReceiveProps(nextProps){
		const {transactions = []} = nextProps.uArrays;
		(!this.props.uArrays.load  && nextProps.uArrays.load)
			&& Object.keys(this.state.searchFields).length && transactions.length 
			&& this.onSearch([...transactions])(this.state.searchFields, true)
	}

	render(){
		const {isSearched, searchedData, sortedInfo = {} } = this.state;

		const {load : isLoaded = false, error : isError = false, message : errorMsg = '', transactions = []} = this.props.uArrays;

		const dataSource = isSearched ? searchedData : transactions;

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
				<SearchArea onSearch={this.onSearch([...transactions])} searchItemsArr={searchItemsArr}/>,
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
