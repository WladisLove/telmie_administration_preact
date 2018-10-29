import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import Card from '../../components/card';
import UserInfo from '../../components/user-info';
import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';

import { getCategories } from '../../store/actions/data'
import { getPendings, clearPendings, getSelectedPending, clearSelectedPending, activateUser } from '../../store/actions/pending'

import { getCookie } from '../../helpers/cookie'
import { PAGE_SIZE } from '../../helpers/consts'
import { tableColumns as columns } from '../../helpers/table-data'

class Requests extends Component{
	constructor(props){
		super(props);

		this.state = {
			selected: false,
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
			this.setState({selected : true});
			this.props.getSelectedPending(record.id, this.userAuth);
		},
	});
	onBackToList = () => {
		this.props.clearSelectedPending();
		this.setState({ selected: false });
	};

	render(){
		const {message = '', error: isError, load: isLoaded, pendings = [], selectedPending = null} = this.props.pending;
		const {selected} = this.state;
		const userAuth = this.userAuth;
		const controlsFunc = {
			activate: (id) => this.props.activateUserFunc(id, userAuth),
		}
		return (
			<Card cardClass='route-content' headerText="Pro applications">
				{isLoaded ? (
					!isError ? (
						selected ? (
							<UserInfo user={selectedPending}
								serverData={this.props.serverData}
								backToList={this.onBackToList}
								isIndividual={false}
								isApproving={true}
								controlsFunc={controlsFunc}
								activateUser={this.props.activateUser}/>
						) : (
							<Table columns={columns} 
								rowKey={(record) => record.id} 
								onRow={this.onRow}
								pagination={{pageSize: PAGE_SIZE}}
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
	getSelectedPending,
	clearSelectedPending,
	activateUserFunc: activateUser,
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Requests);