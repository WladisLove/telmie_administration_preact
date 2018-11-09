import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import Card from '../../components/card'
import FilterArea from '../../components/user-table-controls/filter-area'
import { Table, Spin } from 'antd';
import 'antd/dist/antd.css';

import { getInvites, clearInvites, } from '../../store/actions/user'

import { getCookie } from '../../helpers/cookie'
import { invitesColumns as columns } from '../../helpers/table-data'
import { PAGE_SIZE } from '../../helpers/consts'

class Invites extends Component{
	constructor(props){
		super(props);

		this.state= {
			sortedInfo: {},

			isFiltered: false,
			filteredData: [],
		}
	}

	componentDidMount(){
		this.userAuth = this.props.userData.userAuth || getCookie('USER_AUTH');
		this.userAuth && this.props.getInvites(this.userAuth);
	};

	componentWillUnmount(){
		this.props.clearInvites();
	}

	onChange = (pagination, filters, sorter) => {
		this.setState({ sortedInfo: sorter, });
	}

	onFilter = (statusFilter, generalLength) => {
		const {invites = []} = this.props.uArrays;
		if (statusFilter.length === generalLength){
			this.setState({ filteredData: [], isFiltered: false });
		} else {
			let newData = invites.filter(el => statusFilter.indexOf(el.status) != -1 );
			this.setState({ filteredData: newData, isFiltered: true });
		}
	}

	render(){
		const {load : isLoaded = false, error : isError = false, message : errorMsg = '', invites = []} = this.props.uArrays;

		const dataSource = this.state.isFiltered ? this.state.filteredData : invites;

		return (
			<Card cardClass='route-content'>
				<FilterArea onFilter={this.onFilter} isInvites={true}/>
				{isLoaded ? 
					!isError ? (
						<Table columns={columns(this.state.sortedInfo)} 
							rowKey={(record) => record.id} 
							onChange={this.onChange}
							pagination={{pageSize: PAGE_SIZE}}
							dataSource={dataSource} />
					) : (
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
	getInvites,
	clearInvites,
}, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Invites);