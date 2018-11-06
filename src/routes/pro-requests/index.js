import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import Card from '../../components/card';
import UserInfo from '../../components/user-info';
import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';

import { getCategories } from '../../store/actions/data'
import { getPendings, clearPendings, activateUser, clearActivateUserStatus,
	selectPending, unselectPending } from '../../store/actions/pending'

import { getCookie } from '../../helpers/cookie'
import { PAGE_SIZE } from '../../helpers/consts'
import { pendingTableColumns as columns } from '../../helpers/table-data'

class Requests extends Component{
	constructor(props){
		super(props);

		this.state = {
			selected: false,
			selectedUser: null,

			sortedInfo: {order: "descend", field: "id", columnKey: "id"},
			pagination: { pageSize: PAGE_SIZE },
		}
	}

	componentDidMount(){
		this.userAuth = this.props.userData.userAuth || getCookie('USER_AUTH');
		this.userAuth && (
			Object.keys(this.props.serverData).length || this.props.getCategories(this.userAuth)
		);
		this.userAuth && this.props.getPendings(this.userAuth);
	};
	componentWillUnmount(){
		this.props.clearPendings();
	};

	onRow = (record) => ({
		onClick: () => {
			this.props.selectPending();
			this.setState({ selectedUser: record});
		},
	});
	onBackToList = () => {
		this.props.unselectPending();
		this.setState({ selectedUser: null });
	};
	onChange = (pagination, filters, sorter) => {
		this.setState({ sortedInfo: sorter, pagination });
	}

	render(){
		const {message = '', error: isError, load: isLoaded, pendings = [], isPendingSelected} = this.props.pending;
		const { selectedUser, sortedInfo, pagination} = this.state;
		const userAuth = this.userAuth;
		const pendingControlsFunc = {
			activate: (id) => this.props.activateUserFunc(id, userAuth),
			clearStatus: this.props.clearActivateUserStatus,
		}
		return (
			<Card cardClass='route-content' headerText="Pro applications">
				{isLoaded ? (
					!isError ? (
						isPendingSelected ? (
							<UserInfo user={selectedUser}
								serverData={this.props.serverData}
								backToList={this.onBackToList}
								isIndividual={false}
								isPending={true}
								pendingControlsFunc={pendingControlsFunc}
								activateUser={this.props.activateUser}/>
						) : (
							<Table columns={columns(sortedInfo)} 
								rowKey={(record) => record.owner.id}
								onChange={this.onChange} 
								onRow={this.onRow}
								pagination={pagination}
								dataSource={pendings} />
						)
					) : (
						<div class="errorContainer">
							Error! 
							<div class="errorMsg">{message}</div>
						</div>
					)
				) : (<div class="spinContainer"><Spin size='large'/></div>)}
			</Card>
		)
	}
};

const mapStateToProps = (state) => ({
	userData: state.loggedInUser,
	serverData: state.serverData,
	pending: state.pending,
	activateUser: state.activateUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getCategories,
	getPendings,
	clearPendings,
	activateUserFunc: activateUser,
	clearActivateUserStatus,
	selectPending: () => dispatch(selectPending()),
	unselectPending: () => dispatch(unselectPending()),
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Requests);