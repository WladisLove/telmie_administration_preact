import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import Card from '../../components/card'
import { Table, Checkbox, Button, Spin } from 'antd';
import UserInfo from '../../components/user-info'
import 'antd/dist/antd.css';
import style from './style'

import { getCategories } from '../../store/actions/data'
import { getActiveUsers, clearActiveUsers } from '../../store/actions/user'
import { getCookie } from '../../helpers/cookie'
import { PAGE_SIZE } from '../../helpers/consts'
import { tableColumns as columns } from '../../helpers/table-data'


const statusArr = [{
	name: 'Registered',
}, {
	name: 'Suspended',
}, {
	name: 'Started Pro Appl',
}, {
	name: 'Pending Approval',
}, {
	name: 'Approved as Pro',
}, {
	name: 'Suspended as Pro',
}];

const getDefaultStatuses = () => statusArr.map(el => el.name);


class ActiveUsers extends Component{
	constructor(props){
		super(props);

		this.state = {
			statusFilter: getDefaultStatuses() || [],
			isFiltered: false,
			filteredData: [],
			selectedUser: null,
		}
	}

	onChange = (checkedValues) => this.setState({statusFilter: [...checkedValues]});

	onFilter = () => {
		/*const {data = [], statusFilter} = this.state;
		if (statusFilter.length === statusArr.length){
			this.setState({ filteredData: [], isFiltered: false });
		} else {
			let newData = data.filter(el => statusFilter.indexOf(el.status) != -1 );
			this.setState({ filteredData: newData, isFiltered: true });
		}*/
	}

	onRow = (record) => ({
		onClick: () => this.setState({ selectedUser: record }),
	});

	onBackToList = () => this.setState({ selectedUser: null });

	componentDidMount(){
		let userAuth = this.props.userData.userAuth || getCookie('USER_AUTH');
		userAuth && this.props.getCategories(userAuth);
		userAuth && this.props.getActiveUsers(userAuth);
	};

	componentWillUnmount(){
		this.props.clearActiveUsers();
	}

	render(){
		const {statusFilter, isFiltered, filteredData, selectedUser} = this.state;
		const {isLoaded = false, isError = false, errorMsg = '', activeUsers = []} = this.props;

		const dataSource = /*isFiltered ? filteredData :*/ activeUsers;

		return (
			<Card cardClass='route-content'>
				{isLoaded ? 
					!isError ? (
						selectedUser ? 
							<UserInfo user={selectedUser}
								serverData={this.props.serverData}
								backToList={this.onBackToList}/>
								:
							[
								/*(<div class={style.filterGroup}>
									<div class={style.filterGroupLabel}> Status filter: </div>
									
									<Checkbox.Group onChange={this.onChange} value={statusFilter}	>
										{statusArr.map(({name}) => (<Checkbox className={statusFilter.indexOf(name) != -1 && style.checked} 
																						key={name} value={name}>{name}</Checkbox>))}
									</Checkbox.Group>
									
									<Button size='small' onClick={this.onFilter} className={style.filterBtn}>Filter</Button>
								</div>) ,*/
								(<Table columns={columns} 
									rowKey={(record) => record.id} 
									onRow={this.onRow}
									pagination={{pageSize: PAGE_SIZE}}
									dataSource={dataSource} />)
							]
					) : (
					<div class="errorContainer">
						Error! 
						<div class="errorMsg">{errorMsg}</div>
					</div>) 
					: (<div class='spinContainer'><Spin size='large'/></div>)}
					{/*
						
													
						*/}
				
			</Card>
		)
	}
	
};

const mapStateToProps = (state) => ({
	userData: state.loggedInUser,
	serverData: state.serverData,
	activeUsers: state.usersArrays.activeUsers,
	isLoaded: state.usersArrays.load,
	isError: state.usersArrays.error,
	errorMsg: state.usersArrays.message,
});

const mapDispatchToProps = dispatch => bindActionCreators({
	getCategories,
	getActiveUsers,
	clearActiveUsers,
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ActiveUsers);