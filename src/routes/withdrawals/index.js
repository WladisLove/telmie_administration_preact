import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import Card from '../../components/card';
import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';
import style from './style.css'

import { clearPendings, getWithdrawals, getWithdrawalDetails, approveWithdrawal, declineWithdrawal } from '../../store/actions/pending'

import { getCookie } from '../../helpers/cookie'
import { PAGE_SIZE } from '../../helpers/consts'
import { withdrawalsTableColumns as columns } from '../../helpers/table-data'

class Withdrawals extends Component{
	constructor(props){
		super(props);

		this.state = {
			sortedInfo: {},
		}
	}

	componentDidMount(){
		this.userAuth = this.props.userData.userAuth || getCookie('USER_AUTH');
		/*this.userAuth && (
			Object.keys(this.props.serverData).length || this.props.getCategories(this.userAuth)
		);*/
		this.userAuth && this.props.getWithdrawals(this.userAuth);
	};
	componentWillUnmount(){
		this.props.clearPendings();
	};

	onChange = (pagination, filters, sortedInfo) => {
		this.setState({ sortedInfo, });
	}

	wDetails = (id) => () => this.props.getWithdrawalDetails(id, this.userAuth);
	wApprove = (id) => () => this.props.approveWithdrawal(id, this.userAuth);
	wDecline = (id) => () => this.props.declineWithdrawal(id, this.userAuth);

	renderBtns = (text, record) => ([
		<button class={`${style.rowBtn} ${style.approveBtn}`} 
			onClick={this.wApprove(record.id)}>Approve</button>,
		<button class={`${style.rowBtn} ${style.declineBtn}`} 
			onClick={this.wDecline(record.id)}>Decline</button>,
		<button class={`${style.rowBtn}`} 
			onClick={this.wDetails(record.id)}>Ask for more info</button>
	]);	  

	render(){
		const {sortedInfo} =this.state;
		const {message = '', error: isError, load: isLoaded, withdrawals = []} = this.props.pending;

		console.log('isError', isError, 'message', message)

		return (
			<Card cardClass='route-content' headerText="Withdrawals">
				{
					isLoaded ? ([
							((isError || message) && <div class="errorContainer">
								<div class={isError ? "errorMsg" : "notifMsg"}>{isError && 'Error! '} {message}</div>
							</div>),
							<Table columns={columns(sortedInfo, this.renderBtns)} 
								rowKey={(record) => record.id}
								onChange={this.onChange} 
								pagination={{pageSize: PAGE_SIZE}}
								dataSource={withdrawals} />
					]) : (<div class="spinContainer"><Spin size='large'/></div>)
				}
			</Card>
		)
	}
};

const mapStateToProps = (state) => ({
	userData: state.loggedInUser,
	pending: state.pending,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	clearPendings,
	getWithdrawals,
	getWithdrawalDetails,
	approveWithdrawal,
	declineWithdrawal,
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Withdrawals);
