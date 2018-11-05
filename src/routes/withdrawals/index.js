import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import Card from '../../components/card';
import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';
import style from './style.css'

import { clearPendings, getWithdrawals } from '../../store/actions/pending'


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

	renderBtns = (text, record) => ([
		<button class={`${style.rowBtn} ${style.approveBtn}`}>Approve</button>,
		<button class={`${style.rowBtn} ${style.declineBtn}`}>Decline</button>,
		<button class={`${style.rowBtn}`}>Ask for more info</button>
	]);	  

	render(){
		const {sortedInfo} =this.state;
		const {message = '', error: isError, load: isLoaded, withdrawals = []} = this.props.pending;

		return (
			<Card cardClass='route-content' headerText="Withdrawals">
				{
					isLoaded ? (
						!isError ? (
							<Table columns={columns(sortedInfo, this.renderBtns)} 
								rowKey={(record) => record.id}
								onChange={this.onChange} 
								pagination={{pageSize: PAGE_SIZE}}
								dataSource={withdrawals} />
						) : (
							<div class="errorContainer">
								Error! 
								<div class="errorMsg">{message}</div>
							</div>
						)
					) : (<div class="spinContainer"><Spin size='large'/></div>)
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
	getWithdrawals
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Withdrawals);
