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
	
	onSearch = (searchFields) => {
		let usersArr = [...this.props.uArrays.transactions];

		if (!Object.keys(searchFields).length){
			this.setState({ searchedData: [], isSearched: false });
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

				if(searchFields.startDate && searchFields.startDate){
					if(
						_date <= (new Date(searchFields.endDate).getTime())
							&& _date >= (new Date(searchFields.startDate).getTime())
					) return true;
					else return false;
				} else if (searchFields.startDate) {
					if(
						_date >= (new Date(searchFields.startDate).getTime())
					) return true;
					else return false;
				} else if (searchFields.endDate){
					if(
						_date <= (new Date(searchFields.endDate).getTime())
					) return true;
					else return false;
				}

				return true;
			})

			this.setState({ searchedData: newData, isSearched: true, });
		}
	}

	render(){
		const {isSearched, searchedData, sortedInfo = {} } = this.state;

		const {load : isLoaded = false, error : isError = false, message : errorMsg = '', transactions = []} = this.props.uArrays;

		const dataSource = isSearched ? searchedData : transactions;

		return (
			<Card cardClass='route-content'>
				<p>Total number of transactions: {transactions.length}</p>
				{isLoaded ? 
					!isError ? [
						<SearchArea onSearch={this.onSearch} searchItemsArr={searchItemsArr}/>,
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
