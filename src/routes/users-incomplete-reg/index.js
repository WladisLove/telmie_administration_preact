import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { Table, Spin } from 'antd';
import Card from '../../components/card'
import 'antd/dist/antd.css';

import { getIncompleteUsers, clearIncompleteUsers, } from '../../store/actions/user'

import { PAGE_SIZE } from '../../helpers/consts'
import { getCookie } from '../../helpers/cookie'
import { incomplTableColumns as columns } from '../../helpers/table-data'

class IncompleteRegUsers extends Component{
	constructor(props){
		super(props);

		this.state = {
			sortedInfo: {},
		}
	}

	componentDidMount(){
		this.userAuth = this.props.userData.userAuth || getCookie('USER_AUTH');
		this.userAuth && this.props.getIncompleteUsers(this.userAuth);
	};

	componentWillUnmount(){
		this.props.clearIncompleteUsers();
	}

	onChange = (pagination, filters, sorter) => {
		this.setState({ sortedInfo: sorter, });
	}

	render(){
		const { sortedInfo } = this.state;
		const { uArrays } = this.props;
		const {load : isLoaded = false, error : isError = false, message : errorMsg = '', incomplUsers = []} = uArrays;
		return (
			<Card cardClass='route-content'>
				<p>Total number of incomplete users: {incomplUsers.length}</p>
				{isLoaded ? 
					!isError ? 
						<Table columns={columns(sortedInfo)} 
							rowKey={(record) => record.email} 
							onChange={this.onChange}
							pagination={{ pageSize: PAGE_SIZE, }}
							dataSource={incomplUsers} />
					 : (
					<div class="errorContainer">
						Error! 
						<div class="errorMsg">{errorMsg}</div>
					</div>) 
					: (<div class='spinContainer'><Spin size='large'/></div>)}
			</Card>
		)
	}
};

const mapStateToProps = (state) => ({
	userData: state.loggedInUser,
	uArrays: state.usersArrays,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getIncompleteUsers,
	clearIncompleteUsers,
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(IncompleteRegUsers);